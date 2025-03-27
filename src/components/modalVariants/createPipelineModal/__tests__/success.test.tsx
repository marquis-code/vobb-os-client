import { render, screen, fireEvent } from "@testing-library/react";
import { CreatePipelineSuccessModal } from "../success";
import { vi } from "vitest";

// Mock the dependencies
vi.mock("@tabler/icons-react", () => ({
  IconPlus: () => <div data-testid="icon-plus" />
}));

vi.mock("components/modal", () => ({
  Modal: ({ children, show, close, testId }) =>
    show ? (
      <div data-testid={testId}>
        <button data-testid="modal-close-btn" onClick={close}>
          Close Modal
        </button>
        {children}
      </div>
    ) : null
}));

vi.mock("components/ui", () => ({
  Button: ({ children, onClick, variant, className }) => (
    <button
      onClick={onClick}
      data-variant={variant}
      className={className}
      data-testid="button"
    >
      {children}
    </button>
  )
}));

vi.mock("layout", () => ({
  Column: ({ children, className }) => (
    <div data-testid="column" className={className}>
      {children}
    </div>
  ),
  Row: ({ children, className }) => (
    <div data-testid="row" className={className}>
      {children}
    </div>
  )
}));

describe("CreatePipelineSuccessModal", () => {
  const defaultProps = {
    show: true,
    close: vi.fn(),
    onEditPipelineStages: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the modal when show is true", () => {
    render(<CreatePipelineSuccessModal {...defaultProps} />);
    expect(screen.getByTestId("createPipeline-success-modal")).toBeInTheDocument();
  });

  it("does not render the modal when show is false", () => {
    render(<CreatePipelineSuccessModal {...defaultProps} show={false} />);
    expect(screen.queryByTestId("createPipeline-success-modal")).not.toBeInTheDocument();
  });

  it("displays the success title correctly", () => {
    render(<CreatePipelineSuccessModal {...defaultProps} />);
    expect(screen.getByText("Pipeline Created Successfully!")).toBeInTheDocument();
  });

  it("displays the success message correctly", () => {
    render(<CreatePipelineSuccessModal {...defaultProps} />);
    expect(screen.getByText("You have successfully created the pipeline. You can now proceed to add stages to define the client journey.")).toBeInTheDocument();
  });

  it("closes the modal when close button is clicked", () => {
    render(<CreatePipelineSuccessModal {...defaultProps} />);
    
    // Find close button by text
    const closeButtons = screen.getAllByRole("button");
    const closeButton = closeButtons.find(button => button.textContent?.includes("Close"));
    
    fireEvent.click(closeButton);
    expect(defaultProps.close).toHaveBeenCalled();
  });

  it("closes the modal when modal's close function is triggered", () => {
    render(<CreatePipelineSuccessModal {...defaultProps} />);
    fireEvent.click(screen.getByTestId("modal-close-btn"));
    expect(defaultProps.close).toHaveBeenCalled();
  });

  it("calls both close and onEditPipelineStages when 'Add stage' button is clicked", () => {
    render(<CreatePipelineSuccessModal {...defaultProps} />);
    
    const buttons = screen.getAllByTestId("button");
    const addStageButton = buttons.find(button => 
      button.textContent?.includes("Add stage")
    );
    
    fireEvent.click(addStageButton);
    expect(defaultProps.close).toHaveBeenCalled();
    expect(defaultProps.onEditPipelineStages).toHaveBeenCalled();
  });

  it("uses the correct layout components", () => {
    render(<CreatePipelineSuccessModal {...defaultProps} />);
    expect(screen.getAllByTestId("column")).toHaveLength(2);
    expect(screen.getByTestId("row")).toBeInTheDocument();
  });
  
  it("renders the add stage button with fill variant", () => {
    render(<CreatePipelineSuccessModal {...defaultProps} />);
    
    const buttons = screen.getAllByTestId("button");
    const addStageButton = buttons.find(button => 
      button.textContent?.includes("Add stage")
    );
    
    expect(addStageButton).toHaveAttribute("data-variant", "fill");
  });
});