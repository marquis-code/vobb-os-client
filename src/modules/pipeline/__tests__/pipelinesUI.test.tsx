import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PipelineTableDataProps } from "types";
import { PipelinesUI, PipelinesUIProps } from "../pipelines";
import { vi } from "vitest";

const handleCreatePipeline = vi.fn();
const handleParams = vi.fn();
const handleViewPipeline = vi.fn();
const handleEditTitle = vi.fn();
const handleViewForms = vi.fn();
const handleDeletePipeline = vi.fn();
const handleEditStages = vi.fn();
const onPipelineUpdate = vi.fn();

const pipelinesDataMock: PipelineTableDataProps = {
  data: [
    {
      id: "1",
      name: "Pipeline 1",
      description: "Test pipeline",
      sector: "Tech",
      creator: { id: "user1", avatar: "", name: "John Doe" },
      clients: 5,
      stages: 3,
      package: { id: "pkg1", name: "Basic" },
      date: "2023-01-01",
      time: "12:00 PM",
    },
  ],
  metaData: {
    totalCount: 1,
    pageLimit: 20,
    totalPages: 1,
    currentPage: 1,
  },
};

const defaultProps: PipelinesUIProps = {
  handleCreatePipeline,
  allPipelines: {
    pipelinesData: pipelinesDataMock,
    loading: false,
    params: {
      page: 1,
      limit: 20,
      search: "",
      sector: "",
      sortOrder: "asc",
      sortProperty: "date",
    },
  },
  handleParams,
  handleViewPipeline,
  handleEditTitle,
  editPipelineTitleStatus: {
    isResolved: false,
    isPending: false,
    isRejected: false,
    isIdle: true,
  },
  handleViewForms,
  handleDeletePipeline,
  handleEditStages,
  onPipelineUpdate,
};

vi.mock("components", async () => {
  const actual = await vi.importActual("components");
  return {
    ...actual,
    LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
    Pagination: ({ handleChange }) => (
      <div data-testid="pagination">
        <button onClick={() => handleChange(2)}>2</button>
      </div>
    ),
    SortBy: ({ sort, order }) => (
      <div>
        <button onClick={() => sort.handleChange({ label: "Date created", value: "date" })}>
          Date created
        </button>
        <button onClick={() => sort.handleChange({ label: "Client", value: "client" })}>
          Client
        </button>
      </div>
    ),
    PipelinesTable: ({ columns, data }) => (
      <table>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.sector}</td>
              <td>
                <button onClick={() => handleViewPipeline(item)}>View</button>
                <button 
                  data-testid="edit-stages-button"
                  onClick={() => {
                    columns.find(col => col.accessorKey === "actions")?.cell?.({ row: { original: item } });
                  }}
                >
                  Edit Stages
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  };
});

vi.mock("pages/pipeline/editPipeline", () => ({
  EditPipelineStages: ({ show, close }) => 
    show ? (
      <div data-testid="edit-pipeline-stages-modal">
        <h2>Edit Pipeline Stages</h2>
        <button data-testid="close-btn" onClick={close}>Close</button>
      </div>
    ) : null,
}));

