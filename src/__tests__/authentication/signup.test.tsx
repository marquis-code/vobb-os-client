import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SignupUI } from "modules";

// Mock the assets
vi.mock("assets", async () => {
  const originalModule = await vi.importActual<any>("assets");

  return {
    ...originalModule,
    LogoIcon: () => <div data-testid="logo">Mocked Logo</div>,
    GoogleLogoIcon: () => <div>Mocked Google Logo</div>
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
  PasswordInput: ({ label, name, register, validatorMessage }) => (
    <div>
      <label>{label}</label>
      <input data-testid={name} type="password" {...register(name)} />
      {validatorMessage && <span>{validatorMessage}</span>}
    </div>
  ),
  Button: ({ children, onClick, "data-testid": testId, loading }) => (
    <button data-testid={testId} onClick={onClick} disabled={loading}>
      {loading ? "Loading..." : children}
    </button>
  )
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
let mockUseForm = () => ({
  register: vi.fn(),
  handleSubmit: vi.fn((callback) => (e) => {
    e.preventDefault();
    callback({
      email: "test@example.com",
      password: "password123",
      recaptcha: "fake-recaptcha-token"
    });
  }),
  formState: {
    errors: {
      email: {
        type: "required",
        message: "Required"
      },
      password: {
        type: "required",
        message: "Required"
      },
      recaptcha: {
        type: "required",
        message: "Required"
      }
    }
  },
  setValue: vi.fn(),
  getValues: vi.fn(() => ({
    recaptcha: "fake-recaptcha-token"
  })),
  watch: vi.fn(() => false)
});

vi.mock("react-hook-form", () => ({
  useForm: () => mockUseForm(),
  SubmitHandler: vi.fn()
}));

describe("Signup UI", () => {
  const defaultProps = {
    submit: vi.fn(),
    clear: false,
    loading: false,
    handleGoogleSignup: vi.fn()
  };

  const renderComponent = (props = {}) =>
    render(
      <BrowserRouter>
        <SignupUI {...defaultProps} {...props} />
      </BrowserRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
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
    expect(heading).toHaveTextContent("Create a Vobb account");
  });

  it("should render email input", () => {
    renderComponent();
    expect(screen.getByTestId("email")).toBeInTheDocument();
  });

  it("should render password input", () => {
    renderComponent();
    expect(screen.getByTestId("password")).toBeInTheDocument();
  });

  it("should display recaptcha when site key is set", () => {
    process.env.REACT_APP_RECAPTCHA_SITE_KEY = "test-site-key";
    renderComponent();
    expect(screen.getByTestId("recaptcha")).toBeInTheDocument();
  });

  it("should display required errors when inputs are not filled", () => {
    renderComponent();
    fireEvent.click(screen.getByTestId("signup-btn"));
    expect(screen.getAllByText("Required")).toHaveLength(3); // Email, Password, and ReCAPTCHA
  });

  it("should display password length error if password is too short", async () => {
    mockUseForm = () => ({
      register: vi.fn(),
      handleSubmit: vi.fn((callback) => (e) => {
        e.preventDefault();
        callback({
          email: "test@example.com",
          password: "password123",
          recaptcha: "fake-recaptcha-token"
        });
      }),
      formState: {
        errors: {
          email: {
            type: "required",
            message: "Required"
          },
          password: { type: "", message: "Password should be at least 8 characters long" },
          recaptcha: {
            type: "required",
            message: "Required"
          }
        }
      },
      setValue: vi.fn(),
      getValues: vi.fn(),
      watch: vi.fn()
    });
    renderComponent();
    const passwordInput = screen.getByTestId("password");

    // Test case: Password is too short
    fireEvent.change(passwordInput, { target: { value: "short" } });
    fireEvent.click(screen.getByTestId("signup-btn"));
    await waitFor(() => {
      expect(screen.getByText("Password should be at least 8 characters long")).toBeInTheDocument();
    });
  });

  it("should display error if password doesn't contain uppercase characters", async () => {
    mockUseForm = () => ({
      register: vi.fn(),
      handleSubmit: vi.fn((callback) => (e) => {
        e.preventDefault();
        callback({
          email: "test@example.com",
          password: "password123",
          recaptcha: "fake-recaptcha-token"
        });
      }),
      formState: {
        errors: {
          email: {
            type: "required",
            message: "Required"
          },
          password: { type: "", message: "Password should contain an uppercase character" },
          recaptcha: {
            type: "required",
            message: "Required"
          }
        }
      },
      setValue: vi.fn(),
      getValues: vi.fn(),
      watch: vi.fn()
    });
    renderComponent();
    const passwordInput = screen.getByTestId("password");

    fireEvent.change(passwordInput, { target: { value: "alllowercase1!" } });
    fireEvent.click(screen.getByTestId("signup-btn"));
    await waitFor(() => {
      expect(
        screen.getByText("Password should contain an uppercase character")
      ).toBeInTheDocument();
    });
  });

  it("should display error if password doesn't contain lowercase characters", async () => {
    mockUseForm = () => ({
      register: vi.fn(),
      handleSubmit: vi.fn((callback) => (e) => {
        e.preventDefault();
        callback({
          email: "test@example.com",
          password: "password123",
          recaptcha: "fake-recaptcha-token"
        });
      }),
      formState: {
        errors: {
          email: {
            type: "required",
            message: "Required"
          },
          password: { type: "", message: "Password should contain a lowercase character" },
          recaptcha: {
            type: "required",
            message: "Required"
          }
        }
      },
      setValue: vi.fn(),
      getValues: vi.fn(),
      watch: vi.fn()
    });
    renderComponent();
    const passwordInput = screen.getByTestId("password");
    // Test case: Password lacks lowercase
    fireEvent.change(passwordInput, { target: { value: "ALLUPPERCASE1!" } });
    fireEvent.click(screen.getByTestId("signup-btn"));
    await waitFor(() => {
      expect(screen.getByText("Password should contain a lowercase character")).toBeInTheDocument();
    });
  });
  it("should display error if password doesn't contain atleast one number", async () => {
    mockUseForm = () => ({
      register: vi.fn(),
      handleSubmit: vi.fn((callback) => (e) => {
        e.preventDefault();
        callback({
          email: "test@example.com",
          password: "password123",
          recaptcha: "fake-recaptcha-token"
        });
      }),
      formState: {
        errors: {
          email: {
            type: "required",
            message: "Required"
          },
          password: { type: "", message: "Password should contain at least one number" },
          recaptcha: {
            type: "required",
            message: "Required"
          }
        }
      },
      setValue: vi.fn(),
      getValues: vi.fn(),
      watch: vi.fn()
    });
    renderComponent();
    const passwordInput = screen.getByTestId("password");
    fireEvent.change(passwordInput, { target: { value: "NoNumber!" } });
    fireEvent.click(screen.getByTestId("signup-btn"));
    await waitFor(() => {
      expect(screen.getByText("Password should contain at least one number")).toBeInTheDocument();
    });
  });

  it("should display error if password doesn't contain any special character", async () => {
    mockUseForm = () => ({
      register: vi.fn(),
      handleSubmit: vi.fn((callback) => (e) => {
        e.preventDefault();
        callback({
          email: "test@example.com",
          password: "password123",
          recaptcha: "fake-recaptcha-token"
        });
      }),
      formState: {
        errors: {
          email: {
            type: "required",
            message: "Required"
          },
          password: {
            type: "",
            message: "Password should contain at least one special character (e.g. @, #, &, $)"
          },
          recaptcha: {
            type: "required",
            message: "Required"
          }
        }
      },
      setValue: vi.fn(),
      getValues: vi.fn(),
      watch: vi.fn()
    });
    renderComponent();
    const passwordInput = screen.getByTestId("password");
    fireEvent.change(passwordInput, { target: { value: "NoSpecialChar1" } });
    fireEvent.click(screen.getByTestId("signup-btn"));
    await waitFor(() => {
      expect(
        screen.getByText("Password should contain at least one special character (e.g. @, #, &, $)")
      ).toBeInTheDocument();
    });
  });

  it("should enable sign-up button on load", () => {
    renderComponent();
    const signupBtn = screen.getByTestId("signup-btn");
    expect(signupBtn).toBeEnabled();
  });

  it('should trigger Google sign-up when "Signup with Google" button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByTestId("signup-google-btn"));
    expect(defaultProps.handleGoogleSignup).toHaveBeenCalled();
  });

  it("should trigger submit when sign-up button is clicked", async () => {
    renderComponent();
    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const recaptcha = screen.getByTestId("recaptcha");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(recaptcha);

    fireEvent.click(screen.getByTestId("signup-btn"));

    await waitFor(() =>
      expect(defaultProps.submit).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        recaptcha: "fake-recaptcha-token"
      })
    );
  });

  it("should disable the sign-up button when loading is true", () => {
    renderComponent({ loading: true });

    const signUpButton = screen.getByTestId("signup-btn");
    expect(signUpButton).toBeDisabled();
  });

  it("should navigate to sign-in page", () => {
    renderComponent();
    const signupLink = screen.getByTestId("go-to-signin");
    expect(signupLink).toHaveAttribute("href", "/login");
  });
});
