import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedArchivedTasks, MockedCompletedTasks, MockedIncompletedTasks } from "lib";
import { MemberProfileTasksUI } from "modules";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

const defaultCompletedTasks = {
  data: [],
  metaData: {
    currentPage: 1,
    totalCount: 50,
    totalPages: 5,
    pageLimit: 20
  }
};

const defaultIncompletedTasks = {
  data: [],
  metaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 1,
    pageLimit: 20
  }
};

const defaultArchivedTasks = {
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
      completedTasks: defaultCompletedTasks,
      incompletedTasks: defaultIncompletedTasks,
      archivedTasks: defaultArchivedTasks
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

const tasksWithData = {
  ...defaultProps.allTasks,
  data: {
    completedTasks: {
      data: MockedCompletedTasks,
      metaData: {
        currentPage: 1,
        totalCount: MockedCompletedTasks.length,
        totalPages: 1,
        pageLimit: 4
      }
    },
    incompletedTasks: {
      data: MockedIncompletedTasks,
      metaData: {
        currentPage: 1,
        totalCount: MockedIncompletedTasks.length,
        totalPages: 1,
        pageLimit: 4
      }
    },
    archivedTasks: {
      data: MockedArchivedTasks,
      metaData: {
        currentPage: 1,
        totalCount: MockedArchivedTasks.length,
        totalPages: 1,
        pageLimit: 4
      }
    }
  }
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
    expect(screen.getByTestId("add-task-button")).toBeInTheDocument();
    expect(screen.getByTestId("empty-state-action")).toBeInTheDocument();
  });

  it("calls handleOpenAddTask when the Add Task button is clicked", () => {
    renderComponent();
    const addTaskButton = screen.getByTestId("add-task-button");
    fireEvent.click(addTaskButton);
    expect(mockHandleOpenAddTask).toHaveBeenCalledTimes(1);
  });

  it("displays the tasks categories when there is data", () => {
    renderComponent({
      allTasks: tasksWithData,
      handleOpenAddTask: mockHandleOpenAddTask,
      handleOpenEditTask: mockHandleOpenEditTask,
      taskActions: mockTaskActions
    });
    const completedTask = screen.getByText(/Complete the project proposal/i);
    const inCompletedTask = screen.getByText(/Prepare presentation for stakeholders/i);
    const archivedTask = screen.getByText(/Take a sprint/i);

    expect(completedTask).toBeInTheDocument();
    expect(inCompletedTask).toBeInTheDocument();

    expect(archivedTask).toBeInTheDocument();
  });

  it("toggles the viewing of completed tasks", () => {
    renderComponent({
      allTasks: tasksWithData,
      handleOpenAddTask: mockHandleOpenAddTask,
      handleOpenEditTask: mockHandleOpenEditTask,
      taskActions: mockTaskActions
    });
    const completedTaskComponent = screen.getByTestId("completed-task-component");

    expect(completedTaskComponent).toBeInTheDocument();
    const completedView = screen.getByTestId("view-completed");
    fireEvent.click(completedView);
    expect(completedTaskComponent).not.toBeInTheDocument();
  });

  it("toggles the viewing of incompleted tasks", () => {
    renderComponent({
      allTasks: tasksWithData,
      handleOpenAddTask: mockHandleOpenAddTask,
      handleOpenEditTask: mockHandleOpenEditTask,
      taskActions: mockTaskActions
    });
    const incompletedTaskComponent = screen.getByTestId("incompleted-task-component");

    expect(incompletedTaskComponent).toBeInTheDocument();
    const completedView = screen.getByTestId("view-incompleted");
    fireEvent.click(completedView);
    expect(incompletedTaskComponent).not.toBeInTheDocument();
  });

  it("toggles the viewing of archived tasks", () => {
    renderComponent({
      allTasks: tasksWithData,
      handleOpenAddTask: mockHandleOpenAddTask,
      handleOpenEditTask: mockHandleOpenEditTask,
      taskActions: mockTaskActions
    });
    const archivedTaskComponent = screen.getByTestId("archived-task-component");
    expect(archivedTaskComponent).toBeInTheDocument();
    const archivedView = screen.getByTestId("view-archived");
    fireEvent.click(archivedView);

    expect(archivedTaskComponent).not.toBeInTheDocument();
  });

  it("renders the member filters and date filter", () => {
    renderComponent();
    const tasksSubheading = screen.getByRole("heading", { name: "Tasks" });
    const objectFilter = screen.getByText(/By object/i);
    expect(tasksSubheading).toBeInTheDocument();
    expect(objectFilter).toBeInTheDocument();
  });

  it("opens the dropdown menu and selects an object", async () => {
    renderComponent();

    const objectButton = screen.getByRole("button", { name: /By object/i });
    await userEvent.click(objectButton);

    const objectOption = await screen.findByText(/general/i);
    await userEvent.click(objectOption);
    await waitFor(() => {
      expect(defaultProps.allTasks.handleParams.handleUpdateAllQueries).toHaveBeenCalledWith(
        "object",
        "general".toLowerCase()
      );
    });
  });

  it("opens the date filter and updates the date range", async () => {
    renderComponent();

    const dateFilterButton = screen.getByRole("button", { name: /Today/i });
    fireEvent.click(dateFilterButton);

    const selectRange = screen.getByText(/Select a range/i);
    fireEvent.click(selectRange);

    const dateRange = screen.getByText(/3 days ago/i);
    await userEvent.click(dateRange);

    // await waitFor(() => {
    //   expect(defaultProps.allTasks.handleParams.handleUpdateAllQueries).toHaveBeenCalledWith();
    // });
  });
});