describe("PipelinesUI Component", () => {
  it("renders the component and pipeline data correctly", () => {
    render(<PipelinesUI {...defaultProps} />);

    expect(screen.getByText(/Create new pipeline/i)).toBeInTheDocument();

    expect(screen.getByText("Pipeline 1")).toBeInTheDocument();
    expect(screen.getByText("Test pipeline")).toBeInTheDocument();
    expect(screen.getByText("Tech")).toBeInTheDocument();
  });

  it("shows loading state when data is fetching", () => {
    render(
      <PipelinesUI
        {...defaultProps}
        allPipelines={{ ...defaultProps.allPipelines, loading: true }}
      />
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("shows empty state when no pipelines exist", () => {
    render(
      <PipelinesUI
        {...defaultProps}
        allPipelines={{
          ...defaultProps.allPipelines,
          pipelinesData: {
            data: [],
            metaData: { currentPage: 1, totalCount: 0, totalPages: 1, pageLimit: 20 }
          }
        }}
      />
    );

    expect(screen.getByText(/No pipelines yet/i)).toBeInTheDocument();
    expect(screen.getByText(/Get started by creating your first pipeline/i)).toBeInTheDocument();
  });

  it("triggers handleCreatePipeline when the button is clicked", () => {
    render(<PipelinesUI {...defaultProps} />);

    fireEvent.click(screen.getByText(/Create new pipeline/i));

    expect(handleCreatePipeline).toHaveBeenCalled();
  });

  it("triggers handleParams when sorting changes", () => {
    render(<PipelinesUI {...defaultProps} />);

    fireEvent.click(screen.getByText("Client"));

    expect(handleParams).toHaveBeenCalledWith("sortProperty", "client");
  });

  it("handles search input", () => {
    render(<PipelinesUI {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText("Search Pipelines");
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(searchInput).toHaveValue("test");
  });

  it("handles pagination change", () => {
    render(<PipelinesUI {...defaultProps} />);

    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();

    fireEvent.click(screen.getByText("2"));
    expect(handleParams).toHaveBeenCalledWith("page", 2);
  });

  it("handles opening and closing the edit pipeline modal", async () => {
    render(<PipelinesUI {...defaultProps} />);

    fireEvent.click(screen.getByTestId("edit-stages"));
    
    await waitFor(() => {
      expect(screen.getByTestId("edit-pipeline-stages-modal")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("close-btn"));
    
    await waitFor(() => {
      expect(screen.queryByTestId("edit-pipeline-stages-modal")).not.toBeInTheDocument();
    });
  });

  it("handles null or undefined pipeline data gracefully", () => {
    render(
      <PipelinesUI
        {...defaultProps}
        allPipelines={{
          pipelinesData: null,
          loading: false,
          params: {
            page: 1,
            limit: 20,
            search: "",
            sector: "",
            sortOrder: "asc",
            sortProperty: "date",
          },
        }}
      />
    );

    expect(screen.getByText(/No pipelines yet/i)).toBeInTheDocument();
    expect(screen.getByText(/Get started by creating your first pipeline/i)).toBeInTheDocument();
  });

  it("handles undefined pipeline data gracefully", () => {
    render(
      <PipelinesUI
        {...defaultProps}
        allPipelines={{
          pipelinesData: undefined,
          loading: false,
          params: {
            page: 1,
            limit: 20,
            search: "",
            sector: "",
            sortOrder: "asc",
            sortProperty: "date",
          },
        }}
      />
    );

    expect(screen.getByText(/No pipelines yet/i)).toBeInTheDocument();
    expect(screen.getByText(/Get started by creating your first pipeline/i)).toBeInTheDocument();
  });

  it("handles null data array within pipelinesData gracefully", () => {
    render(
      <PipelinesUI
        {...defaultProps}
        allPipelines={{
          pipelinesData: {
            data: null,
            metaData: {
              totalCount: 0,
              pageLimit: 20,
              totalPages: 1,
              currentPage: 1,
            },
          },
          loading: false,
          params: {
            page: 1,
            limit: 20,
            search: "",
            sector: "",
            sortOrder: "asc",
            sortProperty: "date",
          },
        }}
      />
    );
  
    expect(screen.getByText(/No pipelines yet/i)).toBeInTheDocument();
    expect(screen.getByText(/Get started by creating your first pipeline/i)).toBeInTheDocument();
  });
  
  it("handles undefined data array within pipelinesData gracefully", () => {
    render(
      <PipelinesUI
        {...defaultProps}
        allPipelines={{
          pipelinesData: {
            data: undefined,
            metaData: {
              totalCount: 0,
              pageLimit: 20,
              totalPages: 1,
              currentPage: 1,
            },
          },
          loading: false,
          params: {
            page: 1,
            limit: 20,
            search: "",
            sector: "",
            sortOrder: "asc",
            sortProperty: "date",
          },
        }}
      />
    );
  
    expect(screen.getByText(/No pipelines yet/i)).toBeInTheDocument();
    expect(screen.getByText(/Get started by creating your first pipeline/i)).toBeInTheDocument();
  });
});