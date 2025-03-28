import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import * as hooks from "hooks";
import { EditPipelineStagesModal } from "..";
import { IPipelineStage } from "types";

// Mock the dependencies
vi.mock("components/modal", () => ({
  Modal: ({ children, show, close, ...props }) => 
    show ? <div data-testid="modal" onClick={close} {...props}>{children}</div> : null
}));

vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: vi.fn(),
    handleSubmit: (fn) => (e) => { e?.preventDefault(); fn(); },
    setValue: vi.fn(),
    getValues: vi.fn()
  })
}));

vi.mock("./footer", () => ({
  Footer: ({ onSubmit, handleSubmit }) => (
    <button data-testid="submit-button" onClick={handleSubmit(onSubmit)}>Submit</button>
  )
}));

vi.mock("./sideBar", () => ({
  Sidebar: () => <div data-testid="sidebar" />
}));

vi.mock("./header", () => ({
  Header: ({ close, resetPipelineStages }) => (
    <div data-testid="header">
      <button data-testid="close-button" onClick={close}>Close</button>
      <button data-testid="reset-button" onClick={resetPipelineStages}>Reset</button>
    </div>
  )
}));

vi.mock("./canvas", () => ({
  Canvas: ({ handleAddStage, handleDeleteStage, handleStageSelection }) => (
    <div data-testid="canvas">
      <button data-testid="add-stage" onClick={() => handleAddStage(0)}>Add Stage</button>
      <button data-testid="delete-stage" onClick={() => handleDeleteStage(0)}>Delete Stage</button>
      <button data-testid="select-stage" onClick={() => handleStageSelection(0)}>Select Stage</button>
    </div>
  )
}));

vi.mock("layout", () => ({
  Row: ({ children, ...props }) => <div data-testid="row" {...props}>{children}</div>
}));

// Mock the hooks
const mockFetchPipelineStages = vi.fn();
const mockPipelineStages: IPipelineStage[] = [
  { _id: "stage1", title: "Stage 1", level: 1, color: "#000000", allow_all_stages: true },
  { _id: "stage2", title: "Stage 2", level: 2, color: "#ffffff", allow_all_stages: false, allowed_stages: ["stage1"] }
];

vi.mock("hooks", () => {
  const originalModule = vi.importActual("hooks");
  return {
    ...originalModule,
    useFetchPipelineStages: vi.fn(() => ({
      fetchPipelineStages: mockFetchPipelineStages,
      pipelineStages: mockPipelineStages
    })),
    usePipelineStages: vi.fn(() => ({
      blocks: [
        { _id: "block1", title: "Block 1", level: 1, color: "#ff0000", allow_all_stages: true },
        { _id: "block2", title: "Block 2", level: 2, color: "#00ff00", allow_all_stages: false, allowed_stages: ["block1"] }
      ],
      setBlocks: vi.fn(),
      activeStageIndex: 0,
      setActiveStageIndex: vi.fn(),
      color: "#ff0000",
      internalMode: "edit",
      hasBlocksChanged: true,
      handleColorChange: vi.fn(),
      handleTitleChange: vi.fn(),
      handleStageSelection: vi.fn(),
      handleAddStage: vi.fn(),
      handleDeleteStage: vi.fn(),
      handleReset: vi.fn(),
      handleStagePermissionToggle: vi.fn(),
      prepareSubmitData: vi.fn(() => [
        { _id: "block1", title: "Block 1", level: 1, color: "#ff0000", allow_all_stages: true },
        { _id: "block2", title: "Block 2", level: 2, color: "#00ff00", allow_all_stages: false, allowed_stages: ["block1"] }
      ]),
      updateOriginalBlocks: vi.fn(),
      titleInputRef: { current: null }
    })),
    useDragAndDrop: vi.fn(() => ({
      handleDragStart: vi.fn(),
      handleDragEnter: vi.fn(),
      handleDragOver: vi.fn(),
      handleDragEnd: vi.fn(),
      isDragging: false,
      dragSrcIdx: null,
      dragTargetIdx: null
    })),
    useCanvasZoom: vi.fn(() => ({
      containerRef: { current: null },
      zoom: 1,
      setZoom: vi.fn(),
      setFitToView: vi.fn(),
      setInteractionMode: vi.fn(),
      setPosition: vi.fn(),
      handleMouseDown: vi.fn(),
      handleMouseMove: vi.fn(),
      handleMouseUp: vi.fn(),
      getZoomStyle: vi.fn(() => ({ transform: 'scale(1)' }))
    }))
  };
});

