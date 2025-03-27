import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { Footer } from "../footer";

// Mock the dependencies
vi.mock("components/ui", () => ({
  Button: ({ children, onClick, disabled, loading, variant, size, className }) => (
    <button 
      data-testid={`button-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`}
      onClick={onClick} 
      disabled={disabled}
      data-loading={loading}
      data-variant={variant}
      data-size={size}
      className={className}
    >
      {children}
    </button>
  )
}));

vi.mock("layout", () => ({
  Row: ({ children, className }) => (
    <div data-testid="row" className={className}>
      {children}
    </div>
  )
}));

vi.mock("@tabler/icons-react", () => ({
  IconInfoCircle: () => <div data-testid="icon-info-circle" />
}));

vi.mock("components/ui/tooltip", () => ({
  Tooltip: ({ children }) => <div data-testid="tooltip">{children}</div>,
  TooltipProvider: ({ children }) => <div data-testid="tooltip-provider">{children}</div>,
  TooltipTrigger: ({ children, asChild }) => (
    <div data-testid="tooltip-trigger" data-aschild={asChild}>
      {children}
    </div>
  ),
  TooltipContent: ({ children, side, className }) => (
    <div data-testid="tooltip-content" data-side={side} className={className}>
      {children}
    </div>
  )
}));

vi.mock("lib", () => ({
  toolTipInfos: {
    stageValidation: "Pipeline must have at least 2 stages"
  }
}));

describe("Footer Component", () => {
  const mockHandleSubmit = vi.fn().mockImplementation(callback => (e) => {
    e?.preventDefault();
    return callback();
  });
  
  const defaultProps = {
    close: vi.fn(),
    loading: false,
    initialMode: "edit",
    internalMode: "edit",
    hasBlocksChanged: vi.fn().mockReturnValue(true),
    blocks: [
      { _id: "block1", title: "Stage 1" },
      { _id: "block2", title: "Stage 2" }
    ],
    handleSubmit: mockHandleSubmit,
    onSubmit: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the footer with correct elements for edit mode", () => {
    render(<Footer {...defaultProps} />);
    
    // Check if the cancel button is rendered
    expect(screen.getByTestId("button-cancel")).toBeInTheDocument();
    
    // Check if the save button is rendered with correct text
    expect(screen.getByTestId("button-save-changes")).toBeInTheDocument();
    
    // Check that "Skip Stage Creation" is not rendered in edit mode
    expect(screen.queryByTestId("button-skip-stage-creation")).not.toBeInTheDocument();
  });

  it("renders the footer with correct elements for create mode", () => {
    render(<Footer {...defaultProps} initialMode="create" internalMode="create" />);
    
    // Check if the cancel button is rendered
    expect(screen.getByTestId("button-cancel")).toBeInTheDocument();
    
    // Check if the create button is rendered with correct text
    expect(screen.getByTestId("button-create-stages")).toBeInTheDocument();
    
    // Check if the skip button is rendered in create mode
    expect(screen.getByTestId("button-skip-stage-creation")).toBeInTheDocument();
  });

  it("calls close function when cancel button is clicked", () => {
    render(<Footer {...defaultProps} />);
    
    const cancelButton = screen.getByTestId("button-cancel");
    fireEvent.click(cancelButton);
    
    expect(defaultProps.close).toHaveBeenCalledTimes(1);
  });

  it("calls close function when skip button is clicked in create mode", () => {
    render(<Footer {...defaultProps} initialMode="create" internalMode="create" />);
    
    const skipButton = screen.getByTestId("button-skip-stage-creation");
    fireEvent.click(skipButton);
    
    expect(defaultProps.close).toHaveBeenCalledTimes(1);
  });

  it("calls onSubmit function when save button is clicked", () => {
    render(<Footer {...defaultProps} />);
    
    const saveButton = screen.getByTestId("button-save-changes");
    fireEvent.click(saveButton);
    
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables save button when loading is true", () => {
    render(<Footer {...defaultProps} loading={true} />);
    
    const saveButton = screen.getByTestId("button-save-changes");
    expect(saveButton).toHaveAttribute("disabled");
  });

  it("disables save button when blocks haven't changed in edit mode", () => {
    render(<Footer {...defaultProps} hasBlocksChanged={vi.fn().mockReturnValue(false)} />);
    
    const saveButton = screen.getByTestId("button-save-changes");
    expect(saveButton).toHaveAttribute("disabled");
  });

  it("disables save button when there are fewer than 2 blocks in create mode", () => {
    render(
      <Footer 
        {...defaultProps} 
        initialMode="create" 
        internalMode="create"
        blocks={[{ _id: "block1", title: "Stage 1" }]} 
      />
    );
    
    const createButton = screen.getByTestId("button-create-stages");
    expect(createButton).toHaveAttribute("disabled");
  });

  it("disables save button when any block title is '[Stage title]'", () => {
    render(
      <Footer 
        {...defaultProps} 
        blocks={[
          { _id: "block1", title: "Stage 1" },
          { _id: "block2", title: "[Stage title]" }
        ]} 
      />
    );
    
    const saveButton = screen.getByTestId("button-save-changes");
    expect(saveButton).toHaveAttribute("disabled");
  });

  it("renders tooltip with validation message when there are fewer than 2 blocks in create mode", () => {
    render(
      <Footer 
        {...defaultProps} 
        initialMode="create" 
        internalMode="create"
        blocks={[{ _id: "block1", title: "Stage 1" }]} 
      />
    );
    
    expect(screen.getByTestId("tooltip-content")).toBeInTheDocument();
    expect(screen.getByText("Pipeline must have at least 2 stages")).toBeInTheDocument();
    expect(screen.getByTestId("icon-info-circle")).toBeInTheDocument();
  });

  it("does not render tooltip in edit mode", () => {
    render(
      <Footer 
        {...defaultProps} 
        blocks={[{ _id: "block1", title: "Stage 1" }]} 
      />
    );
    
    expect(screen.queryByTestId("tooltip-content")).not.toBeInTheDocument();
  });
});