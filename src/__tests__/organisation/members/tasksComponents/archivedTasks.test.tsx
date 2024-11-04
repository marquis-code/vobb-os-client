import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedArchivedTasks } from "lib";
import { ArchivedTasks } from "modules/organization/members/taskComponents";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

describe("ArchivedTasks", () => {
  const mockHandleOpenEditTask = vi.fn();
  const mockHandleChangeStatus = vi.fn();
  const mockHandleDeleteTask = vi.fn();
  const mockLoadMoreRef = { current: null };

  const defaultProps = {
    tasks: {
      data: MockedArchivedTasks,
      metaData: {
        currentPage: 1,
        totalCount: 0,
        totalPages: 1,
        pageLimit: 20
      }
    },
    loadingTasks: false,
    taskActions: {
      handleChangeStatus: mockHandleChangeStatus,
      loadingChangeStatus: false,
      handleDeleteTask: mockHandleDeleteTask,
      loadingDeleteTask: false
    },
    handleOpenEditTask: mockHandleOpenEditTask,
    handleParams: vi.fn(),
    loadMoreRef: mockLoadMoreRef
  };

  const renderComponent = (props = {}) =>
    render(
      <BrowserRouter>
        <ArchivedTasks {...defaultProps} {...props} />
      </BrowserRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with a task", () => {
    renderComponent();

    expect(screen.getByText("Take a sprint")).toBeInTheDocument();
    expect(screen.getByTestId("archived-task-component")).toBeInTheDocument();
  });

  it("calls handleOpenEditTask when task item is clicked", async () => {
    renderComponent();
    const taskItem = screen.getByText("Take a sprint");

    await userEvent.click(taskItem);
    expect(mockHandleOpenEditTask).toHaveBeenCalledWith("5");
  });

  it("handleChangeStatus with 'complete' param when task icon is clicked", async () => {
    renderComponent();
    const taskIcon = screen.getAllByTestId("mark-complete");

    await userEvent.click(taskIcon[0]);
    expect(mockHandleChangeStatus).toHaveBeenCalledWith("5", "complete");
  });

  it("calls handleChangeStatus when unarchive button is clicked", async () => {
    renderComponent();
    const menuButtons = screen.getAllByRole("button", { name: "Open menu" });
    await userEvent.click(menuButtons[0]);
    const unarchiveTaskOption = await screen.findByText(/unarchive task/i);
    await userEvent.click(unarchiveTaskOption);
    await waitFor(() => {
      expect(mockHandleChangeStatus).toHaveBeenCalledWith("5", "incomplete");
    });
  });

  it("calls handleDeleteTask when delete button is clicked", async () => {
    renderComponent();
    const menuButtons = screen.getAllByRole("button", { name: "Open menu" });
    await userEvent.click(menuButtons[0]);
    const deleteTaskOption = await screen.findByText(/delete task/i);
    await userEvent.click(deleteTaskOption);
    await waitFor(() => {
      expect(mockHandleDeleteTask).toHaveBeenCalledWith("5");
    });
  });
  it("displays loading skeleton when loadingTasks is true", () => {
    renderComponent({ loadingTasks: true });

    const skeletons = screen.getAllByTestId("skeleton-task");
    expect(skeletons).toHaveLength(2);
  });
});
