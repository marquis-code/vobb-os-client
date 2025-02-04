import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserCard } from "components";
import { UsersUI } from "modules";
import { BrowserRouter } from "react-router-dom";
import { mockAllUsersFolders, mockUserFolder } from "lib";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("assets", async () => {
  const originalModule = await vi.importActual<any>("assets");

  return {
    ...originalModule,
    UserFolderIcon: () => <div data-testid="mock-folder-icon">Mocked User Icon</div>,
    DirectoryIcon: () => <div data-testid="mock-directory-icon">Mocked Directory Icon</div>
  };
});

const mockHandleFetchUsersFolders = vi.fn();
const mockHandleParams = vi.fn();

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("UserUI tests", () => {
  it("renders the user folders with correct details", () => {
    renderWithProvider(
      <UsersUI
        usersFolders={mockAllUsersFolders}
        handleFetchUsersFolders={mockHandleFetchUsersFolders}
        handleParams={mockHandleParams}
      />
    );
    mockAllUsersFolders.usersFoldersData.folders.forEach((folder) => {
      expect(screen.getByText(folder.name)).toBeInTheDocument();
      expect(screen.queryAllByText(`${folder.files_count} files`)).toHaveLength(2);
      expect(screen.queryAllByText(folder.total_files_size)).toHaveLength(2);
    });
  });

  it("renders the LoadingSpinner when loading is true", () => {
    const loadingMockData = {
      usersFoldersData: { folders: [], total_count: 0, total_pages: 1, page: 1 },
      loading: true,
      error: false,
      params: {
        search: "",
        sort: "asc",
        limit: 30,
        page: 1
      }
    };

    renderWithProvider(
      <UsersUI
        usersFolders={loadingMockData}
        handleFetchUsersFolders={mockHandleFetchUsersFolders}
        handleParams={mockHandleParams}
      />
    );
    expect(screen.getByTestId("users-loading-spinner")).toBeInTheDocument();
    expect(screen.queryByText("files")).not.toBeInTheDocument();
  });

  it("handles empty data gracefully by rendering the empty state when folders is empty", () => {
    const emptyMockData = {
      usersFoldersData: { folders: [], total_count: 0, total_pages: 1, page: 1 },
      loading: false,
      error: false,
      params: {
        search: "",
        sort: "asc",
        limit: 30,
        page: 1
      }
    };

    renderWithProvider(
      <UsersUI
        usersFolders={emptyMockData}
        handleFetchUsersFolders={mockHandleFetchUsersFolders}
        handleParams={mockHandleParams}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("handles empty data gracefully by rendering the empty state when folders is empty", () => {
    const emptyMockData = {
      usersFoldersData: { folders: [], total_count: 0, total_pages: 1, page: 1 },
      loading: false,
      error: false,
      params: {
        search: "",
        sort: "asc",
        limit: 30,
        page: 1
      }
    };

    renderWithProvider(
      <UsersUI
        usersFolders={emptyMockData}
        handleFetchUsersFolders={mockHandleFetchUsersFolders}
        handleParams={mockHandleParams}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("handles empty data gracefully by rendering the empty state when usersFoldersData is undefined", () => {
    const undefinedMockData = {
      usersFoldersData: { folders: undefined, total_count: 0, total_pages: 1, page: 1 },
      loading: false,
      error: false,
      params: {
        search: "",
        sort: "asc",
        limit: 30,
        page: 1
      }
    };

    renderWithProvider(
      <UsersUI
        usersFolders={undefinedMockData}
        handleFetchUsersFolders={mockHandleFetchUsersFolders}
        handleParams={mockHandleParams}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("handles empty data gracefully by rendering the empty state when usersFoldersData is null", () => {
    const nullMockData = {
      usersFoldersData: { folders: null, total_count: 0, total_pages: 1, page: 1 },
      loading: false,
      error: false,
      params: {
        search: "",
        sort: "asc",
        limit: 30,
        page: 1
      }
    };

    renderWithProvider(
      <UsersUI
        usersFolders={nullMockData}
        handleFetchUsersFolders={mockHandleFetchUsersFolders}
        handleParams={mockHandleParams}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("renders the user card component correctly", async () => {
    renderWithProvider(
      <UserCard
        name={mockUserFolder[0].name}
        fileCount={mockUserFolder[0].file_count}
        folderSize={mockUserFolder[0].total_folder_size}
      />
    );
    expect(screen.getByText(mockUserFolder[0].name)).toBeInTheDocument();
    expect(screen.getByText(`${mockUserFolder[0].file_count} files`)).toBeInTheDocument();
    expect(screen.getByText(mockUserFolder[0].total_folder_size)).toBeInTheDocument();
    expect(screen.getByTestId("mock-folder-icon")).toBeInTheDocument();
  });

  it("renders the dropdown menu with options triggered", async () => {
    renderWithProvider(
      <UserCard
        name={mockUserFolder[0].name}
        fileCount={mockUserFolder[0].file_count}
        folderSize={mockUserFolder[0].total_folder_size}
      />
    );
    const menuTrigger = screen.getByRole("data-test-dropdown-trigger");
    expect(menuTrigger).toBeInTheDocument();
  });

  describe("Search functionality", () => {
    it("updates the search input value when typing", () => {
      renderWithProvider(
        <UsersUI
          usersFolders={mockAllUsersFolders}
          handleFetchUsersFolders={mockHandleFetchUsersFolders}
          handleParams={mockHandleParams}
        />
      );

      const searchInput = screen.getByPlaceholderText("Search files");
      fireEvent.change(searchInput, { target: { value: "test search" } });

      expect(searchInput).toHaveValue("test search");
    });

    it("calls handleParams with the correct search term after debounce", async () => {
      vi.useFakeTimers();

      renderWithProvider(
        <UsersUI
          usersFolders={mockAllUsersFolders}
          handleFetchUsersFolders={mockHandleFetchUsersFolders}
          handleParams={mockHandleParams}
        />
      );

      const searchInput = screen.getByPlaceholderText("Search files");
      fireEvent.change(searchInput, { target: { value: "test search" } });

      vi.advanceTimersByTime(1000);
      expect(mockHandleParams).toHaveBeenCalledWith("search", "test search");

      vi.useRealTimers();
    });
  });

  describe("Sort functionality", () => {
    it("calls handleParams with the correct sort value when a sort option is selected", async () => {
      renderWithProvider(
        <UsersUI
          usersFolders={mockAllUsersFolders}
          handleFetchUsersFolders={mockHandleFetchUsersFolders}
          handleParams={mockHandleParams}
        />
      );

      const sortButton = screen.getByTestId("sort-button");
      await userEvent.click(sortButton);
      await waitFor(() => {
        expect(sortButton).toHaveAttribute("data-state", "open");
      });
      const sortOptions = screen.queryAllByText("Date created");
      const sortOption = sortOptions.find((element) => element.getAttribute("role") === "menuitem");
      if (sortOption) fireEvent.click(sortOption);
      expect(mockHandleParams).toHaveBeenCalledWith("sort", "asc");
    });
  });
});
