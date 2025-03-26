import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ClientCard } from "components";
import { ClientsDirectoryUI } from "modules";
import { BrowserRouter } from "react-router-dom";
import { mockAllClientsFolders, mockClientFolder, mockFolder } from "lib";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("assets", async () => {
  const originalModule = await vi.importActual<any>("assets");

  return {
    ...originalModule,
    UserFolderIcon: () => <div data-testid="mock-folder-icon">Mocked Icon</div>,
    DirectoryIcon: () => <div data-testid="mock-directory-icon">Mocked Directory Icon</div>
  };
});

const mockHandleFetchClientsFolders = vi.fn();
const mockHandleParams = vi.fn();
const mockHandleRenameFolder = vi.fn();

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("ClientUI tests", () => {
  it("renders the user folders with correct details", () => {
    renderWithProvider(
      <ClientsDirectoryUI
        clientsFolders={mockAllClientsFolders}
        handleFetchClientsFolders={mockHandleFetchClientsFolders}
        handleParams={mockHandleParams}
        handleFolderRename={mockHandleRenameFolder}
        renameLoading={false}
      />
    );
    mockAllClientsFolders.clientsFoldersData.folders.forEach((folder, index, folders) => {
      expect(screen.getByText(folder.name)).toBeInTheDocument();
      expect(screen.queryAllByText(`${folder.files_count} files`)).toHaveLength(folders.length);
      expect(screen.queryAllByText(folder.total_files_size)).toHaveLength(folders.length);
    });
  });

  it("renders the LoadingSpinner when loading is true", () => {
    const loadingMockData = {
      clientsFoldersData: { folders: [], total_count: 0, total_pages: 1, page: 1 },
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
      <ClientsDirectoryUI
        clientsFolders={loadingMockData}
        handleFetchClientsFolders={mockHandleFetchClientsFolders}
        handleParams={mockHandleParams}
        handleFolderRename={mockHandleRenameFolder}
        renameLoading={false}
      />
    );
    expect(screen.getByTestId("clients-loading-spinner")).toBeInTheDocument();
    expect(screen.queryByText("files")).not.toBeInTheDocument();
  });

  it("handles missing or invalid data gracefully by rendering the empty state when fetch fails", () => {
    const errorMockData = {
      clientsFoldersData: { folders: [], total_count: 0, total_pages: 1, page: 1 },
      loading: false,
      error: true,
      params: {
        search: "",
        sort: "asc",
        limit: 30,
        page: 1
      }
    };

    renderWithProvider(
      <ClientsDirectoryUI
        clientsFolders={errorMockData}
        handleFetchClientsFolders={mockHandleFetchClientsFolders}
        handleParams={mockHandleParams}
        handleFolderRename={mockHandleRenameFolder}
        renameLoading={false}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("handles empty data gracefully by rendering the empty state when folders is empty", () => {
    const emptyMockData = {
      clientsFoldersData: { folders: [], total_count: 0, total_pages: 1, page: 1 },
      loading: false,
      error: true,
      params: {
        search: "",
        sort: "asc",
        limit: 30,
        page: 1
      }
    };

    renderWithProvider(
      <ClientsDirectoryUI
        clientsFolders={emptyMockData}
        handleFetchClientsFolders={mockHandleFetchClientsFolders}
        handleParams={mockHandleParams}
        handleFolderRename={mockHandleRenameFolder}
        renameLoading={false}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("handles empty data gracefully by rendering the empty state when usersFoldersData is undefined", () => {
    const undefinedMockData = {
      clientsFoldersData: { folders: undefined, total_count: 0, total_pages: 1, page: 1 },
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
      <ClientsDirectoryUI
        clientsFolders={undefinedMockData}
        handleFetchClientsFolders={mockHandleFetchClientsFolders}
        handleParams={mockHandleParams}
        handleFolderRename={mockHandleRenameFolder}
        renameLoading={false}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("handles empty data gracefully by rendering the empty state when usersFoldersData is null", () => {
    const nullMockData = {
      clientsFoldersData: { folders: null, total_count: 0, total_pages: 1, page: 1 },
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
      <ClientsDirectoryUI
        clientsFolders={nullMockData}
        handleFetchClientsFolders={mockHandleFetchClientsFolders}
        handleParams={mockHandleParams}
        handleFolderRename={mockHandleRenameFolder}
        renameLoading={false}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("renders the client card component correctly", async () => {
    renderWithProvider(
      <ClientCard
        id={mockClientFolder[0].id}
        name={mockClientFolder[0].name}
        fileCount={mockClientFolder[0].file_count}
        folderSize={mockClientFolder[0].total_folder_size}
        path={mockClientFolder[0].path}
        handleFetchFolders={mockHandleFetchClientsFolders}
        handleFolderRename={mockHandleRenameFolder}
        renameLoading={false}
      />
    );
    expect(screen.getByText(mockClientFolder[0].name)).toBeInTheDocument();
    expect(screen.getByText(`${mockClientFolder[0].file_count} files`)).toBeInTheDocument();
    expect(screen.getByText(mockClientFolder[0].total_folder_size)).toBeInTheDocument();
    expect(screen.getByTestId("mock-folder-icon")).toBeInTheDocument();
  });

  describe("Search functionality", () => {
    it("updates the search input value when typing", () => {
      renderWithProvider(
        <ClientsDirectoryUI
          clientsFolders={mockAllClientsFolders}
          handleFetchClientsFolders={mockHandleFetchClientsFolders}
          handleParams={mockHandleParams}
          handleFolderRename={mockHandleRenameFolder}
          renameLoading={false}
        />
      );

      const searchInput = screen.getByPlaceholderText("Search clients");
      fireEvent.change(searchInput, { target: { value: "test search" } });

      expect(searchInput).toHaveValue("test search");
    });

    it("calls handleParams with the correct search term after debounce", async () => {
      vi.useFakeTimers();

      renderWithProvider(
        <ClientsDirectoryUI
          clientsFolders={mockAllClientsFolders}
          handleFetchClientsFolders={mockHandleFetchClientsFolders}
          handleParams={mockHandleParams}
          handleFolderRename={mockHandleRenameFolder}
          renameLoading={false}
        />
      );

      const searchInput = screen.getByPlaceholderText("Search clients");
      fireEvent.change(searchInput, { target: { value: "test search" } });

      vi.advanceTimersByTime(1000);
      expect(mockHandleParams).toHaveBeenCalledWith("search", "test search");

      vi.useRealTimers();
    });
  });

  describe("Sort functionality", () => {
    it("calls handleParams with the correct sort value when a sort option is selected", async () => {
      renderWithProvider(
        <ClientsDirectoryUI
          clientsFolders={mockAllClientsFolders}
          handleFetchClientsFolders={mockHandleFetchClientsFolders}
          handleParams={mockHandleParams}
          handleFolderRename={mockHandleRenameFolder}
          renameLoading={false}
        />
      );

      const sortButton = screen.getByTestId("clients-sort-button");
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

  describe("Rename functionality", () => {
    it("renders the rename option correctly", async () => {
      renderWithProvider(
        <ClientCard
          id={mockFolder[1].id}
          name={mockClientFolder[0].name}
          fileCount={mockClientFolder[0].file_count}
          folderSize={mockClientFolder[0].total_folder_size}
          path={mockFolder[1].path}
          handleFetchFolders={mockHandleFetchClientsFolders}
          handleFolderRename={mockHandleRenameFolder}
          renameLoading={false}
        />
      );
      const menuTrigger = screen.getByRole("data-test-dropdown-trigger");
      expect(menuTrigger).toBeInTheDocument();
      userEvent.click(menuTrigger);
      await waitFor(() => {
        expect(menuTrigger).toHaveAttribute("data-state", "open");
      });
      expect(screen.getByText("Rename folder")).toBeInTheDocument();
    });
    it("renders the rename modal when the rename option is clicked", async () => {
      renderWithProvider(
        <ClientCard
          id={mockFolder[1].id}
          name={mockClientFolder[0].name}
          fileCount={mockClientFolder[0].file_count}
          folderSize={mockClientFolder[0].total_folder_size}
          path={mockFolder[1].path}
          handleFetchFolders={mockHandleFetchClientsFolders}
          handleFolderRename={mockHandleRenameFolder}
          renameLoading={false}
        />
      );
      const menuTrigger = screen.getByRole("data-test-dropdown-trigger");
      expect(menuTrigger).toBeInTheDocument();
      userEvent.click(menuTrigger);
      await waitFor(() => {
        expect(menuTrigger).toHaveAttribute("data-state", "open");
      });
      const renameOption = screen.getByText("Rename folder");
      expect(renameOption).toBeInTheDocument();
      userEvent.click(renameOption);
      const renameModal = screen.getByTestId("input-action-modal");
      expect(renameModal).toBeInTheDocument();
    });
    it("renders the rename input with the current folder name as its value", async () => {
      renderWithProvider(
        <ClientCard
          id={mockClientFolder[0].id}
          name={mockClientFolder[0].name}
          fileCount={mockClientFolder[0].file_count}
          folderSize={mockClientFolder[0].total_folder_size}
          path={mockFolder[1].path}
          handleFetchFolders={mockHandleFetchClientsFolders}
          handleFolderRename={mockHandleRenameFolder}
          renameLoading={false}
        />
      );
      const menuTrigger = screen.getByRole("data-test-dropdown-trigger");
      expect(menuTrigger).toBeInTheDocument();
      userEvent.click(menuTrigger);
      await waitFor(() => {
        expect(menuTrigger).toHaveAttribute("data-state", "open");
      });
      const renameOption = screen.getByText("Rename folder");
      expect(renameOption).toBeInTheDocument();
      userEvent.click(renameOption);
      const renameModal = screen.getByTestId("input-action-modal");
      await waitFor(() => {
        const renameInput = screen.getByRole("textbox");
        expect(renameModal).toContainElement(renameInput);
        expect(renameInput).toHaveValue(mockClientFolder[0].name);
      });
    });
        it("calls handleRenameFolder with the correct parameters:  folder name and id when the check button is clicked", async () => {
          renderWithProvider(
            <ClientCard
              id={mockClientFolder[0].id}
              name={mockClientFolder[0].name}
              fileCount={mockClientFolder[0].file_count}
              folderSize={mockClientFolder[0].total_folder_size}
              path={mockFolder[0].path}
              handleFetchFolders={mockHandleFetchClientsFolders}
              handleFolderRename={mockHandleRenameFolder}
              renameLoading={false}
            />
          );
    
          const menuTrigger = screen.getByRole("data-test-dropdown-trigger");
          expect(menuTrigger).toBeInTheDocument();
          userEvent.click(menuTrigger);
          await waitFor(() => {
            expect(menuTrigger).toHaveAttribute("data-state", "open");
          });
          const renameOption = screen.getByText("Rename folder");
          expect(renameOption).toBeInTheDocument();
          userEvent.click(renameOption);
          const renameModal = screen.getByTestId("input-action-modal");
          await waitFor(() => {
            const renameInput = screen.getByRole("textbox");
            expect(renameModal).toContainElement(renameInput);
            expect(renameInput).toHaveValue(mockClientFolder[0].name);
          });
          const checkButton = screen.getByTestId("check-button");
          expect(checkButton).toBeInTheDocument();
          userEvent.click(checkButton);
          await waitFor(() => {
            expect(mockHandleRenameFolder).toHaveBeenCalledWith(mockClientFolder[0].id, mockClientFolder[0].name);
          });
    
        });
  });
});
