import { fireEvent, render, screen } from "@testing-library/react";
import { useUserContext } from "context";
import { OrgCommunicationUI } from "modules";
import { describe, it, expect, vi } from "vitest";

// Mock the context globally
vi.mock("context", () => ({
  useUserContext: vi.fn()
}));

const mockHandleTempSuspend = vi.fn();
const mockHandleIndefSuspend = vi.fn();

const mockProps = {
  submitTempSuspend: { loadingTemp: false, handleTempSuspend: mockHandleTempSuspend },
  submitIndefiniteSuspend: { loadingIndef: false, handleIndefSuspend: mockHandleIndefSuspend }
};

describe("OrgCommunicationUI", () => {
  const renderComponent = (props = {}) => render(<OrgCommunicationUI {...mockProps} {...props} />);

  beforeEach(() => {
    (useUserContext as jest.Mock).mockReturnValue({
      orgDetails: {
        tempSuspensionNotice: true,
        indefiniteSuspensionNotice: false,
        organisation: "Bloom Berg",
        primaryEmail: "test@mail.com"
      }
    });
  });

  it("renders default OrgCommunicationUI with notices", () => {
    renderComponent();

    const heading = screen.getByRole("heading");

    expect(heading).toHaveTextContent("Communication");
    expect(heading).toBeInTheDocument();

    expect(
      screen.getByText("Control the email notices that go out to the members of your organization")
    ).toBeInTheDocument();

    expect(screen.getByText("Temporary suspension notice")).toBeInTheDocument();
    expect(screen.getByText("Deactivation notice")).toBeInTheDocument();

    expect(screen.getByTestId("temporary-suspension")).toBeInTheDocument();
    expect(screen.getByTestId("deactivation")).toBeInTheDocument();

    expect(screen.getByTestId("preview")).toHaveTextContent("No notice selected for preview");
  });

  it("toggles the temporary suspension switch to call handler", () => {
    renderComponent();

    const tempSwitch = screen.getByTestId("temporary-suspension");
    fireEvent.click(tempSwitch);

    expect(mockHandleTempSuspend).toHaveBeenCalledWith({ suspend: false });
  });

  it("clicks temporary suspension Preview button to show preview", () => {
    renderComponent();
    const tempPreview = screen.getByTestId("temporary-suspension-preview");
    const previewBody = screen.getByTestId("preview");

    fireEvent.click(tempPreview);

    expect(previewBody).toContainElement(
      screen.getByText("Temporary suspension of Bloom Berg's Vobb Workspace")
    );
  });

  it("clicks indefinite suspension Preview button to show preview", () => {
    renderComponent();
    const tempPreview = screen.getByTestId("deactivation-preview");
    const previewBody = screen.getByTestId("preview");

    fireEvent.click(tempPreview);

    expect(previewBody).toContainElement(
      screen.getByText("Indefinite suspension of Bloom Berg's Vobb Workspace")
    );
  });

  it("disables switches when loading", () => {
    const mockProps = {
      submitTempSuspend: { loadingTemp: true, handleTempSuspend: vi.fn() },
      submitIndefiniteSuspend: { loadingIndef: true, handleIndefSuspend: vi.fn() }
    };

    renderComponent(mockProps);

    expect(screen.getByTestId("temporary-suspension")).toBeDisabled();
    expect(screen.getByTestId("deactivation")).toBeDisabled();
  });

  it("sets switches based on orgDetails", () => {
    renderComponent();

    expect(screen.getByTestId("temporary-suspension")).toBeChecked();
    expect(screen.getByTestId("deactivation")).not.toBeChecked();
  });
});
