import { render, screen, fireEvent } from "@testing-library/react";
import { CreatePipelineErrorModal } from "../error";
import { vi } from "vitest";

// Mock the Modal component
vi.mock("components/modal", () => ({
  Modal: ({ children, show, close, testId }) =>
    show ? (
      <div data-testid={testId}>
        {children}
        <button data-testid="modal-close-btn" onClick={close}>Modal Close</button>
      </div>
    ) : null
}));

// Mock the Button component
vi.mock("components/ui", () => ({
  Button: ({ children, onClick, variant, className }) => (
    <button onClick={onClick} className={className} data-variant={variant}>
      {children}
    </button>
  )
}));

// Mock the layout components
vi.mock("layout", () => ({
  Column: ({ children, className }) => <div className={className}>{children}</div>,
  Row: ({ children, className }) => <div className={className}>{children}</div>
}));

describe("CreatePipelineErrorModal", () => {
  const defaultProps = {
    show: true,
    close: vi.fn(),
    errorMessage: "Custom error message"
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the modal when show is true", () => {
    render(<CreatePipelineErrorModal {...defaultProps} />);
    expect(screen.getByTestId("createPipeline-error-modal")).toBeInTheDocument();
  });

  it("does not render the modal when show is false", () => {
    render(<CreatePipelineErrorModal {...defaultProps} show={false} />);
    expect(screen.queryByTestId("createPipeline-error-modal")).not.toBeInTheDocument();
  });

  it("displays the error title correctly", () => {
    render(<CreatePipelineErrorModal {...defaultProps} />);
    expect(screen.getByText("Error Creating Pipeline")).toBeInTheDocument();
  });

  it("displays the custom error message when provided", () => {
    render(<CreatePipelineErrorModal {...defaultProps} />);
    expect(screen.getByText("Custom error message")).toBeInTheDocument();
  });

  it("displays the default error message when no custom message is provided", () => {
    const { rerender } = render(<CreatePipelineErrorModal {...defaultProps} errorMessage="" />);
    expect(screen.getByText("There was an issue creating the pipeline. Please ensure all mandatory fields (Pipeline Name and Sector) are filled correctly and try again.")).toBeInTheDocument();
    
    rerender(<CreatePipelineErrorModal {...defaultProps} errorMessage={undefined as any} />);
    expect(screen.getByText("There was an issue creating the pipeline. Please ensure all mandatory fields (Pipeline Name and Sector) are filled correctly and try again.")).toBeInTheDocument();
  });

  it("closes the modal when close button is clicked", () => {
    render(<CreatePipelineErrorModal {...defaultProps} />);
    fireEvent.click(screen.getByText("Close"));
    expect(defaultProps.close).toHaveBeenCalled();
  });

  it("closes the modal when modal's close function is triggered", () => {
    render(<CreatePipelineErrorModal {...defaultProps} />);
    fireEvent.click(screen.getByTestId("modal-close-btn"));
    expect(defaultProps.close).toHaveBeenCalled();
  });

  it("uses the correct test ID for the error message", () => {
    render(<CreatePipelineErrorModal {...defaultProps} />);
    const errorMessage = screen.getByText("Custom error message");
    expect(errorMessage.getAttribute("data-testid")).toBe("createPipelineErrorMessage");
  });
});