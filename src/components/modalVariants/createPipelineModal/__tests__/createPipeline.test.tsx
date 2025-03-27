import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CreatePipelineModal } from "../index";
import { vi } from "vitest";

// Mock the dependencies
vi.mock("@hookform/resolvers/yup", () => ({
  yupResolver: vi.fn((schema) => schema)
}));

vi.mock("@tabler/icons-react", () => ({
  IconX: () => <div data-testid="icon-x" />
}));

vi.mock("components/form", () => ({
  CustomInput: ({ label, name, register, validatorMessage }) => (
    <div>
      <label>{label}</label>
      <input
        data-testid={`custom-input-${name}`}
        {...register(name)}
      />
      {validatorMessage && <div data-testid={`error-${name}`}>{validatorMessage}</div>}
    </div>
  ),
  CustomTextarea: ({ label, name, register, validatorMessage, className }) => (
    <div>
      <label>{label}</label>
      <textarea
        data-testid={`custom-textarea-${name}`}
        className={className}
        {...register(name)}
      />
      {validatorMessage && <div data-testid={`error-${name}`}>{validatorMessage}</div>}
    </div>
  )
}));

vi.mock("components/modal", () => ({
  Modal: ({ children, show, close, testId }) =>
    show ? (
      <div data-testid={testId}>
        {children}
      </div>
    ) : null
}));

vi.mock("components/ui", () => ({
  Button: ({ children, onClick, disabled, loading, variant, size, className, ...rest }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-loading={loading}
      data-variant={variant}
      data-size={size}
      className={className}
      {...rest}
    >
      {loading ? "Loading..." : children}
    </button>
  )
}));

// Mock react-hook-form
const mockRegister = vi.fn().mockImplementation((name) => ({ name }));
const mockHandleSubmit = vi.fn((callback) => (e) => {
  e?.preventDefault?.();
  return callback({ name: "Test Pipeline", description: "Test Description" });
});

const mockUseForm = vi.fn().mockReturnValue({
  register: mockRegister,
  handleSubmit: mockHandleSubmit,
  formState: {
    errors: {},
    isDirty: true
  }
});

vi.mock("react-hook-form", () => ({
  useForm: () => mockUseForm()
}));

describe("CreatePipelineModal", () => {
  const defaultProps = {
    show: true,
    close: vi.fn(),
    submit: vi.fn(),
    loading: false
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseForm.mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      formState: {
        errors: {},
        isDirty: true
      }
    });
  });

  it("renders the modal when show is true", () => {
    render(<CreatePipelineModal {...defaultProps} />);
    expect(screen.getByTestId("createPipeline-modal")).toBeInTheDocument();
  });

  it("does not render the modal when show is false", () => {
    render(<CreatePipelineModal {...defaultProps} show={false} />);
    expect(screen.queryByTestId("createPipeline-modal")).not.toBeInTheDocument();
  });

  it("displays the correct title", () => {
    render(<CreatePipelineModal {...defaultProps} />);
    expect(screen.getByText("Pipeline Creation")).toBeInTheDocument();
  });

  it("renders the name input field", () => {
    render(<CreatePipelineModal {...defaultProps} />);
    expect(screen.getByTestId("custom-input-name")).toBeInTheDocument();
  });

  it("renders the description textarea field", () => {
    render(<CreatePipelineModal {...defaultProps} />);
    expect(screen.getByTestId("custom-textarea-description")).toBeInTheDocument();
  });

  it("closes the modal when close button is clicked", () => {
    render(<CreatePipelineModal {...defaultProps} />);
    fireEvent.click(screen.getByTestId("close-btn"));
    expect(defaultProps.close).toHaveBeenCalled();
  });

  it("closes the modal when cancel button is clicked", () => {
    render(<CreatePipelineModal {...defaultProps} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(defaultProps.close).toHaveBeenCalled();
  });

  it("submits the form when Create Pipeline button is clicked", async () => {
    render(<CreatePipelineModal {...defaultProps} />);
    fireEvent.click(screen.getByText("Create Pipeline"));
    expect(defaultProps.submit).toHaveBeenCalledWith({
      name: "Test Pipeline",
      description: "Test Description"
    });
  });

  it("disables the Create Pipeline button when form is not dirty", () => {
    mockUseForm.mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      formState: {
        errors: {},
        isDirty: false
      }
    });
    
    render(<CreatePipelineModal {...defaultProps} />);
    expect(screen.getByText("Create Pipeline")).toBeDisabled();
  });

  it("displays loading state when loading prop is true", () => {
    render(<CreatePipelineModal {...defaultProps} loading={true} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("disables the Cancel button when loading or not dirty", () => {
    mockUseForm.mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      formState: {
        errors: {},
        isDirty: false
      }
    });
    
    render(<CreatePipelineModal {...defaultProps} loading={true} />);
    expect(screen.getByText("Cancel")).toBeDisabled();
  });

  it("sets the correct props on the CustomInput component", () => {
    render(<CreatePipelineModal {...defaultProps} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("sets the correct props on the CustomTextarea component", () => {
    render(<CreatePipelineModal {...defaultProps} />);
    expect(screen.getByText("Description (optional)")).toBeInTheDocument();
  });

  it("displays validation errors when form has errors", () => {
    mockUseForm.mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      formState: {
        errors: {
          name: { message: "Name is required" }
        },
        isDirty: true
      }
    });
    
    render(<CreatePipelineModal {...defaultProps} />);
    expect(screen.getByTestId("error-name")).toHaveTextContent("Name is required");
  });

  it("handles form submission with proper data", () => {
    render(<CreatePipelineModal {...defaultProps} />);
    fireEvent.click(screen.getByText("Create Pipeline"));
    expect(defaultProps.submit).toHaveBeenCalledWith({
      name: "Test Pipeline",
      description: "Test Description"
    });
  });
});