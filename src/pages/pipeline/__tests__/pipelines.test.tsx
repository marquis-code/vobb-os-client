import { render, screen, fireEvent } from "@testing-library/react";
import { Pipelines } from "../index";
import { vi } from "vitest";

const mockPipelinesUI = vi.fn(props => {
  return (
    <div data-testid="pipelines-ui">
      <button 
        data-testid="create-pipeline-button" 
        onClick={props.handleCreatePipeline}>
        Create Pipeline
      </button>
    </div>
  );
});

vi.mock("modules", () => ({
  PipelinesUI: (props) => mockPipelinesUI(props)
}));

vi.mock("../createPipeline", () => ({
  CreatePipeline: ({ show, close }) => 
    show ? (
      <div data-testid="createPipeline-modal">
        <button data-testid="close-btn" onClick={close}>
          Close
        </button>
      </div>
    ) : null
}));

const mockFetchPipelinesService = vi.fn();
const mockEditPipelineTitleService = vi.fn();

vi.mock("api", () => ({
  fetchPipelinesService: (...args) => mockFetchPipelinesService(...args),
  editPipelineTitleService: (...args) => mockEditPipelineTitleService(...args)
}));

vi.mock("components", () => ({
  toast: vi.fn()
}));

const mockRunFetchPipelines = vi.fn();
const mockRunEditPipelineTitle = vi.fn();

vi.mock("hooks", () => {
  return {
    useApiRequest: vi.fn().mockImplementation((config) => {
      if (mockRunFetchPipelines.mock.calls.length === 0) {
        return {
          run: mockRunFetchPipelines,
          data: { 
            status: 200, 
            data: { 
              data: { 
                pipelines: [], 
                page: 1, 
                total_pages: 1, 
                total_count: 0 
              } 
            }
          },
          error: null,
          requestStatus: { isPending: false }
        };
      } 
      else {
        return {
          run: mockRunEditPipelineTitle,
          data: null,
          error: null,
          requestStatus: { isPending: false }
        };
      }
    })
  };
});


vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useMemo: actual.useMemo,
    useEffect: actual.useEffect,
    useCallback: actual.useCallback
  };
});

describe("Pipelines", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the PipelinesUI component", () => {
    render(<Pipelines />);
    expect(screen.getByTestId("pipelines-ui")).toBeInTheDocument();
    expect(mockPipelinesUI).toHaveBeenCalled();
    expect(mockRunFetchPipelines).toHaveBeenCalled();
  });

  it("renders CreatePipeline modal when create button is clicked", () => {
    render(<Pipelines />);
    
    expect(screen.queryByTestId("createPipeline-modal")).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByTestId("create-pipeline-button"));
    
    expect(screen.getByTestId("createPipeline-modal")).toBeInTheDocument();
  });

  it("closes CreatePipeline modal when close button is clicked", () => {
    render(<Pipelines />);
    
    fireEvent.click(screen.getByTestId("create-pipeline-button"));
    
    expect(screen.getByTestId("createPipeline-modal")).toBeInTheDocument();
    
    fireEvent.click(screen.getByTestId("close-btn"));
    
    expect(screen.queryByTestId("createPipeline-modal")).not.toBeInTheDocument();
  });
});