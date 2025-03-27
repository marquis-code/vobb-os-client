import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { Delete } from "../delete";

// Mock the dependencies
vi.mock("@tabler/icons-react", () => ({
  IconTrash: () => <div data-testid="icon-trash" />
}));

vi.mock("components/ui", () => ({
  Button: ({ children, onClick, className, variant, size, "data-testid": dataTestId }) => (
    <button 
      data-testid={dataTestId} 
      onClick={onClick} 
      className={className}
      data-variant={variant}
      data-size={size}
    >
      {children}
    </button>
  )
}));

vi.mock("layout", () => ({
  Column: ({ children, className }) => <div className={className} data-testid="column">{children}</div>,
  Row: ({ children, className }) => <div className={className} data-testid="row">{children}</div>
}));

vi.mock("lib", () => ({
  cn: (...args) => args.filter(Boolean).join(" ")
}));

describe("Delete Component", () => {
  const mockBlock = {
    _id: "stage1",
    title: "Stage 1",
    level: 1,
    color: "#FF0000",
    allow_all_stages: true
  };

  const defaultProps = {
    block: mockBlock,
    index: 0,
    activeStageIndex: null,
    handleDeleteStage: vi.fn(),
    internalMode: "edit" as const
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the delete button with correct attributes", () => {
    render(<Delete {...defaultProps} />);
    const deleteButton = screen.getByTestId("delete-button");
    
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton.getAttribute("data-variant")).toBe("outline");
    expect(deleteButton.getAttribute("data-size")).toBe("sm");
    expect(deleteButton.getAttribute("className")).toContain("min-w-[30px] min-h-[30px]");
    expect(screen.getByTestId("icon-trash")).toBeInTheDocument();
  });

  it("displays block level and title correctly", () => {
    render(<Delete {...defaultProps} />);
    
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Stage 1")).toBeInTheDocument();
  });

  it("displays color indicator with correct background color", () => {
    render(<Delete {...defaultProps} />);
    
    const colorIndicator = screen.getByTestId("color-indicator");
    expect(colorIndicator).toHaveStyle("background-color: #FF0000");
    expect(screen.getByText("Color")).toBeInTheDocument();
  });

  it("calls handleDeleteStage with correct index when delete button is clicked", () => {
    render(<Delete {...defaultProps} />);
    
    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);
    
    expect(defaultProps.handleDeleteStage).toHaveBeenCalledWith(0);
  });

  it("works in create mode", () => {
    render(<Delete {...defaultProps} internalMode="create" />);
    
    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);
    
    expect(defaultProps.handleDeleteStage).toHaveBeenCalledWith(0);
  });
});