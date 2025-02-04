import { render, screen } from "@testing-library/react";
import { DriveUI } from "modules";
import { DirectoryCard } from "components";
import { BrowserRouter } from "react-router-dom";
import { mockAllDefaultFolders, mockFolder } from "lib";

vi.mock("assets", async () => {
  const originalModule = await vi.importActual<any>("assets");

  return {
    ...originalModule,
    DirectoryIcon: () => <div data-testid="mock-directory-icon">Mocked Icon</div>
  };
});

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("DriveUI tests", () => {
  it("renders the default folders with correct details", () => {
    renderWithProvider(<DriveUI allDefaultFolders={mockAllDefaultFolders} />);
    mockAllDefaultFolders.defaultFoldersData.forEach((folder) => {
      expect(screen.getByText(folder.name)).toBeInTheDocument();
      expect(screen.getByText(`${folder.files_count} files`)).toBeInTheDocument();
      expect(screen.queryAllByText(folder.total_files_size)).toHaveLength(4);
    });
  });

  it("renders the LoadingSpinner when loading is true", () => {
    const loadingMockData = { defaultFoldersData: [], loading: true, error: false };

    renderWithProvider(<DriveUI allDefaultFolders={loadingMockData} />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.queryByText("Directory")).not.toBeInTheDocument();
  });

  it("handles missing data gracefully by rendering the empty state when defaultFolders is empty", () => {
    const emptyMockData = { defaultFoldersData: [], loading: false, error: false };

    renderWithProvider(<DriveUI allDefaultFolders={emptyMockData} />);
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("renders the empty state when defaultFoldersData is undefined", () => {
    const undefinedDataMock = { defaultFoldersData: undefined, loading: false, error: false };
    renderWithProvider(<DriveUI allDefaultFolders={undefinedDataMock} />);
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.queryByText("Directory")).not.toBeInTheDocument();
  });

  it("renders the empty state when defaultFoldersData is null", () => {
  const nullDataMock = { defaultFoldersData: null, loading: false, error: false };

  renderWithProvider(<DriveUI allDefaultFolders={nullDataMock} />);
  expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  expect(screen.queryByText("Directory")).not.toBeInTheDocument();
  });

  it("renders the directory card component correctly", async () => {
    renderWithProvider(
        <DirectoryCard
          name={mockFolder[0].name}
          fileCount={mockFolder[0].fileCount}
          folderSize={mockFolder[0].folderSize}
          path={mockFolder[0].path}
        />
    );
    expect(screen.getByText("Users Directory")).toBeInTheDocument();
    expect(screen.getByText("5 files")).toBeInTheDocument();
    expect(screen.getByText("0KB")).toBeInTheDocument();
    expect(screen.getByTestId("mock-directory-icon")).toBeInTheDocument();
  });

  it("renders the dropdown menu with options triggered", async () => {
    renderWithProvider(
      <DirectoryCard
        name={mockFolder[0].name}
        fileCount={mockFolder[0].fileCount}
        folderSize={mockFolder[0].folderSize}
      />
    );
    const menuTrigger = screen.getByRole("data-test-dropdown-trigger");
    expect(menuTrigger).toBeInTheDocument();
  });

  it("links to the selected directory when clicked", () => {
    renderWithProvider(

        <DirectoryCard
          name={mockFolder[0].name}
          fileCount={mockFolder[0].fileCount}
          folderSize={mockFolder[0].folderSize}
          path={mockFolder[0].path}
        />

    );
    mockFolder.forEach((folder) => {
      const linkElement = screen.getByRole("link", {
        name: new RegExp(folder.name, "i")
      });

      expect(linkElement).toHaveAttribute("href", `/drive/${folder.path}`);
    });
  });
});
