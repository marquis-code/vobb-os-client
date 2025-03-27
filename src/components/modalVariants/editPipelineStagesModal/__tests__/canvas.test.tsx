import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { IUseCanvasZoom } from "hooks";
import { Canvas } from "../canvas";

// Mock the dependencies
vi.mock('@formkit/auto-animate/react', () => ({
  useAutoAnimate: () => [{ current: null }]
}));

vi.mock("components/ui", () => ({
  Button: ({ children, onClick, className }) => (
    <button data-testid="button" onClick={onClick} className={className}>
      {children}
    </button>
  )
}));

vi.mock("layout", () => ({
  Column: ({ children, className, onClick, ...props }) => (
    <div data-testid="column" className={className} onClick={onClick} {...props}>
      {children}
    </div>
  ),
  Row: ({ children, className }) => (
    <div data-testid="row" className={className}>
      {children}
    </div>
  )
}));

vi.mock("components/canvasZoomControls", () => ({
  CanvasZoomControls: () => <div data-testid="canvas-zoom-controls" />
}));

vi.mock("@tabler/icons-react", () => ({
  IconGripVertical: () => <div data-testid="icon-grip-vertical" />,
  IconPlus: () => <div data-testid="icon-plus" />
}));

vi.mock('./delete', () => ({
  Delete: () => <div data-testid="delete-component" />
}));

vi.mock('./permissions', () => ({
  Permissions: () => <div data-testid="permissions-component" />
}));

describe("Canvas Component", () => {
  const mockDragAndDrop = {
    handleDragStart: vi.fn(),
    handleDragEnter: vi.fn(),
    handleDragOver: vi.fn(),
    handleDragEnd: vi.fn()
  };

  const mockCanvasZoom: IUseCanvasZoom = {
    zoom: 1,
    containerRef: { current: null },
    setZoom: vi.fn(),
    setFitToView: vi.fn(),
    setInteractionMode: vi.fn(),
    setPosition: vi.fn(),
    handleMouseDown: vi.fn(),
    handleMouseMove: vi.fn(),
    handleMouseUp: vi.fn(),
    getZoomStyle: vi.fn(() => ({
      transform: 'scale(1)',
      transformOrigin: 'center',
      transition: 'transform 0.2s ease-in-out'
    })),
    position: { x: 0, y: 0 },
    fitToView: false,
    interactionMode: "pan",
    isDragging: false,
    resetZoom: vi.fn()
  };

  const mockStages = [
    { _id: "stage1", title: "Stage 1", level: 1, color: "#FF0000", allow_all_stages: true },
    { _id: "stage2", title: "Stage 2", level: 2, color: "#00FF00", allow_all_stages: false, allowed_stages: ["stage1"] }
  ];

  const defaultProps = {
    blocks: mockStages,
    activeStageIndex: 0,
    handleStageSelection: vi.fn(),
    handleAddStage: vi.fn(),
    handleDeleteStage: vi.fn(),
    handleStagePermissionToggle: vi.fn(),
    dragAndDrop: mockDragAndDrop,
    canvasZoom: mockCanvasZoom,
    internalMode: "edit" as const
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the canvas with correct blocks", () => {
    render(<Canvas {...defaultProps} />);
    
    // Check if the main canvas container is rendered
    expect(screen.getByTestId("canvas-zoom-controls")).toBeInTheDocument();
    
    // Check if the correct number of blocks are rendered
    const columns = screen.getAllByTestId("column");
    expect(columns).toHaveLength(2);
  });

  it("calls handleStageSelection when a stage is clicked", () => {
    render(<Canvas {...defaultProps} />);
    
    const stages = screen.getAllByTestId("column");
    fireEvent.click(stages[0]);
    
    expect(defaultProps.handleStageSelection).toHaveBeenCalledWith(0);
  });

  it("calls handleAddStage when the add button is clicked", () => {
    render(<Canvas {...defaultProps} />);
    
    const addButtons = screen.getAllByTestId("button");
    fireEvent.click(addButtons[0]);
    
    expect(defaultProps.handleAddStage).toHaveBeenCalledWith(0);
  });

  it("calls drag and drop handlers when dragging operations occur", () => {
    render(<Canvas {...defaultProps} />);
    
    const stages = screen.getAllByTestId("column");
    
    // Test drag start
    fireEvent.dragStart(stages[0]);
    expect(mockDragAndDrop.handleDragStart).toHaveBeenCalledWith(expect.any(Object), 0);
    
    // Test drag enter
    fireEvent.dragEnter(stages[0]);
    expect(mockDragAndDrop.handleDragEnter).toHaveBeenCalledWith(expect.any(Object), 0);
    
    // Test drag over
    fireEvent.dragOver(stages[0]);
    expect(mockDragAndDrop.handleDragOver).toHaveBeenCalled();
    
    // Test drag end
    fireEvent.dragEnd(stages[0]);
    expect(mockDragAndDrop.handleDragEnd).toHaveBeenCalledWith(expect.any(Object));
  });

  it("calls mouse event handlers for canvas zoom", () => {
    render(<Canvas {...defaultProps} />);
    
    const canvasContainer = screen.getByTestId("canvas-container") as HTMLElement;
    
    fireEvent.mouseDown(canvasContainer);
    expect(mockCanvasZoom.handleMouseDown).toHaveBeenCalled();
    
    fireEvent.mouseMove(canvasContainer);
    expect(mockCanvasZoom.handleMouseMove).toHaveBeenCalled();
    
    fireEvent.mouseUp(canvasContainer);
    expect(mockCanvasZoom.handleMouseUp).toHaveBeenCalled();
    
    fireEvent.mouseLeave(canvasContainer);
    expect(mockCanvasZoom.handleMouseUp).toHaveBeenCalled();
  });
});