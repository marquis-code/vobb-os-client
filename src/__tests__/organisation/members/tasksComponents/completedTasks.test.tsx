import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedCompletedTasks } from "lib";
import { CompletedTasks } from "modules/organization/members/taskComponents";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

describe("Completed Tasks", () => {
  const mockHandleOpenEditTask = vi.fn();
  const mockHandleChangeStatus = vi.fn();
  const mockHandleDeleteTask = vi.fn();
  const mockLoadMoreRef = { current: null };

  const defaultProps = {
    tasks: {
      data: MockedCompletedTasks,
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
        <CompletedTasks {...defaultProps} {...props} />
      </BrowserRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with a task", () => {
    renderComponent();

    expect(screen.getByText("Complete the project proposal")).toBeInTheDocument();
    expect(screen.getByTestId("completed-task-component")).toBeInTheDocument();
  });

  it("calls handleOpenEditTask when task item is clicked", async () => {
    renderComponent();
    const taskItem = screen.getByText("Complete the project proposal");

    await userEvent.click(taskItem);
    expect(mockHandleOpenEditTask).toHaveBeenCalledWith("1");
  });

  it("handleChangeStatus with 'incomplete' param when task icon is clicked", async () => {
    renderComponent();
    const taskIcon = screen.getAllByTestId("mark-incomplete");

    await userEvent.click(taskIcon[0]);
    expect(mockHandleChangeStatus).toHaveBeenCalledWith("1", "incomplete");
  });

  it("calls handleChangeStatus with 'archive' param when archive button is clicked", async () => {
    renderComponent();
    const menuButtons = screen.getAllByRole("button", { name: "Open menu" });
    await userEvent.click(menuButtons[0]);
    const archiveTaskOption = await screen.findByText(/archive task/i);
    await userEvent.click(archiveTaskOption);
    await waitFor(() => {
      expect(mockHandleChangeStatus).toHaveBeenCalledWith("1", "archived");
    });
  });

  it("calls handleDeleteTask when delete button is clicked", async () => {
    renderComponent();
    const menuButtons = screen.getAllByRole("button", { name: "Open menu" });
    await userEvent.click(menuButtons[0]);
    const deleteTaskOption = await screen.findByText(/delete task/i);
    await userEvent.click(deleteTaskOption);
    await waitFor(() => {
      expect(mockHandleDeleteTask).toHaveBeenCalledWith("1");
    });
  });
  it("displays loading skeleton when loadingTasks is true", () => {
    renderComponent({ loadingTasks: true });

    const skeletons = screen.getAllByTestId("skeleton-task");
    expect(skeletons).toHaveLength(2);
  });
});
