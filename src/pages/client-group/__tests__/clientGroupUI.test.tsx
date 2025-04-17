import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ClientGroupUI } from "modules/client-group/client-group";
import userEvent from "@testing-library/user-event";
import { ClientGroupUIProps } from "modules/client-group/client-group";
import { ClientGroupTableDataProps, fetchClientGroupQueryParams } from "types/client-group";

// Mock dependencies
vi.mock("components", () => ({
  Button: ({ children, onClick, ...props }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
  Pagination: ({ handleChange, handlePageLimit, totalCount, pageLimit, totalPages, currentPage }) => (
    <div data-testid="pagination">
      <button onClick={() => handleChange(currentPage + 1)}>Next</button>
      <button onClick={() => handlePageLimit(10)}>10 per page</button>
      <span>Total: {totalCount}</span>
    </div>
  ),
  TableEmptyState: ({ title, description, btnText, ctaFunction }) => (
    <div data-testid="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={ctaFunction}>{btnText}</button>
    </div>
  )
}));

vi.mock("components/form", () => ({
  CustomInput: ({ onChange, placeholder, parentClassName, icon }) => (
    <div className={parentClassName}>
      {icon}
      <input
        data-testid="search-input"
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}));

vi.mock("components/tables/clientGroupTable", () => ({
  ClientGroupTable: ({ columns, data }) => (
    <div data-testid="client-group-table">
      <span>Columns: {columns.length}</span>
      <span>Rows: {data.length}</span>
    </div>
  )
}));

vi.mock("components/tables/clientGroupTable/columns", () => ({
  getClientGroupTableColumns: () => [
    { accessorKey: "name", header: "Group name" },
    { accessorKey: "noOfclients", header: "No. of clients" },
    { accessorKey: "pipeline", header: "Pipeline(s)" },
    { accessorKey: "date", header: "Date Created" },
    { accessorKey: "assignedTo", header: "Assigned Member" },
    { id: "actions" }
  ]
}));

vi.mock("modules/client-group/sort-group", () => ({
  default: ({ handleParams }) => (
    <div data-testid="sort-group">
      <button onClick={() => handleParams("sort", "asc")}>Sort Asc</button>
      <button onClick={() => handleParams("sort", "desc")}>Sort Desc</button>
    </div>
  )
}));

vi.mock("modules/client-group/filter-group", () => ({
  default: ({ pipelines, handleParams }) => (
    <div data-testid="filter-group">
      <button onClick={() => handleParams("pipeline", pipelines[0]._id)}>
        Filter by {pipelines[0].name}
      </button>
    </div>
  )
}));

// Mock the types that we need
vi.mock("types/client-group", () => {
  return {
    fetchClientGroupQueryParams: {},
    ClientGroupTableDataProps: {}
  };
});

describe("ClientGroupUI", () => {
  // Create mock data that matches the expected structure
  const mockClientGroupData = [
    {
      id: "group1",
      name: "Family Summer Vacation",
      clients: 12,
      pipeline: { name: "Tourism Package Sales" },
      date: "07-10-2024",
      time: "10:30 AM",
      assignedTo: { name: "David Wilson", avatar: "" }
    },
    {
      id: "group2",
      name: "Health Check-up Group",
      clients: 8,
      pipeline: { name: "Hospitality Services" },
      date: "07-10-2024",
      time: "11:45 AM",
      assignedTo: { name: "David Wilson", avatar: "" }
    }
  ];

  // Create a properly typed mock props object
  const createMockProps = (): ClientGroupUIProps => ({
    handleCreateClientGroup: vi.fn(),
    handleRefreshClientGroups: vi.fn(),
    pipelinesData: [
      { _id: "pipeline1", name: "Pipeline 1" },
      { _id: "pipeline2", name: "Pipeline 2" }
    ],
    allClientGroups: {
      clientGroupsdata: {
        data: mockClientGroupData,
        metaData: {
          totalCount: 2,
          currentPage: 1,
          totalPages: 1,
          pageLimit: 20
        }
      } as unknown as ClientGroupTableDataProps,
      loading: false,
      params: { page: 1, limit: 20 } as fetchClientGroupQueryParams
    },
    handleParams: vi.fn()
  });

  let mockProps: ClientGroupUIProps;

  beforeEach(() => {
    vi.clearAllMocks();
    mockProps = createMockProps();
  });

  it("renders the client group UI correctly", () => {
    render(<ClientGroupUI {...mockProps} />);
    
    expect(screen.getByTestId("client-group-ui")).toBeInTheDocument();
    expect(screen.getByTestId("client-group-table")).toBeInTheDocument();
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("shows loading spinner when loading", () => {
    const loadingProps = {
      ...mockProps,
      allClientGroups: {
        ...mockProps.allClientGroups!,
        loading: true
      }
    };
    
    render(<ClientGroupUI {...loadingProps} />);
    
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("shows empty state when no data", () => {
    const emptyProps = {
      ...mockProps,
      allClientGroups: {
        ...mockProps.allClientGroups!,
        clientGroupsdata: {
          ...mockProps.allClientGroups!.clientGroupsdata as any,
          data: []
        } as unknown as ClientGroupTableDataProps
      }
    };
    
    render(<ClientGroupUI {...emptyProps} />);
    
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("calls handleCreateClientGroup when create button is clicked", async () => {
    render(<ClientGroupUI {...mockProps} />);
    
    const createButton = screen.getByText("Create new group");
    await userEvent.click(createButton);
    
    expect(mockProps.handleCreateClientGroup).toHaveBeenCalledTimes(1);
  });

  it("calls handleParams with search value when search input changes", async () => {
    render(<ClientGroupUI {...mockProps} />);
    
    const searchInput = screen.getByTestId("search-input");
    await userEvent.type(searchInput, "test");
    
    expect(mockProps.handleParams).toHaveBeenCalledWith("search", "test");
  });

  it("calls handleParams with sort value when sort is clicked", async () => {
    render(<ClientGroupUI {...mockProps} />);
    
    const sortAscButton = screen.getByText("Sort Asc");
    await userEvent.click(sortAscButton);
    
    expect(mockProps.handleParams).toHaveBeenCalledWith("sort", "asc");
  });

  it("calls handleParams with filter value when filter is clicked", async () => {
    render(<ClientGroupUI {...mockProps} />);
    
    const filterButton = screen.getByText("Filter by Pipeline 1");
    await userEvent.click(filterButton);
    
    expect(mockProps.handleParams).toHaveBeenCalledWith("pipeline", "pipeline1");
  });

  it("calls handleParams when pagination is changed", async () => {
    render(<ClientGroupUI {...mockProps} />);
    
    const nextButton = screen.getByText("Next");
    await userEvent.click(nextButton);
    
    expect(mockProps.handleParams).toHaveBeenCalledWith("page", 2);
  });
});