describe("EditPipelineStagesModal", () => {
  // Fixed the pipelineTableData to match the expected PipelineTableData type
  const defaultProps = {
    show: true,
    close: vi.fn(),
    submit: vi.fn(),
    editPipelineStagesStatus: {
      isResolved: false,
      isPending: false,
      isRejected: false,
      isIdle: true
    },
    initialMode: "edit" as const,
    pipelineTableData: {
      id: "pipeline1",
      name: "Pipeline 1",
      description: "Pipeline description",
      sector: "Sector 1",
      creator: {
        id: "user1",
        avatar: "avatar-url",
        name: "User 1"
      },
      clients: 5,
      stages: 3,
      package: {
        id: "package1",
        name: "Basic"
      },
      date: new Date().toISOString(),
      time: "12:00 PM"
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the modal when show is true", () => {
    render(<EditPipelineStagesModal {...defaultProps} />);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("does not render the modal when show is false", () => {
    render(<EditPipelineStagesModal {...defaultProps} show={false} />);
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("fetches pipeline stages when the modal is shown", () => {
    render(<EditPipelineStagesModal {...defaultProps} />);
    expect(mockFetchPipelineStages).toHaveBeenCalledTimes(1);
  });

  it("calls the close function when close button is clicked", () => {
    render(<EditPipelineStagesModal {...defaultProps} />);
    fireEvent.click(screen.getByTestId("close-button"));
    expect(defaultProps.close).toHaveBeenCalledTimes(1);
  });

  it("calls the reset function when reset button is clicked", () => {
    const { handleReset } = hooks.usePipelineStages(mockPipelineStages, "edit", true);
    render(<EditPipelineStagesModal {...defaultProps} />);
    fireEvent.click(screen.getByTestId("reset-button"));
    expect(handleReset).toHaveBeenCalledTimes(1);
  });

  it("calls handleAddStage when add stage button is clicked", () => {
    const { handleAddStage } = hooks.usePipelineStages(mockPipelineStages, "edit", true);
    render(<EditPipelineStagesModal {...defaultProps} />);
    fireEvent.click(screen.getByTestId("add-stage"));
    expect(handleAddStage).toHaveBeenCalledTimes(1);
    expect(handleAddStage).toHaveBeenCalledWith(0);
  });

  it("calls handleDeleteStage when delete stage button is clicked", () => {
    const { handleDeleteStage } = hooks.usePipelineStages(mockPipelineStages, "edit", true);
    render(<EditPipelineStagesModal {...defaultProps} />);
    fireEvent.click(screen.getByTestId("delete-stage"));
    expect(handleDeleteStage).toHaveBeenCalledTimes(1);
    expect(handleDeleteStage).toHaveBeenCalledWith(0);
  });

  it("calls handleStageSelection when select stage button is clicked", () => {
    const { handleStageSelection } = hooks.usePipelineStages(mockPipelineStages, "edit", true);
    render(<EditPipelineStagesModal {...defaultProps} />);
    fireEvent.click(screen.getByTestId("select-stage"));
    expect(handleStageSelection).toHaveBeenCalledTimes(1);
    expect(handleStageSelection).toHaveBeenCalledWith(0);
  });

  it("submits the form with prepared data when submit button is clicked", () => {
    const { prepareSubmitData, updateOriginalBlocks } = hooks.usePipelineStages(mockPipelineStages, "edit", true);
    render(<EditPipelineStagesModal {...defaultProps} />);
    fireEvent.click(screen.getByTestId("submit-button"));
    expect(prepareSubmitData).toHaveBeenCalledTimes(1);
    expect(defaultProps.submit).toHaveBeenCalledTimes(1);
    expect(defaultProps.submit).toHaveBeenCalledWith("pipeline1", {
      stages: [
        { _id: "block1", title: "Block 1", level: 1, color: "#ff0000", allow_all_stages: true },
        { _id: "block2", title: "Block 2", level: 2, color: "#00ff00", allow_all_stages: false, allowed_stages: ["block1"] }
      ]
    });
    expect(updateOriginalBlocks).toHaveBeenCalledTimes(1);
  });

  it("fetches pipeline stages when editPipelineStagesStatus.isResolved changes to true", async () => {
    const { rerender } = render(<EditPipelineStagesModal {...defaultProps} />);
    
    // Clear the initial call count
    mockFetchPipelineStages.mockClear();
    
    rerender(
      <EditPipelineStagesModal
        {...defaultProps}
        editPipelineStagesStatus={{
          ...defaultProps.editPipelineStagesStatus,
          isResolved: true
        }}
      />
    );
    
    expect(mockFetchPipelineStages).toHaveBeenCalledTimes(1);
  });

  it("handles create mode correctly", () => {
    render(<EditPipelineStagesModal {...defaultProps} initialMode="create" />);
    expect(hooks.usePipelineStages).toHaveBeenCalledWith(mockPipelineStages, "create", true);
  });

  it("handles null pipelineTableData", () => {
    render(<EditPipelineStagesModal {...defaultProps} pipelineTableData={null} />);
    expect(hooks.useFetchPipelineStages).toHaveBeenCalledWith("");
  });
});