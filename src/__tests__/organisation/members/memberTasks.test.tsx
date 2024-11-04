import { render, screen, fireEvent } from "@testing-library/react";
import { MockedMemberTasks } from "lib";
import { MemberProfileTasksUI } from "modules";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

const mockCompletedTasks = {
  data: [],
  metaData: {
    currentPage: 1,
    totalCount: 50,
    totalPages: 5,
    pageLimit: 20
  }
};

const mockIncompletedTasks = {
  data: [],
  metaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 1,
    pageLimit: 20
  }
};

const mockArchivedTasks = {
  data: [],
  metaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 1,
    pageLimit: 20
  }
};

const defaultProps = {
  allTasks: {
    data: {
      completedTasks: mockCompletedTasks,
      incompletedTasks: mockIncompletedTasks,
      archivedTasks: mockArchivedTasks
    },
    loading: {
      loadingIncomplete: false,
      loadingComplete: false,
      loadingArchived: false
    },
    params: {
      incompleteQueryParams: { page: 1, limit: 20 }, // Adjust according to your expected structure
      completedQueryParams: { page: 1, limit: 20 },
      archivedQueryParams: { page: 1, limit: 20 }
    },
    handleParams: {
      handleCompletedQuery: vi.fn(),
      handleIncompleteQuery: vi.fn(),
      handleArchivedQuery: vi.fn(),
      handleUpdateAllQueries: vi.fn()
    }
  },
  handleOpenAddTask: vi.fn(),
  handleOpenEditTask: vi.fn(),
  taskActions: {
    handleChangeStatus: vi.fn(),
    loadingChangeStatus: false,
    handleDeleteTask: vi.fn(),
    loadingDeleteTask: false
  }
};

const mockHandleOpenAddTask = vi.fn();
const mockHandleOpenEditTask = vi.fn();
const mockTaskActions = {
  handleChangeStatus: vi.fn(),
  loadingChangeStatus: false,
  handleDeleteTask: vi.fn(),
  loadingDeleteTask: false
};

describe("MemberProfileTasksUI", () => {
  const renderComponent = (props = {}) =>
    render(
      <BrowserRouter>
        <MemberProfileTasksUI
          {...defaultProps}
          handleOpenAddTask={mockHandleOpenAddTask}
          handleOpenEditTask={mockHandleOpenEditTask}
          taskActions={mockTaskActions}
          {...props}
        />{" "}
      </BrowserRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with no tasks", () => {
    renderComponent();
    expect(screen.getByText(/No tasks have been assigned yet/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Task/i)).toBeInTheDocument();
  });

  it("calls handleOpenAddTask when the Add Task button is clicked", () => {
    const addTaskButton = screen.getByRole("button", { name: /Add Task/i });
    fireEvent.click(addTaskButton);
    expect(mockHandleOpenAddTask).toHaveBeenCalledTimes(1);
  });

  it("displays the task categories when ther is data", () => {
    const tasksWithData = {
      ...defaultProps.allTasks,
      data: {
        completedTasks: {
          data: MockedMemberTasks,
          metaData: {
            currentPage: 1,
            totalCount: MockedMemberTasks.length,
            totalPages: 1,
            pageLimit: 20
          }
        },
        incompletedTasks: { data: [] },
        archivedTasks: { data: [] }
      }
    };

    renderComponent({
      allTasks: tasksWithData,
      handleOpenAddTask: mockHandleOpenAddTask,
      handleOpenEditTask: mockHandleOpenEditTask,
      taskActions: mockTaskActions
    });

    expect(screen.getByText(/completed/i)).toBeInTheDocument();

    const completedTab = screen.getByText(/completed/i);
    fireEvent.click(completedTab);

    expect(screen.getByText(/Complete the project proposal/i)).toBeInTheDocument();
  });

  it("renders the member filters and date filter", () => {
    renderComponent();
    expect(screen.getByText(/Tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/By object/i)).toBeInTheDocument();
  });

  it("opens the dropdown menu and selects an object", () => {
    renderComponent();

    const objectButton = screen.getByRole("button", { name: /By object/i });
    fireEvent.click(objectButton);

    const objectOption = screen.getByText(/general/i);
    fireEvent.click(objectOption);

    expect(defaultProps.allTasks.handleParams.handleUpdateAllQueries).toHaveBeenCalledWith(
      "object",
      "general".toLowerCase()
    );
  });

  it("opens the date filter and updates the date range", () => {
    renderComponent();

    const dateFilterButton = screen.getByRole("button", { name: /date/i }); // Replace with the actual button name
    fireEvent.click(dateFilterButton);

    const dateRange = { from: new Date(), to: new Date() }; // Adjust as needed
    fireEvent.change(screen.getByLabelText(/date range/i), { target: { value: dateRange } });

    expect(defaultProps.allTasks.handleParams.handleUpdateAllQueries).toHaveBeenCalledWith(
      "start",
      dateRange.from.toISOString().slice(0, 10)
    );
    expect(defaultProps.allTasks.handleParams.handleUpdateAllQueries).toHaveBeenCalledWith(
      "end",
      dateRange.to.toISOString().slice(0, 10)
    );
  });

  it("clears filters when clear button is clicked", () => {
    renderComponent();

    const clearButton = screen.getByRole("button", { name: /clear filters/i }); // Replace with the actual button name
    fireEvent.click(clearButton);

    expect(defaultProps.allTasks.handleParams.handleUpdateAllQueries).toHaveBeenCalledWith(
      "start",
      ""
    );
    expect(defaultProps.allTasks.handleParams.handleUpdateAllQueries).toHaveBeenCalledWith(
      "end",
      ""
    );
  });
});
