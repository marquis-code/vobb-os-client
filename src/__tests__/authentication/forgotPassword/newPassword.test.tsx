import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { NewPasswordUI } from "modules";

// Mock the assets
vi.mock("assets", async () => {
  const originalModule = await vi.importActual<any>("assets");
  return {
    ...originalModule,
    LockClosedIcon: () => <div data-testid="logo">Mocked Lock Icon</div>
  };
});

vi.mock("components", () => ({
  PasswordInput: ({ label, type, name, register, validatorMessage }) => (
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
let mockUseForm = () => ({
  register: vi.fn(),
  handleSubmit: (callback) => (event) => {
    event.preventDefault();
    callback({});
  },
  formState: {
    errors: {}
  },
  setValue: vi.fn(),
  getValues: vi.fn(),
  watch: vi.fn()
});

vi.mock("react-hook-form", () => ({
  useForm: () => mockUseForm(),
  SubmitHandler: vi.fn()
}));

describe("NewPasswordUI", () => {
  const defaultProps = {
    submit: vi.fn(),
    loading: false
  };

  const renderComponent = (props = {}) =>
    render(
      <BrowserRouter>
        <NewPasswordUI {...defaultProps} {...props} />
      </BrowserRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the lock icon", () => {
    renderComponent();
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render the heading with appropriate text", () => {
    renderComponent();
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Set new Password");
  });

  it("should render the subtitle paragraph with appropriate text", () => {
    renderComponent();
    const subtitle = screen.getByTestId("subtitle");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent(
      "Your new password must be different to previously used passwords."
    );
  });

  it("should render new password and confirm password inputs", () => {
    renderComponent();
    expect(screen.getByTestId("newPassword")).toBeInTheDocument();
    expect(screen.getByTestId("confirmPassword")).toBeInTheDocument();
  });

  it("should display required error when new password is not filled", async () => {
    mockUseForm = () => ({
      register: vi.fn(),
      handleSubmit: (callback) => (event) => {
        event.preventDefault();
        callback({});
      },
      formState: {
        errors: {
          newPassword: { message: "Required" }
        }
      },
      setValue: vi.fn(),
      getValues: vi.fn(),
      watch: vi.fn()
    });

    renderComponent();
    fireEvent.click(screen.getByTestId("reset-btn"));

    await waitFor(() => {
      expect(screen.getByText("Required")).toBeInTheDocument();
    });
  });

  it("should display password length error if password is too short", async () => {
    mockUseForm = () => ({
      register: vi.fn(),
      handleSubmit: (callback) => (event) => {
        event.preventDefault();
        callback({ newPassword: "short" });
      },
      formState: {
        errors: {
          newPassword: { message: "Password should be at least 8 characters long" }
        }
      },
      setValue: vi.fn(),
      getValues: vi.fn(),
      watch: vi.fn()
    });

    renderComponent();
    fireEvent.change(screen.getByTestId("newPassword"), { target: { value: "short" } });
    fireEvent.click(screen.getByTestId("reset-btn"));

    await waitFor(() => {
      expect(screen.getByText("Password should be at least 8 characters long")).toBeInTheDocument();
    });
  });

  it("should display error if password doesn't contain uppercase characters", async () => {
    mockUseForm = () => ({
      register: vi.fn(),
      handleSubmit: (callback) => (event) => {
        event.preventDefault();
        callback({ newPassword: "lowercase1@" });
      },
      formState: {
        errors: {
          newPassword: { message: "Password should contain an uppercase character" }
        }
      },
      setValue: vi.fn(),
      getValues: vi.fn(),
      watch: vi.fn()
    });

    renderComponent();
    fireEvent.change(screen.getByTestId("newPassword"), { target: { value: "lowercase1@" } });
    fireEvent.click(screen.getByTestId("reset-btn"));

    await waitFor(() => {
      expect(
        screen.getByText("Password should contain an uppercase character")
      ).toBeInTheDocument();
    });
  });

  it("should display error if password doesn't contain a number", async () => {
    mockUseForm = () => ({
      register: vi.fn(),
      handleSubmit: (callback) => (event) => {
        event.preventDefault();
        callback({ newPassword: "NoNumber@" });
      },
      formState: {
        errors: {
          newPassword: { message: "Password should contain at least one number" }
        }
      },
      setValue: vi.fn(),
      getValues: vi.fn(),
      watch: vi.fn()
    });

    renderComponent();
    fireEvent.change(screen.getByTestId("newPassword"), { target: { value: "NoNumber@" } });
    fireEvent.click(screen.getByTestId("reset-btn"));

    await waitFor(() => {
      expect(screen.getByText("Password should contain at least one number")).toBeInTheDocument();
    });
  });

  it("should display error if passwords do not match", async () => {
    mockUseForm = () => ({
      register: vi.fn(),
      handleSubmit: (callback) => (event) => {
        event.preventDefault();
        callback({ newPassword: "ValidPass1@", confirmPassword: "MismatchPass1@" });
      },
      formState: {
        errors: {
          confirmPassword: { message: "Passwords must match" }
        }
      },
      setValue: vi.fn(),
      getValues: vi.fn(),
      watch: vi.fn()
    });

    renderComponent();
    fireEvent.change(screen.getByTestId("newPassword"), { target: { value: "ValidPass1@" } });
    fireEvent.change(screen.getByTestId("confirmPassword"), {
      target: { value: "MismatchPass1@" }
    });
    fireEvent.click(screen.getByTestId("reset-btn"));

    await waitFor(() => {
      expect(screen.getByText("Passwords must match")).toBeInTheDocument();
    });
  });

  it("should trigger submit when valid data is provided", async () => {
    const submitMock = vi.fn();
    mockUseForm = () => ({
      register: vi.fn(),
      handleSubmit: (callback) => async (event) => {
        event.preventDefault();
        await waitFor(() => {
          callback({ newPassword: "ValidPass1@", confirmPassword: "ValidPass1@" });
        });
      },
      formState: { errors: {} },
      setValue: vi.fn(),
      getValues: vi.fn(),
      watch: vi.fn()
    });

    renderComponent({ submit: submitMock });
    fireEvent.change(screen.getByTestId("newPassword"), { target: { value: "ValidPass1@" } });
    fireEvent.change(screen.getByTestId("confirmPassword"), { target: { value: "ValidPass1@" } });
    fireEvent.click(screen.getByTestId("reset-btn"));

    await waitFor(() => {
      expect(submitMock).toHaveBeenCalledWith({
        newPassword: "ValidPass1@",
        confirmPassword: "ValidPass1@"
      });
    });
  });
});
