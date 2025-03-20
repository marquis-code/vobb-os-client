import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PackageCard } from "components";
import { PackagesUI } from "modules";
import { BrowserRouter } from "react-router-dom";
import { mockPackageFolder, mockAllPackages } from "lib";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("assets", async () => {
  const originalModule = await vi.importActual<any>("assets");

  return {
    ...originalModule,
    PackageFolderIcon: () => <div data-testid="mock-package-icon">Mocked Package Icon</div>,
    DirectoryIcon: () => <div data-testid="mock-directory-icon">Mocked Directory Icon</div>
  };
});

const mockHandleFetchPackagesFolders = vi.fn();
const mockHandleParams = vi.fn();

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("PackagesUI tests", () => {
  it("renders the package folders with correct details", () => {
    renderWithProvider(
      <PackagesUI
        packagesFolders={mockAllPackages}
        handleFetchPackagesFolders={mockHandleFetchPackagesFolders}
        handleParams={mockHandleParams}
      />
    );
    mockAllPackages.packagesFoldersData.folders.forEach((folder, index, folders) => {
      expect(screen.getByText(folder.name)).toBeInTheDocument();
      expect(screen.queryAllByText(`${folder.files_count} files`)).toHaveLength(folders.length);
      expect(screen.queryAllByText(folder.total_files_size)).toHaveLength(folders.length);
    });
  });

  it("renders the LoadingSpinner when loading is true", () => {
    const loadingMockData = {
      packagesFoldersData: { folders: [], total_count: 0, total_pages: 1, page: 1 },
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
      <PackagesUI
        packagesFolders={loadingMockData}
        handleFetchPackagesFolders={mockHandleFetchPackagesFolders}
        handleParams={mockHandleParams}
      />
    );
    expect(screen.getByTestId("packages-loading-spinner")).toBeInTheDocument();
    expect(screen.queryByText("files")).not.toBeInTheDocument();
  });

  it("handles missing or invalid data gracefully by rendering the empty state when fetch fails", () => {
    const errorMockData = {
      packagesFoldersData: { folders: [], total_count: 0, total_pages: 1, page: 1 },
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
      <PackagesUI
        packagesFolders={errorMockData}
        handleFetchPackagesFolders={mockHandleFetchPackagesFolders}
        handleParams={mockHandleParams}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("handles empty data gracefully by rendering the empty state when folders is empty", () => {
    const emptyMockData = {
      packagesFoldersData: { folders: [], total_count: 0, total_pages: 1, page: 1 },
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
      <PackagesUI
        packagesFolders={emptyMockData}
        handleFetchPackagesFolders={mockHandleFetchPackagesFolders}
        handleParams={mockHandleParams}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("handles empty data gracefully by rendering the empty state when packagesFoldersData is undefined", () => {
    const undefinedMockData = {
      packagesFoldersData: { folders: undefined, total_count: 0, total_pages: 1, page: 1 },
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
      <PackagesUI
        packagesFolders={undefinedMockData}
        handleFetchPackagesFolders={mockHandleFetchPackagesFolders}
        handleParams={mockHandleParams}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("handles empty data gracefully by rendering the empty state when packagesFoldersData is null", () => {
    const nullMockData = {
      packagesFoldersData: { folders: null, total_count: 0, total_pages: 1, page: 1 },
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
      <PackagesUI
        packagesFolders={nullMockData}
        handleFetchPackagesFolders={mockHandleFetchPackagesFolders}
        handleParams={mockHandleParams}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("renders the package card component correctly", () => {
    renderWithProvider(
      <PackageCard
        id={mockPackageFolder[0].id}
        name={mockPackageFolder[0].name}
        fileCount={mockPackageFolder[0].file_count}
        folderSize={mockPackageFolder[0].total_folder_size}
        path={mockPackageFolder[0].path}
        handleFetchFolders={mockHandleFetchPackagesFolders}
      />
    );
    expect(screen.getByText(mockPackageFolder[0].name)).toBeInTheDocument();
    expect(screen.getByText(`${mockPackageFolder[0].file_count} files`)).toBeInTheDocument();
    expect(screen.getByText(mockPackageFolder[0].total_folder_size)).toBeInTheDocument();
    expect(screen.getByTestId("mock-package-icon")).toBeInTheDocument();
  });

  describe("Search functionality", () => {
    it("updates the search input value when typing", () => {
      renderWithProvider(
        <PackagesUI
          packagesFolders={mockAllPackages}
          handleFetchPackagesFolders={mockHandleFetchPackagesFolders}
          handleParams={mockHandleParams}
        />
      );

      const searchInput = screen.getByPlaceholderText("Search packages");
      fireEvent.change(searchInput, { target: { value: "test search" } });

      expect(searchInput).toHaveValue("test search");
    });

    it("calls handleParams with the correct search term after debounce", async () => {
      vi.useFakeTimers();

      renderWithProvider(
        <PackagesUI
          packagesFolders={mockAllPackages}
          handleFetchPackagesFolders={mockHandleFetchPackagesFolders}
          handleParams={mockHandleParams}
        />
      );

      const searchInput = screen.getByPlaceholderText("Search packages");
      fireEvent.change(searchInput, { target: { value: "test search" } });

      vi.advanceTimersByTime(1000);
      expect(mockHandleParams).toHaveBeenCalledWith("search", "test search");

      vi.useRealTimers();
    });
  });

  describe("Sort functionality", () => {
    it("calls handleParams with the correct sort value when a sort option is selected", async () => {
      renderWithProvider(
        <PackagesUI
          packagesFolders={mockAllPackages}
          handleFetchPackagesFolders={mockHandleFetchPackagesFolders}
          handleParams={mockHandleParams}
        />
      );

      const sortButton = screen.getByTestId("packages-sort-button");
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

  // describe("Access control", () => {
  // });
});
