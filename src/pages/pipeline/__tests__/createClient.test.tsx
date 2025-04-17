import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, Mock } from "vitest";
import { CreateClient } from "../createClient";
import { useApiRequest } from "hooks";

// Mock dependencies
const mockToast = vi.fn();
const mockClose = vi.fn();
const mockCallback = vi.fn();

// Default Props
const defaultProps = {
  close: mockClose,
  show: true,
  callback: mockCallback
};

// Mock dependencies
vi.mock("components", () => ({
  toast: (params) => mockToast(params),
  CreateClientModal: vi.fn(({ submit, loading, ...props }) => (
    <div data-testid="add-pipeline-client-modal">
      <button
        data-testid="submit-button"
        onClick={() => submit(mockSubmitData, "pipelineId")}
        disabled={loading}>
        Submit
      </button>
    </div>
  ))
}));

vi.mock("hooks", () => ({
  useApiRequest: vi.fn().mockImplementation(() => ({
    run: vi.fn(),
    data: null,
    error: null,
    requestStatus: {
      isPending: false
    }
  }))
}));

vi.mock("context", () => ({
  useModalContext: vi.fn().mockReturnValue({
    pipelineId: "test-pipeline-id",
    addClient: {
      showPipelines: true
    }
  })
}));

vi.mock("api", () => ({
  createPipelineClientService: vi.fn()
}));

// Mock submit data
const mockSubmitData = {
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  branch: { value: "branch1" },
  nationality: { value: "nationality1" },
  country: { value: "country1" },
  primary_language: { value: "language1" },
  gender: { value: "male" }
};

describe("AddPipelineClient Component", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it("renders the component with modal", () => {
    render(<CreateClient {...defaultProps} />);

    expect(screen.getByTestId("add-pipeline-client-modal")).toBeInTheDocument();
  });

  it("calls submit function with correct data", async () => {
    const mockRunFn = vi.fn();

    // Mock a successful response
    (useApiRequest as unknown as Mock).mockReturnValue({
      run: mockRunFn,
      data: { status: 201, data: { message: "Client created successfully" } },
      error: null,
      requestStatus: {
        isPending: false
      }
    });

    render(<CreateClient {...defaultProps} />);

    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeDefined();
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);

    await waitFor(async () => {
      // Verify the run method was called with the correct service and transformed data
      expect(mockRunFn).toHaveBeenCalled();
    });
  });

  it("handles successful client creation", async () => {
    // Mock a successful response
    (useApiRequest as unknown as Mock).mockReturnValue({
      run: vi.fn(),
      data: { status: 201, data: { message: "Client created successfully" } },
      error: null,
      requestStatus: {
        isPending: false
      }
    });

    render(<CreateClient {...defaultProps} />);

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    // Verify toast was called with success message
    expect(mockToast).toHaveBeenCalledWith({
      description: "Client created successfully"
    });

    expect(mockClose).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenCalled();
  });

  it("handles error during client creation", async () => {
    // Mock an error response
    const mockError = {
      response: {
        data: {
          error: "Failed to create client"
        }
      }
    };

    (useApiRequest as unknown as Mock).mockReturnValue({
      run: vi.fn(),
      data: null,
      error: mockError,
      requestStatus: {
        isPending: false
      }
    });

    render(<CreateClient {...defaultProps} />);

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    expect(mockToast).toHaveBeenCalledWith({
      variant: "destructive",
      description: "Failed to create client"
    });

    // Verify close was NOT called
    expect(mockClose).not.toHaveBeenCalled();

    // Verify onUpdate was NOT called
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it("handles loading state", () => {
    // Mock pending state
    (useApiRequest as unknown as Mock).mockReturnValue({
      run: vi.fn(),
      data: null,
      error: null,
      requestStatus: {
        isPending: true
      }
    });

    render(<CreateClient {...defaultProps} />);

    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();
  });

  it("does not render the modal when show is false", () => {
    render(<CreateClient {...defaultProps} show={false} />);

    expect(screen.queryByTestId("add-client-modal")).toBeNull();
  });

  it("handles missing callback gracefully", async () => {
    // Mock a successful response
    (useApiRequest as unknown as Mock).mockReturnValue({
      run: vi.fn(),
      data: { status: 201, data: { message: "Client created successfully" } },
      error: null,
      requestStatus: {
        isPending: false
      }
    });

    render(<CreateClient {...defaultProps} callback={undefined} />);

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    expect(mockToast).toHaveBeenCalledWith({
      description: "Client created successfully"
    });

    // Verify close was called
    expect(mockClose).toHaveBeenCalled();
  });
});
