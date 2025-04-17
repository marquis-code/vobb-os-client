import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ActionColumn from "modules/client-group/ActionColumn";
import userEvent from "@testing-library/user-event";
import { ClientGroupTableData } from "types/client-group"; // Import the actual type


interface ApiResponse {
  status: number | null;
  data: any | null;
}

let mockApiResponse: ApiResponse = {
  status: null,
  data: null
};

let mockApiError = null;


vi.mock("components/ui", () => {
  const mockToast = vi.fn();
  
  return {
    Button: ({ children, onClick, variant, className }) => (
      <button onClick={onClick} className={className} data-variant={variant}>
        {children}
      </button>
    ),
    Popover: ({ children, modal, open, onOpenChange }) => {
      return (
        <div data-testid="popover" data-open={open}>
          {children}
          <button data-testid="open-popover" onClick={() => onOpenChange && onOpenChange(true)}>
            Open Popover
          </button>
          <button data-testid="close-popover" onClick={() => onOpenChange && onOpenChange(false)}>
            Close Popover
          </button>
        </div>
      );
    },
    PopoverContent: ({ children, align, className }) => (
      <div data-testid="popover-content" className={className}>
        {children}
      </div>
    ),
    PopoverTrigger: ({ children, asChild }) => (
      <div data-testid="popover-trigger">{children}</div>
    ),
    toast: mockToast
  };
});

vi.mock("components/ui/dropdown-menu", () => {
  // Create a mock implementation that tracks state
  let isOpen = false;
  let onOpenChangeFn = vi.fn();
  
  return {
    DropdownMenu: ({ children, open, onOpenChange }) => {
      isOpen = open !== undefined ? open : isOpen;
      onOpenChangeFn = onOpenChange || onOpenChangeFn;
      
      return (
        <div data-testid="dropdown-menu" data-open={isOpen}>
          {children}
          <button data-testid="open-dropdown" onClick={() => onOpenChangeFn(true)}>
            Open Dropdown
          </button>
          <button data-testid="close-dropdown" onClick={() => onOpenChangeFn(false)}>
            Close Dropdown
          </button>
        </div>
      );
    },
    DropdownMenuTrigger: ({ children, asChild }) => (
      <div data-testid="dropdown-trigger">{children}</div>
    ),
    DropdownMenuContent: ({ children, align, className }) => (
      <div data-testid="dropdown-content" className={className}>
        {children}
      </div>
    ),
    DropdownMenuItem: ({ children, className, onClick, "data-testid": testId, onSelect }) => (
      <div
        data-testid={testId}
        className={className}
        onClick={(e) => {
          if (onClick) onClick(e);
          if (onSelect) onSelect(e);
        }}>
        {children}
      </div>
    )
  };
});

vi.mock("hooks", () => ({
  useApiRequest: () => ({
    run: vi.fn(),
    requestStatus: { isPending: false },
    data: mockApiResponse,
    error: mockApiError
  })
}));

vi.mock("api/services/client-group", () => ({
  editGroupNameService: vi.fn(),
  assignMemberToGroupService: vi.fn(),
  ungroupClientGroupService: vi.fn(),
  updateClientGroupStageService: vi.fn(),
  fetchOrgMembersListService: vi.fn()
}));

vi.mock("api", () => ({
  fetchPipelineStagesService: vi.fn()
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  Routes: {
    client_group: (id: string, tab: string) => `/client-group/${id}/${tab}`
  }
}));

vi.mock("modules/client-group/confirmDangerousActionModal", () => ({
  default: ({ show, close, action, loading, title, description }) => (
    <div data-testid="confirm-modal" data-show={show}>
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={close}>Cancel</button>
      <button onClick={action} disabled={loading} data-testid="confirm-action-button">
        Confirm
      </button>
    </div>
  )
}));

vi.mock("modules/client-group/selection-panel", () => ({
  SelectionPanel: ({ close, onSubmit, items, type, loading, singleSelect }) => (
    <div data-testid={`selection-panel-${type}`}>
      <button onClick={close}>Close</button>
      <button 
        onClick={() => onSubmit(singleSelect ? [items[0]?._id || "test-id"] : [items[0]?._id || "test-id", items[1]?._id || "test-id-2"])}
        data-testid={`submit-${type}`}>
        Submit
      </button>
    </div>
  )
}));

vi.mock("components", () => ({
  InputActionModal: ({ modalView, handleClose, prefilledValue, onConfirm }) => (
    <div data-testid="input-action-modal" data-show={modalView}>
      <input
        data-testid="edit-name-input"
        defaultValue={prefilledValue}
      />
      <button onClick={() => onConfirm("Updated Name")} data-testid="save-name-button">Save</button>
      <button onClick={handleClose}>Cancel</button>
    </div>
  )
}));


