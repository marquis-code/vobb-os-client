import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { Header } from "../header";

// Mock the dependencies
vi.mock("@tabler/icons-react", () => ({
  IconArrowNarrowLeft: () => <div data-testid="icon-arrow-narrow-left" />,
  IconRotateClockwise: () => <div data-testid="icon-rotate-clockwise" />
}));

vi.mock("components/ui", () => ({
  Button: ({ children, onClick, className, variant, size, ...props }) => (
    <button 
      data-testid={props["data-testid"] || "button"}
      onClick={onClick} 
      className={className}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      {children}
    </button>
  )
}));

describe("Header Component", () => {
  const defaultProps = {
    close: vi.fn(),
    initialMode: "edit",
    resetPipelineStages: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the header with correct elements", () => {
    render(<Header {...defaultProps} />);
    
    expect(screen.getByTestId("close-btn")).toBeInTheDocument();
    expect(screen.getByTestId("icon-arrow-narrow-left")).toBeInTheDocument();
    
    expect(screen.getByText("Edit stages")).toBeInTheDocument();
    
    expect(screen.getByTestId("reset-btn")).toBeInTheDocument();
    expect(screen.getByTestId("icon-rotate-clockwise")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("renders the correct title when in create mode", () => {
    render(<Header {...defaultProps} initialMode="create" />);
    
    expect(screen.getByText("Pipeline Creation")).toBeInTheDocument();
    expect(screen.queryByText("Edit stages")).not.toBeInTheDocument();
  });

  it("calls close function when close button is clicked", () => {
    render(<Header {...defaultProps} />);
    
    const closeButton = screen.getByTestId("close-btn");
    fireEvent.click(closeButton);
    
    expect(defaultProps.close).toHaveBeenCalledTimes(1);
  });

  it("calls resetPipelineStages function when reset button is clicked", () => {
    render(<Header {...defaultProps} />);
    
    const resetButton = screen.getByTestId("reset-btn");
    fireEvent.click(resetButton);
    
    expect(defaultProps.resetPipelineStages).toHaveBeenCalledTimes(1);
  });

  it("renders buttons with correct styling classes", () => {
    render(<Header {...defaultProps} />);
    
    const closeButton = screen.getByTestId("close-btn");
    expect(closeButton.className).toContain("w-[26px] h-[26px] p-0 shadow-sm");
    
    const resetButton = screen.getByTestId("reset-btn");
    expect(resetButton.className).toContain("flex items-center gap-2 w-fit px-2 shadow-sm text-xs font-medium leading-5");
  });
});