import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { CreateClientGroupModal } from "components/modalVariants/createClientGroupModal";
import userEvent from "@testing-library/user-event";
import { MockClientType, MockPipeline } from "pages/client-group/__mocks__/types";


vi.mock("components/ui", () => ({
  Button: ({ children, onClick, disabled, loading, ...props }) => (
    <button onClick={onClick} disabled={disabled || loading} data-loading={loading} {...props}>
      {children}
    </button>
  ),
  toast: vi.fn()
}));


interface ApiResponse {
  status: number | null;
  data: any | null;
}

let mockApiResponse: ApiResponse = {
  status: null,
  data: null
};

let mockApiError = null;

// Mock the API request hook
const mockRunFunction = vi.fn();
vi.mock("hooks", () => ({
  useApiRequest: () => ({
    run: mockRunFunction,
    requestStatus: { isPending: false },
    data: mockApiResponse,
    error: mockApiError
  })
}));

vi.mock("api", () => ({
  fetchAllClientsPerPipelinesService: vi.fn()
}));


vi.mock("modules/client-group/select-clients", () => ({
  default: ({ label, selectedOptions, setSelectedOptions, options }) => {
    const handleSelection = () => {
      const selectedClients = options.slice(0, 2).map(option => ({
        _id: option._id,
        name: option.name
      }));
      setSelectedOptions(selectedClients);
    };
    
    return (
      <div data-testid="select-clients">
        <label>{label}</label>
        <div data-testid="clients-select">
          {options.map((option) => (
            <div key={option._id}>{option.name}</div>
          ))}
        </div>
        {/* Add a button to trigger selection without relying on DOM properties */}
        <button 
          data-testid="select-clients-button" 
          onClick={handleSelection}>
          Select Clients
        </button>
      </div>
    );
  }
}));

vi.mock("components/form", () => ({
  CustomInput: ({ label, value, onChange, placeholder, name, required }) => (
    <div>
      <label>{label}</label>
      <input
        data-testid={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        required={required}
      />
    </div>
  ),
  SelectInput: ({ label, onChange, placeholder, options, loading }) => (
    <div>
      <label>{label}</label>
      <select
        data-testid="pipeline-select"
        onChange={(e) => {
          const selectedOption = options.find((opt) => opt.value === e.target.value);
          onChange(selectedOption);
        }}
        disabled={loading}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button 
        data-testid="select-pipeline-button" 
        onClick={() => onChange({ value: "pipeline1", label: "Pipeline 1" })}>
        Select Pipeline 1
      </button>
    </div>
  )
}));

vi.mock("components/modal", () => ({
  Modal: ({ children, contentClassName, show, close, testId }) => (
    <div data-testid={testId} className={contentClassName} data-show={show}>
      {children}
      <button data-testid="modal-close" onClick={close}>
        Close Modal
      </button>
    </div>
  )
}));

describe("CreateClientGroupModal", () => {
  const mockProps = {
    show: true,
    close: vi.fn(),
    pipelinesData: [
      { _id: "pipeline1", name: "Pipeline 1" },
      { _id: "pipeline2", name: "Pipeline 2" }
    ] as MockPipeline[],
    isFetchingPiplines: false,
    submit: vi.fn(),
    isSubmitting: false,
    groupName: "",
    setGroupName: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockApiResponse = {
      status: null,
      data: null
    };
    mockApiError = null;
    mockRunFunction.mockClear();
  });

  it("renders the modal correctly", () => {
    render(<CreateClientGroupModal {...mockProps} />);
    
    expect(screen.getByText("New group")).toBeInTheDocument();
    expect(screen.getByTestId("name")).toBeInTheDocument();
    expect(screen.getByTestId("pipeline-select")).toBeInTheDocument();
    expect(screen.getByTestId("select-clients")).toBeInTheDocument();
  });

  it("closes the modal when close button is clicked", async () => {
    render(<CreateClientGroupModal {...mockProps} />);
    
    const closeButton = screen.getByTestId("modal-close");
    await userEvent.click(closeButton);
    
    expect(mockProps.close).toHaveBeenCalledTimes(1);
  });

  it("updates group name when input changes", async () => {
    render(<CreateClientGroupModal {...mockProps} />);
    
    const nameInput = screen.getByTestId("name");
    await userEvent.type(nameInput, "Test Group");
    
    expect(mockProps.setGroupName).toHaveBeenCalled();
  });

  it("submits the form with valid data", async () => {
    // Setup with required data
    const updatedProps = {
      ...mockProps,
      groupName: "Test Group"
    };
    
   
    mockApiResponse = {
      status: 200,
      data: {
        data: {
          clients: [
            { _id: "client1", name: "Client 1" },
            { _id: "client2", name: "Client 2" }
          ]
        }
      }
    };
    

    mockRunFunction.mockResolvedValue({
      status: 200,
      data: {
        data: {
          clients: [
            { _id: "client1", name: "Client 1" },
            { _id: "client2", name: "Client 2" }
          ]
        }
      }
    });
    
    render(<CreateClientGroupModal {...updatedProps} />);
    

    const selectPipelineButton = screen.getByTestId("select-pipeline-button");
    await userEvent.click(selectPipelineButton);
    

    const selectClientsButton = screen.getByTestId("select-clients-button");
    await userEvent.click(selectClientsButton);
    

    const submitButton = screen.getByText("Create Pipeline");
    await userEvent.click(submitButton);
    

    await waitFor(() => {
      expect(mockProps.submit).toHaveBeenCalled();
    });
  });

  it("disables submit button when required fields are missing", () => {
    render(<CreateClientGroupModal {...mockProps} />);
    
    const submitButton = screen.getByText("Create Pipeline");
    expect(submitButton).toBeDisabled();
  });

  it("shows loading state when submitting", () => {
    const submittingProps = {
      ...mockProps,
      isSubmitting: true
    };
    
    render(<CreateClientGroupModal {...submittingProps} />);
    
    const submitButton = screen.getByText("Create Pipeline");
    expect(submitButton).toHaveAttribute("data-loading", "true");
  });
});