vi.mock("types/client-group", () => {
  return {
    ClientGroupTableData: {}
  };
});

describe("ActionColumn", () => {

  const mockRowData: ClientGroupTableData = {
    id: "group1",
    name: "Family Summer Vacation",
    clients: 12,
    pipeline: { name: "Tourism Package Sales", _id: "pipeline1" },
    date: "07-10-2024",
    time: "10:30 AM",
    assignedTo: { name: "David Wilson", avatar: "" },
  } as unknown as ClientGroupTableData;
  
  const mockHandleRefreshTable = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockApiResponse = {
      status: null,
      data: null
    };
    mockApiError = null;
  });

  it("renders the action button correctly", () => {
    render(<ActionColumn rowData={mockRowData} handleRefreshTable={mockHandleRefreshTable} />);
    
    expect(screen.getByTestId("client-group-actions")).toBeInTheDocument();
  });

  it("opens dropdown menu when action button is clicked", async () => {
    render(<ActionColumn rowData={mockRowData} handleRefreshTable={mockHandleRefreshTable} />);
    
    const openButton = screen.getByTestId("open-dropdown");
    await userEvent.click(openButton);
    
    expect(screen.getByTestId("dropdown-menu")).toHaveAttribute("data-open", "true");
  });

  it("shows all action options in dropdown", async () => {
    render(<ActionColumn rowData={mockRowData} handleRefreshTable={mockHandleRefreshTable} />);
    
    const openButton = screen.getByTestId("open-dropdown");
    await userEvent.click(openButton);
    
    expect(screen.getByTestId("view-group")).toBeInTheDocument();
    expect(screen.getByTestId("edit-name-btn")).toBeInTheDocument();
    expect(screen.getByTestId("stages-btn")).toBeInTheDocument();
    expect(screen.getByTestId("member-btn")).toBeInTheDocument();
    expect(screen.getByTestId("ungroup-client")).toBeInTheDocument();
  });

  it("opens edit name modal when edit name option is clicked", async () => {
    render(<ActionColumn rowData={mockRowData} handleRefreshTable={mockHandleRefreshTable} />);
    
    // Use the test button to open the dropdown
    const openButton = screen.getByTestId("open-dropdown");
    await userEvent.click(openButton);
    
    const editNameOption = screen.getByTestId("edit-name-btn");
    await userEvent.click(editNameOption);
    
    const openPopoverButton = screen.getByTestId("open-popover");
    await userEvent.click(openPopoverButton);
    
    expect(screen.getByTestId("input-action-modal")).toHaveAttribute("data-show", "true");
  });

  it("handles edit name submission", async () => {
    mockApiResponse = {
      status: 200,
      data: {
        message: "Group name updated successfully"
      }
    };
    
    render(<ActionColumn rowData={mockRowData} handleRefreshTable={mockHandleRefreshTable} />);
    
    const openButton = screen.getByTestId("open-dropdown");
    await userEvent.click(openButton);
    
    const editNameOption = screen.getByTestId("edit-name-btn");
    await userEvent.click(editNameOption);
    
    const openPopoverButton = screen.getByTestId("open-popover");
    await userEvent.click(openPopoverButton);
    
    const saveButton = screen.getByTestId("save-name-button");
    await userEvent.click(saveButton);
    
    const { toast } = vi.mocked(require("components/ui"));
    
    expect(toast).toHaveBeenCalled();
    expect(mockHandleRefreshTable).toHaveBeenCalled();
  });

  it("opens ungroup confirmation modal when ungroup option is clicked", async () => {
    render(<ActionColumn rowData={mockRowData} handleRefreshTable={mockHandleRefreshTable} />);
    
    const openButton = screen.getByTestId("open-dropdown");
    await userEvent.click(openButton);
    
    const ungroupOption = screen.getByTestId("ungroup-client");
    await userEvent.click(ungroupOption);
    
    expect(screen.getByTestId("confirm-modal")).toHaveAttribute("data-show", "true");
  });

  it("handles ungroup confirmation", async () => {
    mockApiResponse = {
      status: 200,
      data: {
        message: "Group ungrouped successfully"
      }
    };
    
    render(<ActionColumn rowData={mockRowData} handleRefreshTable={mockHandleRefreshTable} />);
    
    const openButton = screen.getByTestId("open-dropdown");
    await userEvent.click(openButton);
    
    const ungroupOption = screen.getByTestId("ungroup-client");
    await userEvent.click(ungroupOption);
    
    const confirmButton = screen.getByTestId("confirm-action-button");
    await userEvent.click(confirmButton);
    
    const { toast } = vi.mocked(require("components/ui"));
    
    expect(toast).toHaveBeenCalled();
    expect(mockHandleRefreshTable).toHaveBeenCalled();
  });
});