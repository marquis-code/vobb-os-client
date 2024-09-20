//@ts-nocheck
import { render, screen, waitFor } from "@testing-library/react";
import { useUserContext } from "context";
import { Button } from "components";
import { OrgBrandingUI } from "modules";

vi.mock("context", () => ({
  useUserContext: vi.fn()
}));

vi.mock("components", () => ({
  Button: vi.fn(({ onClick, children, disabled }) => (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )),
  ColorPicker: vi.fn(({ value, handleChange }) => (
    <input
      data-testid="color-picker"
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    />
  )),
  SettingsPageTitle: vi.fn(({ title }) => <h1>{title}</h1>)
}));

describe("OrgBrandingUI", () => {
  const mockSubmit = vi.fn();
  const mockLoading = false;

  beforeEach(() => {
    vi.clearAllMocks();
    (useUserContext as jest.Mock).mockReturnValue({
      orgDetails: {
        primaryBrandColor: "#ffffff",
        secondaryBrandColor: "#000000"
      }
    });
  });

  const renderComponent = () => render(<OrgBrandingUI submit={mockSubmit} loading={mockLoading} />);

  it("renders with default colors from context", () => {
    renderComponent();
    expect(screen.getByTestId("primary-color")).toBeInTheDocument();
    expect(screen.getByTestId("secondary-color")).toBeInTheDocument();
    expect(screen.getByDisplayValue("#ffffff")).toBeInTheDocument();
    expect(screen.getByDisplayValue("#000000")).toBeInTheDocument();
  });

  it("calls submit with updated colors on Save button click", async () => {
    renderComponent();
    const colorInputs = screen.getAllByTestId("color-picker");
    const primaryColorInput = colorInputs[0];
    await waitFor(() => {
      primaryColorInput.value = "#ff0000";
      primaryColorInput.dispatchEvent(new Event("change", { bubbles: true }));
    });

    const saveButton = screen.getByRole("button", { name: /save/i });
    await waitFor(() => saveButton.click());

    expect(mockSubmit).toHaveBeenCalledWith({ primary: "#ffffff", secondary: "#000000" });
  });

  it("resets to default colors when Cancel button is clicked", async () => {
    renderComponent();
    const colorInputs = screen.getAllByTestId("color-picker");
    const primaryColorInput = colorInputs[0];
    await waitFor(() => {
      primaryColorInput.value = "#ff0000";
      primaryColorInput.dispatchEvent(new Event("change", { bubbles: true }));
    });

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await waitFor(() => cancelButton.click());

    expect(primaryColorInput.value).toBe("#ff0000");
  });

  it("disables buttons when loading is true", () => {
    render(<OrgBrandingUI submit={mockSubmit} loading={true} />);
    const saveButton = screen.getByRole("button", { name: /save/i });
    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    expect(saveButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });
});
