import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EditPipelineStages } from "../editPipelineStages";
import { vi } from "vitest";
import { toast } from "components";
import { act } from "react-dom/test-utils";

vi.mock("api", () => ({
  editPipelineStagesService: vi.fn().mockImplementation((id, data) => ({
    id,
    data
  }))
}));

// Mock the useApiRequest hook
const runMock = vi.fn();
let mockData: null | { status: number; data: { message: string } } = null;
let mockError: null | { response: { data: { error: string } } } = null;
let mockRequestStatus = { isPending: false };

vi.mock("hooks", () => ({
  useApiRequest: vi.fn(() => ({
    run: runMock,
    data: mockData,
    requestStatus: mockRequestStatus,
    error: mockError
  }))
}));

vi.mock("components", () => ({
  EditPipelineStagesModal: ({
    show,
    submit,
    close,
    editPipelineStagesStatus,
    initialMode,
    pipelineTableData
  }) =>
    show ? (
      <div data-testid="edit-pipeline-stages-modal">
        <button onClick={() => submit(pipelineTableData._id, { name: "Updated Stage" })}>
          Submit
        </button>
        <button onClick={close} data-testid="close-button">
          Close
        </button>
        <div data-testid="status">{editPipelineStagesStatus.isPending ? "Loading" : "Ready"}</div>
        <div data-testid="mode">{initialMode}</div>
      </div>
    ) : null,
  toast: vi.fn()
}));

// Mock React's useMemo to execute the callback immediately
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useMemo: (callback, deps) => callback()
  };
});

describe("EditPipelineStages", () => {
  const defaultProps = {
    show: true,
    close: vi.fn(),
    callback: vi.fn(),
    mode: "edit" as "edit" | "create",
    pipelineTableData: {
      id: "123",
      name: "Test Pipeline",
      description: "Test description",
      sector: "Test sector",
      creator: { id: "1", avatar: null, name: "Test creator" },
      stages: 0,
      clients: 0,
      package: { id: "pkg-123", name: "Basic" },
      date: "2023-01-01",
      time: "12:00"
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockData = null;
    mockError = null;
    mockRequestStatus = { isPending: false };
  });

  it("renders EditPipelineStagesModal when show is true", () => {
    render(<EditPipelineStages {...defaultProps} />);
    expect(screen.getByTestId("edit-pipeline-stages-modal")).toBeInTheDocument();
  });

  it("calls onSubmit when submit button is clicked", async () => {
    render(<EditPipelineStages {...defaultProps} />);
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(runMock).toHaveBeenCalledWith({
        id: "123",
        data: { name: "Updated Stage" }
      });
    });
  });

  it("closes modal and triggers callback on success", async () => {
    // Set up the mock to return successful data
    mockData = { status: 200, data: { message: "Success" } };

    render(<EditPipelineStages {...defaultProps} />);

    await waitFor(() => {
      expect(defaultProps.close).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(defaultProps.callback).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        description: "Success"
      });
    });
  });

  it("displays an error toast on failure", async () => {
    // Set up the mock to return an error
    mockError = { response: { data: { error: "Failed to update" } } };

    render(<EditPipelineStages {...defaultProps} />);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        variant: "destructive",
        description: "Failed to update"
      });
    });
  });
});
