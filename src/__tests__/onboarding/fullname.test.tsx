import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FullnameUI } from "modules";
import { vi } from "vitest";

// Mocking the dependencies
vi.mock("components", () => ({
  CustomInput: vi.fn(
    ({ type, name, placeholder, register, validatorMessage, "data-testid": testId }) => (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        {...register(name)}
        aria-invalid={!!validatorMessage}
        aria-describedby={`${name}-error`}
        data-testid={testId}
      />
    )
  ),
  Button: vi.fn(({ children, disabled, loading, onClick, "data-testid": testId }) => (
    <button disabled={disabled || loading} onClick={onClick} data-testid={testId}>
      {loading ? "Loading..." : children}
    </button>
  ))
}));

vi.mock("assets", async () => {
  const originalModule = await vi.importActual<any>("assets");
  return {
    ...originalModule,
    PersonalIcon: vi.fn(({ "data-testid": testId }) => <div data-testid={testId}>Icon</div>)
  };
});

describe("FullnameUI Component", () => {
  const mockSubmit = vi.fn();
  const initialProps = {
    initData: { firstName: "", lastName: "" },
    submit: mockSubmit,
    loading: false
  };

  const renderComponent = (props = {}) => {
    return render(<FullnameUI {...initialProps} {...props} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component correctly with default elements", () => {
    renderComponent();
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Enter your name/i })).toBeInTheDocument();
    expect(screen.getByTestId("subtitle").textContent).toBe("As shown on a government issued ID");
    expect(screen.getByTestId("firstname")).toBeInTheDocument();
    expect(screen.getByTestId("lastname")).toBeInTheDocument();
    expect(screen.getByTestId("continue-btn")).toBeInTheDocument();
  });

  it("displays validation errors when required fields are empty", async () => {
    renderComponent();
    fireEvent.change(screen.getByTestId("firstname"), { target: { value: "" } });
    fireEvent.change(screen.getByTestId("lastname"), { target: { value: "" } });

    fireEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(screen.getByTestId("firstname")).toHaveAttribute("aria-invalid", "true");
    });
    expect(screen.getByTestId("lastname")).toHaveAttribute("aria-invalid", "true");
  });

  it("calls submit with valid data when form is submitted", async () => {
    renderComponent();

    fireEvent.change(screen.getByTestId("firstname"), { target: { value: "John" } });
    fireEvent.change(screen.getByTestId("lastname"), { target: { value: "Doe" } });

    fireEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({ firstName: "John", lastName: "Doe" });
    });
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables the button when loading is true", () => {
    renderComponent({ loading: true });

    const button = screen.getByTestId("continue-btn");
    expect(button).toBeDisabled();
    expect(button.textContent).toBe("Loading...");
  });

  it("button is enabled and clickable when loading is false", async () => {
    renderComponent({ loading: false });

    const button = screen.getByTestId("continue-btn");
    expect(button).not.toBeDisabled();

    fireEvent.click(button);
    await waitFor(() => {
      expect(mockSubmit).not.toHaveBeenCalled(); // Because inputs are still empty
    });
  });

  it("renders input fields with initial values from props", () => {
    const initialData = { firstName: "Jane", lastName: "Smith" };
    renderComponent({ initData: initialData });

    expect(screen.getByTestId("firstname")).toHaveValue(initialData.firstName);
    expect(screen.getByTestId("lastname")).toHaveValue(initialData.lastName);
  });

  it("handles validation errors properly", async () => {
    renderComponent();

    // Submit form without input
    fireEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(screen.getByTestId("firstname")).toHaveAttribute("aria-invalid", "true");
    });

    expect(screen.getByTestId("lastname")).toHaveAttribute("aria-invalid", "true");
  });

  it("handles valid form submissions correctly", async () => {
    renderComponent();

    // Fill form with valid data
    fireEvent.change(screen.getByTestId("firstname"), { target: { value: "John" } });
    fireEvent.change(screen.getByTestId("lastname"), { target: { value: "Doe" } });

    fireEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({ firstName: "John", lastName: "Doe" });
    });
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  it("does not call submit if form has validation errors", async () => {
    renderComponent();

    // Click the continue button without filling the form
    fireEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  });

  it("renders loading state when 'loading' prop is true", () => {
    renderComponent({ loading: true });

    const button = screen.getByTestId("continue-btn");
    expect(button).toBeDisabled();
    expect(button.textContent).toBe("Loading...");
  });
});
