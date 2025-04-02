import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { OfferingCard } from "components";
import { PackageOfferingsUI } from "modules";
import { BrowserRouter } from "react-router-dom";
import { mockPackageOffering, mockAllPackageOfferings } from "lib";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("assets", async () => {
  const originalModule = await vi.importActual<any>("assets");

  return {
    ...originalModule,
    OfferingIcon: () => <div data-testid="mock-offering-icon">Mocked Offering Icon</div>,
    DirectoryIcon: () => <div data-testid="mock-directory-icon">Mocked Directory Icon</div>
  };
});

const mockHandleFetchPackageOfferings = vi.fn();
const mockHandleParams = vi.fn();
const mockHandleRenameFolder = vi.fn();

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("PackageOfferingsUI tests", () => {
  it("renders the package offering folders with correct details", () => {
    renderWithProvider(
      <PackageOfferingsUI
        packageOfferings={mockAllPackageOfferings}
        handleFetchPackageOfferings={mockHandleFetchPackageOfferings}
        handleParams={mockHandleParams}
        handleFolderRename={mockHandleRenameFolder}
        renameLoading={false}
      />
    );
    mockAllPackageOfferings.packageOfferingsData.folders.forEach((folder, index, folders) => {
      expect(screen.getByText(folder.name)).toBeInTheDocument();
      expect(screen.queryAllByText(`${folder.files_count} files`)).toHaveLength(folders.length);
      expect(screen.queryAllByText(folder.total_files_size)).toHaveLength(folders.length);
    });
  });

  it("renders the LoadingSpinner when loading is true", () => {
    const loadingMockData = {
      packageOfferingsData: { folders: [], total_count: 0, total_pages: 1, page: 1 },
      loading: true,
      error: false,
      params: {
        search: "",
        sort: "asc",
        limit: 30,
        page: 1,
        start_date: "2024-12-21",
        end_date: "2025-02-04"
      }
    };

    renderWithProvider(
      <PackageOfferingsUI
        packageOfferings={loadingMockData}
        handleFetchPackageOfferings={mockHandleFetchPackageOfferings}
        handleParams={mockHandleParams}
        handleFolderRename={mockHandleRenameFolder}
        renameLoading={false}
      />
    );
    expect(screen.getByTestId("offerings-loading-spinner")).toBeInTheDocument();
    expect(screen.queryByText("files")).not.toBeInTheDocument();
  });

  it("handles missing or invalid data gracefully by rendering the empty state when fetch fails", () => {
    const errorMockData = {
      packageOfferingsData: { folders: [], total_count: 0, total_pages: 1, page: 1 },
      loading: false,
      error: true,
      params: {
        search: "",
        sort: "asc",
        limit: 30,
        page: 1,
        start_date: "2024-12-21",
        end_date: "2025-12-31"
      }
    };

    renderWithProvider(
      <PackageOfferingsUI
        packageOfferings={errorMockData}
        handleFetchPackageOfferings={mockHandleFetchPackageOfferings}
        handleParams={mockHandleParams}
        handleFolderRename={mockHandleRenameFolder}
        renameLoading={false}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("handles empty data gracefully by rendering the empty state when folders is empty", () => {
    const emptyMockData = {
      packageOfferingsData: { folders: [], total_count: 0, total_pages: 1, page: 1 },
      loading: false,
      error: false,
      params: {
        search: "",
        sort: "asc",
        limit: 30,
        page: 1,
        start_date: "2024-12-21",
        end_date: "2025-02-04"
      }
    };

    renderWithProvider(
      <PackageOfferingsUI
        packageOfferings={emptyMockData}
        handleFetchPackageOfferings={mockHandleFetchPackageOfferings}
        handleParams={mockHandleParams}
        handleFolderRename={mockHandleRenameFolder}
        renameLoading={false}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("handles empty data gracefully by rendering the empty state when usersFoldersData is undefined", () => {
    const undefinedMockData = {
      packageOfferingsData: { folders: undefined, total_count: 0, total_pages: 1, page: 1 },
      loading: false,
      error: false,
      params: {
        search: "",
        sort: "asc",
        limit: 30,
        page: 1,
        start_date: "2024-12-21",
        end_date: "2025-02-04"
      }
    };

    renderWithProvider(
      <PackageOfferingsUI
        packageOfferings={undefinedMockData}
        handleFetchPackageOfferings={mockHandleFetchPackageOfferings}
        handleParams={mockHandleParams}
        handleFolderRename={mockHandleRenameFolder}
        renameLoading={false}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("handles empty data gracefully by rendering the empty state when usersFoldersData is null", () => {
    const nullMockData = {
      packageOfferingsData: { folders: null, total_count: 0, total_pages: 1, page: 1 },
      loading: false,
      error: false,
      params: {
        search: "",
        sort: "asc",
        limit: 30,
        page: 1,
        start_date: "2024-12-21",
        end_date: "2025-02-04"
      }
    };

    renderWithProvider(
      <PackageOfferingsUI
        packageOfferings={nullMockData}
        handleFetchPackageOfferings={mockHandleFetchPackageOfferings}
        handleParams={mockHandleParams}
        handleFolderRename={mockHandleRenameFolder}
        renameLoading={false}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("renders the offering card component correctly", () => {
    renderWithProvider(
      <OfferingCard
        id={mockPackageOffering[0].id}
        name={mockPackageOffering[0].name}
        fileCount={mockPackageOffering[0].file_count}
        folderSize={mockPackageOffering[0].total_folder_size}
        path={mockPackageOffering[0].path}
        handleFetchFolders={mockHandleFetchPackageOfferings}
        handleFolderRename={mockHandleRenameFolder}
        renameLoading={false}
      />
    );
    expect(screen.getByText(mockPackageOffering[0].name)).toBeInTheDocument();
    expect(screen.getByText(`${mockPackageOffering[0].file_count} files`)).toBeInTheDocument();
    expect(screen.getByText(mockPackageOffering[0].total_folder_size)).toBeInTheDocument();
    expect(screen.getByTestId("mock-offering-icon")).toBeInTheDocument();
  });

  describe("Search functionality", () => {
    it("updates the search input value when typing", () => {
      renderWithProvider(
        <PackageOfferingsUI
          packageOfferings={mockAllPackageOfferings}
          handleFetchPackageOfferings={mockHandleFetchPackageOfferings}
          handleParams={mockHandleParams}
          handleFolderRename={mockHandleRenameFolder}
          renameLoading={false}
        />
      );

      const searchInput = screen.getByPlaceholderText("Search offerings");
      fireEvent.change(searchInput, { target: { value: "test search" } });

      expect(searchInput).toHaveValue("test search");
    });

    it("calls handleParams with the correct search term after debounce", async () => {
      vi.useFakeTimers();

      renderWithProvider(
        <PackageOfferingsUI
          packageOfferings={mockAllPackageOfferings}
          handleFetchPackageOfferings={mockHandleFetchPackageOfferings}
          handleParams={mockHandleParams}
          handleFolderRename={mockHandleRenameFolder}
          renameLoading={false}
        />
      );

      const searchInput = screen.getByPlaceholderText("Search offerings");
      fireEvent.change(searchInput, { target: { value: "test search" } });

      vi.advanceTimersByTime(1000);
      expect(mockHandleParams).toHaveBeenCalledWith("search", "test search");

      vi.useRealTimers();
    });
  });

  describe("Sort functionality", () => {
    it("calls handleParams with the correct sort value when a sort option is selected", async () => {
      renderWithProvider(
        <PackageOfferingsUI
          packageOfferings={mockAllPackageOfferings}
          handleFetchPackageOfferings={mockHandleFetchPackageOfferings}
          handleParams={mockHandleParams}
          handleFolderRename={mockHandleRenameFolder}
          renameLoading={false}
        />
      );

      const sortButton = screen.getByTestId("offerings-sort-button");
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
        <OfferingCard
          id={mockPackageOffering[0].id}
          name={mockPackageOffering[0].name}
          fileCount={mockPackageOffering[0].file_count}
          folderSize={mockPackageOffering[0].total_folder_size}
          path={mockPackageOffering[0].path}
          handleFetchFolders={mockHandleFetchPackageOfferings}
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
        <OfferingCard
          id={mockPackageOffering[0].id}
          name={mockPackageOffering[0].name}
          fileCount={mockPackageOffering[0].file_count}
          folderSize={mockPackageOffering[0].total_folder_size}
          path={mockPackageOffering[0].path}
          handleFetchFolders={mockHandleFetchPackageOfferings}
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
        <OfferingCard
          id={mockPackageOffering[0].id}
          name={mockPackageOffering[0].name}
          fileCount={mockPackageOffering[0].file_count}
          folderSize={mockPackageOffering[0].total_folder_size}
          path={mockPackageOffering[0].path}
          handleFetchFolders={mockHandleFetchPackageOfferings}
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
        expect(renameInput).toHaveValue(mockPackageOffering[0].name);
      });
    });
    it("calls handleRenameFolder with the correct parameters:  folder name and id when the check button is clicked", async () => {
      renderWithProvider(
        <OfferingCard
          id={mockPackageOffering[0].id}
          name={mockPackageOffering[0].name}
          fileCount={mockPackageOffering[0].file_count}
          folderSize={mockPackageOffering[0].total_folder_size}
          path={mockPackageOffering[0].path}
          handleFetchFolders={mockHandleFetchPackageOfferings}
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
        expect(renameInput).toHaveValue(mockPackageOffering[0].name);
      });
      const checkButton = screen.getByTestId("check-button");
      expect(checkButton).toBeInTheDocument();
      userEvent.click(checkButton);
      await waitFor(() => {
        expect(mockHandleRenameFolder).toHaveBeenCalledWith(
          mockPackageOffering[0].id,
          mockPackageOffering[0].name
        );
      });
    });
  });
});
