import React, { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useMobile } from "hooks";
import { BrowserRouter } from "react-router-dom";
import { LoginUI } from "modules";

// Mock the assets
vi.mock("assets", async () => {
  const originalModule = await vi.importActual<any>("assets");

  return {
    ...originalModule,
    LogoIcon: () => <div data-testid="logo">Mocked Logo</div>,
    GoogleLogoIcon: () => <div>Mocked Google Logo</div>
  };
});

vi.mock("hooks", () => ({
  useMobile: vi.fn(),
  useLogout: vi.fn()
}));

vi.mock("components", () => ({
  UnsupportedScreenSize: () => (
    <div data-testid="mocked-unsupported-screen">Mocked Unsupported Screen</div>
  ),
  CustomInput: ({ label, type, name, register, validatorMessage }) => (
    <div>
      <label>{label}</label>
      <input data-testid={name} type={type} {...register(name)} />
      {validatorMessage && <span>{validatorMessage}</span>}
    </div>
  ),
  PasswordInput: ({ label, name, register, validatorMessage }) => (
    <div>
      <label>{label}</label>
      <input data-testid={name} type="password" {...register(name)} />
      {validatorMessage && <span>{validatorMessage}</span>}
    </div>
  ),
  Button: ({ children, onClick, "data-testid": testId, disabled }) => (
    <button data-testid={testId} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
  CheckboxWithText: ({ label, handleChecked, checked }) => {
    const [isChecked, setIsChecked] = useState(checked || false);

    const handleChange = (e) => {
      const newChecked = e.target.checked;
      setIsChecked(newChecked);
      handleChecked(newChecked); // Call the handler from props to notify the parent
    };

    return (
      <div>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          data-testid="stay-signed-in-checkbox"
        />
        <span>{label}</span>
      </div>
    );
  }
}));

vi.mock("react-google-recaptcha", () => {
  return {
    default: ({ onChange }) => (
      <div data-testid="recaptcha" onClick={() => onChange("fake-recaptcha-token")}>
        Mocked ReCAPTCHA
      </div>
    )
  };
});

// Mock react-hook-form
vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: vi.fn(),
    handleSubmit: vi.fn(),
    formState: {
      errors: {
        email: {
          type: "required",
          message: "Required"
        },
        password: {
          type: "required",
          message: "Required"
        }
      }
    },
    setValue: vi.fn(),
    getValues: vi.fn(),
    watch: vi.fn()
  }),
  SubmitHandler: vi.fn()
}));

describe("Login UI", () => {
  const defaultProps = {
    submit: vi.fn(),
    loading: false,
    handleGoogleSignin: vi.fn()
  };

  const renderComponent = (props = {}) =>
    render(
      <BrowserRouter>
        <LoginUI {...defaultProps} {...props} />
      </BrowserRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
    (useMobile as jest.Mock).mockReturnValue({ isMobile: false });
  });

  it("renders the desktop layout when not mobile", () => {
    renderComponent();
    const loginComponent = screen.getByTestId("login-component");
    expect(loginComponent).toBeInTheDocument();
  });

  it("renders UnsupportedScreenSize component on mobile", () => {
    (useMobile as jest.Mock).mockReturnValue({ isMobile: true });
    renderComponent();
    expect(screen.getByTestId("mocked-unsupported-screen")).toBeInTheDocument();
  });

  it("should render the logo", () => {
    renderComponent();
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render the heading with appropriate text", () => {
    renderComponent();
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Sign in to your account");
  });

  it("should render email input", () => {
    renderComponent();
    expect(screen.getByTestId("email")).toBeInTheDocument();
  });

  it("should render password input", () => {
    renderComponent();
    expect(screen.getByTestId("password")).toBeInTheDocument();
  });

  it('should toggle the "Stay signed in" checkbox state in LoginUI', () => {
    renderComponent();
    const checkbox = screen.getByTestId("stay-signed-in-checkbox");

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("should display recaptcha when site key is set", () => {
    process.env.REACT_APP_RECAPTCHA_SITE_KEY = "test-site-key";
    renderComponent();
    expect(screen.getByTestId("recaptcha")).toBeInTheDocument();
  });

  it("should display required errors when inputs are not filled", () => {
    renderComponent();
    fireEvent.click(screen.getByTestId("signin-btn"));
    expect(screen.getAllByText("Required")).toHaveLength(2);
  });

  it("should enable sign-in button on load", () => {
    renderComponent();
    const signinBtn = screen.getByTestId("signin-btn");
    expect(signinBtn).toBeEnabled();
  });

  it('should trigger Google sign-in when "Sign in with Google" button is clicked', () => {
    process.env.REACT_APP_RECAPTCHA_SITE_KEY = "test-site-key";
    renderComponent();
    fireEvent.click(screen.getByTestId("signin-google-btn"));
    expect(defaultProps.handleGoogleSignin).toHaveBeenCalled();
  });

  it("should trigger submit when sign-in button is clicked and remember me unchecked", async () => {
    process.env.REACT_APP_RECAPTCHA_SITE_KEY = "test-site-key";
    renderComponent();
    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const recaptcha = screen.getByTestId("recaptcha");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(recaptcha); // Simulate ReCAPTCHA verification

    fireEvent.click(screen.getByTestId("signin-btn"));

    await waitFor(() =>
      expect(defaultProps.submit).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        rememberMe: false,
        recaptcha: "fake-recaptcha-token"
      })
    );
  });
  it("should trigger submit when sign-in button is clicked and remember me checked", async () => {
    process.env.REACT_APP_RECAPTCHA_SITE_KEY = "test-site-key";

    renderComponent();
    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const recaptcha = screen.getByTestId("recaptcha");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(recaptcha); // Simulate ReCAPTCHA verification

    fireEvent.click(screen.getByTestId("signin-btn"));

    await waitFor(() =>
      expect(defaultProps.submit).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        rememberMe: true,
        recaptcha: "fake-recaptcha-token"
      })
    );
  });

  it("should disable the sign-in button when loading is true", () => {
    renderComponent({ loading: true });

    const signInButton = screen.getByTestId("signin-btn");
    expect(signInButton).toBeDisabled();
  });

  it("should navigate to forgot password page", () => {
    renderComponent();
    const forgotPasswordLink = screen.getByText("Forgot password?");
    expect(forgotPasswordLink).toHaveAttribute("href", "/forgot-password");
  });

  it("should navigate to sign-up page", () => {
    renderComponent();
    const signupLink = screen.getByTestId("go-to-signup");
    expect(signupLink).toHaveAttribute("href", "/");
  });
});
