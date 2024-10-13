import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { EmailUI } from "modules";

// Mock the assets
vi.mock("assets", async () => {
  const originalModule = await vi.importActual<any>("assets");
  return {
    ...originalModule,
    KeyIcon: () => <div data-testid="logo">Mocked Logo</div>
  };
});

vi.mock("components", () => ({
  CustomInput: ({ label, type, name, register, validatorMessage }) => (
    <div>
      <label>{label}</label>
      <input data-testid={name} type={type} {...register(name)} />
      {validatorMessage && <span>{validatorMessage}</span>}
    </div>
  ),
  Button: ({ children, onClick, "data-testid": testId, loading }) => (
    <button data-testid={testId} onClick={onClick} disabled={loading}>
      {loading ? "Loading..." : children}
    </button>
  )
}));

// Mock react-hook-form
const defaultMockUseForm = () => ({
  register: vi.fn(),
  handleSubmit: (callback) => (event) => {
    event.preventDefault();
    callback({ email: "test@email.com" });
  },
  formState: {
    errors: {}
  },
  setValue: vi.fn(),
  getValues: vi.fn(),
  watch: vi.fn()
});

const mockUseForm = vi.fn(defaultMockUseForm);

vi.mock("react-hook-form", () => ({
  useForm: () => mockUseForm(),
  SubmitHandler: vi.fn()
}));

describe("Email UI", () => {
  const defaultProps = {
    submit: vi.fn(),
    loading: false
  };

  const renderComponent = (props = {}) =>
    render(
      <BrowserRouter>
        <EmailUI {...defaultProps} {...props} />
      </BrowserRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseForm.mockImplementation(defaultMockUseForm);
  });

  it("should render the logo", () => {
    renderComponent();
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render the heading with appropriate text", () => {
    renderComponent();
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Forgot Password?");
  });

  it("should render the subtitle paragraph with appropriate text", () => {
    renderComponent();
    const subtitle = screen.getByTestId("subtitle");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent("No worries, we’ll send you reset instructions.");
  });

  it("should render email input", () => {
    renderComponent();
    expect(screen.getByTestId("email")).toBeInTheDocument();
  });

  it("should display required error when email is not filled", async () => {
    mockUseForm.mockImplementation(() => ({
      ...defaultMockUseForm(),
      formState: {
        errors: {
          email: {
            message: "Required"
          }
        }
      },
      handleSubmit: (callback) => (event) => {
        event.preventDefault();
        callback({});
      }
    }));

    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await waitFor(() => {
      expect(screen.getByText("Required")).toBeInTheDocument();
    });
  });

  it("should display invalid email error when an invalid email is provided", async () => {
    mockUseForm.mockImplementation(() => ({
      ...defaultMockUseForm(),
      formState: {
        errors: {
          email: {
            message: "Enter a valid email"
          }
        }
      },
      handleSubmit: (callback) => (event) => {
        event.preventDefault();
        callback({ email: "invalid-email" });
      }
    }));

    renderComponent();
    const emailInput = screen.getByTestId("email");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await waitFor(() => {
      expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
    });
  });

  it("should trigger submit when valid email is provided", async () => {
    renderComponent();
    const emailInput = screen.getByTestId("email");
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await waitFor(() => {
      expect(defaultProps.submit).toHaveBeenCalledWith({ email: "test@email.com" });
    });
  });

  it("should navigate to sign-in page", () => {
    renderComponent();
    const signupLink = screen.getByRole("button", { name: "Back to log in" });
    expect(signupLink).toBeEnabled();
  });
});
