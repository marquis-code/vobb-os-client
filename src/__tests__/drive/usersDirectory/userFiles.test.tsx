import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilesContainer } from "components/files";
import { MultiCheckViewProvider } from "context";
import { mockAllUserFiles, mockUserFile } from "lib";
import * as lib from "lib";
import React from "react";


vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "mock-folder-id" }),
  };
});

vi.mock("assets", async () => {
  const originalModule = await vi.importActual<any>("assets");

  return {
    ...originalModule,
    PngIcon: () => <div data-testid="mock-png-icon">Mocked Png Icon</div>,
    JpegIcon: () => <div data-testid="mock-jpeg-icon">Mocked Jpeg Icon</div>,
    PdfIcon: () => <div data-testid="mock-pdf-icon">Mocked Pdf Icon</div>,
    CsvIcon: () => <div data-testid="mock-csv-icon">Mocked Csv Icon</div>,
    XlsIcon: () => <div data-testid="mock-xls-icon">Mocked Xls Icon</div>,
    JpgIcon: () => <div data-testid="mock-jpg-icon">Mocked Jpg Icon</div>,
    WebpIcon: () => <div data-testid="mock-webp-icon">Mocked Webp Icon</div>,
    DocIcon: () => <div data-testid="mock-doc-icon">Mocked doc Icon</div>,
    FileIcon: () => <div data-testid="mock-directory-icon">Mocked Directory Icon</div>
  };
});

vi.mock("lib", async (importOriginal) => {
  const actual = await importOriginal<typeof lib>();
  return {
    ...actual,
    handleDownloadFile: vi.fn()
  };
});

const mockHandleFetchFiles = vi.fn();
const mockHandleParams = vi.fn();
const mockHandleFileRename = vi.fn();
const mockHandleUploadFiles = vi.fn();
const mockSetShowUploadFiles = vi.fn();

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<MultiCheckViewProvider>{ui}</MultiCheckViewProvider>);
};

describe("User files test", () => {
  it("renders the user files correctly", () => {
    renderWithProvider(
      <FilesContainer
        files={mockAllUserFiles}
        handleFetchFiles={mockHandleFetchFiles}
        handleParams={mockHandleParams}
        path="user"
        handleFileRename={mockHandleFileRename}
        handleUploadFiles={mockHandleUploadFiles}
        renameLoading={false}
        setShowUploadModal={mockSetShowUploadFiles}
        showUploadModal={false}
        uploadLoading={false}
      />
    );
    mockAllUserFiles.filesData.files.forEach((file, index, files) => {
      expect(screen.getByText(file.name)).toBeInTheDocument();
      expect(screen.queryAllByText(file.file_size)).toHaveLength(files.length);
    });
  });
  it("renders the LoadingSpinner when loading is true", () => {
    const loadingMockData = {
      filesData: { files: [], total_count: 0, total_pages: 1, page: 1 },
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
      <FilesContainer
        files={loadingMockData}
        handleFetchFiles={mockHandleFetchFiles}
        handleParams={mockHandleParams}
        path="user"
        handleFileRename={mockHandleFileRename}
        handleUploadFiles={mockHandleUploadFiles}
        renameLoading={false}
        setShowUploadModal={mockSetShowUploadFiles}
        showUploadModal={false}
        uploadLoading={false}
      />
    );
    expect(screen.getByTestId("files-loading-spinner")).toBeInTheDocument();
    expect(screen.queryByText("Document")).not.toBeInTheDocument();
    expect(screen.queryByText("Image")).not.toBeInTheDocument();
  });

  it("handles missing or invalid data gracefully by rendering the empty state when fetch fails", () => {
    const errorMockData = {
      filesData: { files: [], total_count: 0, total_pages: 1, page: 1 },
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
      <FilesContainer
        files={errorMockData}
        handleFetchFiles={mockHandleFetchFiles}
        handleParams={mockHandleParams}
        path="user"
        handleFileRename={mockHandleFileRename}
        handleUploadFiles={mockHandleUploadFiles}
        renameLoading={false}
        setShowUploadModal={mockSetShowUploadFiles}
        showUploadModal={false}
        uploadLoading={false}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("handles empty data gracefully by rendering the empty state when files is empty", () => {
    const emptyMockData = {
      filesData: { files: [], total_count: 0, total_pages: 1, page: 1 },
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
      <FilesContainer
        files={emptyMockData}
        handleFetchFiles={mockHandleFetchFiles}
        handleParams={mockHandleParams}
        path="user"
        handleFileRename={mockHandleFileRename}
        handleUploadFiles={mockHandleUploadFiles}
        renameLoading={false}
        setShowUploadModal={mockSetShowUploadFiles}
        showUploadModal={false}
        uploadLoading={false}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("handles empty data gracefully by rendering the empty state when filesData is undefined", () => {
    const undefinedMockData = {
      filesData: { files: undefined, total_count: 0, total_pages: 1, page: 1 },
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
      <FilesContainer
        files={undefinedMockData}
        handleFetchFiles={mockHandleFetchFiles}
        handleParams={mockHandleParams}
        path="user"
        handleFileRename={mockHandleFileRename}
        handleUploadFiles={mockHandleUploadFiles}
        renameLoading={false}
        setShowUploadModal={mockSetShowUploadFiles}
        showUploadModal={false}
        uploadLoading={false}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("handles empty data gracefully by rendering the empty state when filesData is null", () => {
    const nullMockData = {
      filesData: { files: null, total_count: 0, total_pages: 1, page: 1 },
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
      <FilesContainer
        files={nullMockData}
        handleFetchFiles={mockHandleFetchFiles}
        handleParams={mockHandleParams}
        path="user"
        handleFileRename={mockHandleFileRename}
        handleUploadFiles={mockHandleUploadFiles}
        renameLoading={false}
        setShowUploadModal={mockSetShowUploadFiles}
        showUploadModal={false}
        uploadLoading={false}
      />
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });
  describe("Search functionality", () => {
    it("updates the search input value when typing", () => {
      renderWithProvider(
        <FilesContainer
          files={mockAllUserFiles}
          handleFetchFiles={mockHandleFetchFiles}
          handleParams={mockHandleParams}
          path="user"
          handleFileRename={mockHandleFileRename}
          handleUploadFiles={mockHandleUploadFiles}
          renameLoading={false}
          setShowUploadModal={mockSetShowUploadFiles}
          showUploadModal={false}
          uploadLoading={false}
        />
      );

      const searchInput = screen.getByPlaceholderText("Search files");
      fireEvent.change(searchInput, { target: { value: "test search" } });

      expect(searchInput).toHaveValue("test search");
    });

    it("calls handleParams with the correct search term after debounce", async () => {
      vi.useFakeTimers();

      renderWithProvider(
        <FilesContainer
          files={mockAllUserFiles}
          handleFetchFiles={mockHandleFetchFiles}
          handleParams={mockHandleParams}
          path="user"
          handleFileRename={mockHandleFileRename}
          handleUploadFiles={mockHandleUploadFiles}
          renameLoading={false}
          setShowUploadModal={mockSetShowUploadFiles}
          showUploadModal={false}
          uploadLoading={false}
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
        <FilesContainer
          files={mockAllUserFiles}
          handleFetchFiles={mockHandleFetchFiles}
          handleParams={mockHandleParams}
          path="user"
          handleFileRename={mockHandleFileRename}
          handleUploadFiles={mockHandleUploadFiles}
          renameLoading={false}
          setShowUploadModal={mockSetShowUploadFiles}
          showUploadModal={false}
          uploadLoading={false}
        />
      );

      const sortButton = screen.getByTestId("files-sort-button");
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
        <FilesContainer
          files={mockAllUserFiles}
          handleFetchFiles={mockHandleFetchFiles}
          handleParams={mockHandleParams}
          path="user"
          handleFileRename={mockHandleFileRename}
          handleUploadFiles={mockHandleUploadFiles}
          renameLoading={false}
          setShowUploadModal={mockSetShowUploadFiles}
          showUploadModal={false}
          uploadLoading={false}
        />
      );
      const menuTriggers = screen.getAllByRole("data-test-dropdown-trigger");
      userEvent.click(menuTriggers[0]);
      await waitFor(() => {
        expect(menuTriggers[0]).toHaveAttribute("data-state", "open");
      });
      expect(screen.getByText("Rename file")).toBeInTheDocument();
    });
    it("renders the rename modal when the rename option is clicked", async () => {
      renderWithProvider(
        <FilesContainer
          files={mockAllUserFiles}
          handleFetchFiles={mockHandleFetchFiles}
          handleParams={mockHandleParams}
          path="user"
          handleFileRename={mockHandleFileRename}
          handleUploadFiles={mockHandleUploadFiles}
          renameLoading={false}
          setShowUploadModal={mockSetShowUploadFiles}
          showUploadModal={false}
          uploadLoading={false}
        />
      );
      const menuTrigger = screen.getByRole("data-test-dropdown-trigger");
      userEvent.click(menuTrigger);
      await waitFor(() => {
        expect(menuTrigger).toHaveAttribute("data-state", "open");
      });
      const renameOption = screen.getByText("Rename file");
      userEvent.click(renameOption);
      const renameModal = screen.getByTestId("input-action-modal");
      expect(renameModal).toBeInTheDocument();
    });
    it("renders the rename input with the current file name as its value", async () => {
      renderWithProvider(
        <FilesContainer
          files={mockAllUserFiles}
          handleFetchFiles={mockHandleFetchFiles}
          handleParams={mockHandleParams}
          path="user"
          handleFileRename={mockHandleFileRename}
          handleUploadFiles={mockHandleUploadFiles}
          renameLoading={false}
          setShowUploadModal={mockSetShowUploadFiles}
          showUploadModal={false}
          uploadLoading={false}
        />
      );
      const menuTrigger = screen.getByRole("data-test-dropdown-trigger");
      expect(menuTrigger).toBeInTheDocument();
      userEvent.click(menuTrigger);
      await waitFor(() => {
        expect(menuTrigger).toHaveAttribute("data-state", "open");
      });
      const renameOption = screen.getByText("Rename file");
      expect(renameOption).toBeInTheDocument();
      userEvent.click(renameOption);
      const renameModal = screen.getByTestId("input-action-modal");
      await waitFor(() => {
        const renameInput = screen.getByTestId("action-input");
        expect(renameModal).toContainElement(renameInput);
        expect(renameInput).toHaveValue(mockUserFile[0].name);
      });
    });
    it("calls handleFileRename with the correct parameters:  file name input and file id when the check button is clicked", async () => {
      renderWithProvider(
        <FilesContainer
          files={mockAllUserFiles}
          handleFetchFiles={mockHandleFetchFiles}
          handleParams={mockHandleParams}
          path="user"
          handleFileRename={mockHandleFileRename}
          handleUploadFiles={mockHandleUploadFiles}
          renameLoading={false}
          setShowUploadModal={mockSetShowUploadFiles}
          showUploadModal={false}
          uploadLoading={false}
        />
      );
      const menuTrigger = screen.getByRole("data-test-dropdown-trigger");
      expect(menuTrigger).toBeInTheDocument();
      userEvent.click(menuTrigger);
      await waitFor(() => {
        expect(menuTrigger).toHaveAttribute("data-state", "open");
      });
      const renameOption = screen.getByText("Rename file");
      expect(renameOption).toBeInTheDocument();
      userEvent.click(renameOption);
      const renameModal = screen.getByTestId("input-action-modal");
      await waitFor(() => {
        const renameInput = screen.getByTestId("action-input");
        expect(renameModal).toContainElement(renameInput);
        expect(renameInput).toHaveValue(mockUserFile[0].name);
      });
      const checkButton = screen.getByTestId("check-button");
      expect(checkButton).toBeInTheDocument();
      userEvent.click(checkButton);
      await waitFor(() => {
        expect(mockHandleFileRename).toHaveBeenCalledWith(mockUserFile[0].id, mockUserFile[0].name);
      });

    });
  });

  describe("Download Functionality", async () => {
    it("Downloads a file when the download option is clicked", async () => {
      renderWithProvider(
        <FilesContainer
          files={mockAllUserFiles}
          handleFetchFiles={mockHandleFetchFiles}
          handleParams={mockHandleParams}
          path="user"
          handleFileRename={mockHandleFileRename}
          handleUploadFiles={mockHandleUploadFiles}
          renameLoading={false}
          setShowUploadModal={mockSetShowUploadFiles}
          showUploadModal={false}
          uploadLoading={false}
        />
      );

      const menuTriggers = screen.getAllByRole("data-test-dropdown-trigger");
      userEvent.click(menuTriggers[0]);
      await waitFor(() => {
        expect(menuTriggers[0]).toHaveAttribute("data-state", "open");
      });
      const downloadOption = screen.getByText("Download file");
      userEvent.click(downloadOption);
      await waitFor(() => {
        expect(lib.handleDownloadFile).toHaveBeenCalledWith(mockUserFile[0].file_url, mockUserFile);
      });
    });
  });

  describe("Upload functionality", () => {
    it("renders the upload file modal when the upload button is clicked", async () => {
      const StateWrapper = () => {
        const [showUploadModal, setShowUploadModal] = React.useState(false);

        return (
          <FilesContainer
            files={mockAllUserFiles}
            handleFetchFiles={mockHandleFetchFiles}
            handleParams={mockHandleParams}
            path="user"
            handleFileRename={mockHandleFileRename}
            handleUploadFiles={mockHandleUploadFiles}
            renameLoading={false}
            setShowUploadModal={setShowUploadModal}
            showUploadModal={showUploadModal}
            uploadLoading={false}
          />
        );
      };

      renderWithProvider(<StateWrapper />);

      const uploadButton = screen.getByText("Upload a New file");
      expect(uploadButton).toBeInTheDocument();

      userEvent.click(uploadButton);

      await waitFor(() => {
        expect(screen.getByText("Attach files")).toBeInTheDocument();
      });
    });
    it("calls handleUploadFiles when the attach file button is clicked", async () => {
      const StateWrapper = () => {
        const [showUploadModal, setShowUploadModal] = React.useState(false);

        return (
          <FilesContainer
            files={mockAllUserFiles}
            handleFetchFiles={mockHandleFetchFiles}
            handleParams={mockHandleParams}
            path="user"
            handleFileRename={mockHandleFileRename}
            handleUploadFiles={mockHandleUploadFiles}
            renameLoading={false}
            setShowUploadModal={setShowUploadModal}
            showUploadModal={showUploadModal}
            uploadLoading={false}
          />
        );
      };

      renderWithProvider(<StateWrapper />);

      const uploadButton = screen.getByText("Upload a New file");
      expect(uploadButton).toBeInTheDocument();

      userEvent.click(uploadButton);
      await waitFor(() => {
        expect(screen.getByText("Attach files")).toBeInTheDocument();
      });
      const fileInput = screen.getByTestId("file-input");
      const file1 = new File(["file content"], "file1.png", { type: "image/png" });

      fireEvent.change(fileInput, { target: { files: [file1] } });

      const attachButton = screen.getByText("Attach files");
      expect(attachButton).toBeInTheDocument()
      userEvent.click(attachButton);
      await waitFor(() => {
        expect(mockHandleUploadFiles).toHaveBeenCalledWith([file1], "mock-folder-id");
      })
    });
  });
  describe("Multi Check functionality", () => {
    it("renders the multicheck view when the select option is clicked", async () => {
      renderWithProvider(
        <FilesContainer
          files={mockAllUserFiles}
          handleFetchFiles={mockHandleFetchFiles}
          handleParams={mockHandleParams}
          path="user"
          handleFileRename={mockHandleFileRename}
          handleUploadFiles={mockHandleUploadFiles}
          renameLoading={false}
          setShowUploadModal={mockSetShowUploadFiles}
          showUploadModal={false}
          uploadLoading={false}
        />
      );
      const menuTrigger = screen.getByRole("data-test-dropdown-trigger");
      userEvent.click(menuTrigger);
      await waitFor(() => {
        expect(menuTrigger).toHaveAttribute("data-state", "open");
      });
      const selectOption = screen.getByText("Select file");
      expect(selectOption).toBeInTheDocument();
      userEvent.click(selectOption);
      await waitFor(() => {
        expect(screen.getByText("Download files")).toBeInTheDocument();
      });
    });

    it("selects a folder within the multicheck view when the checkbox is clicked", async () => {
      renderWithProvider(
        <FilesContainer
          files={mockAllUserFiles}
          handleFetchFiles={mockHandleFetchFiles}
          handleParams={mockHandleParams}
          path="user"
          handleFileRename={mockHandleFileRename}
          handleUploadFiles={mockHandleUploadFiles}
          renameLoading={false}
          setShowUploadModal={mockSetShowUploadFiles}
          showUploadModal={false}
          uploadLoading={false}
        />
      );
      const menuTrigger = screen.getByRole("data-test-dropdown-trigger");
      userEvent.click(menuTrigger);
      await waitFor(() => {
        expect(menuTrigger).toHaveAttribute("data-state", "open");
      });
      const selectOption = screen.getByText("Select file");
      expect(selectOption).toBeInTheDocument();
      userEvent.click(selectOption);
      await waitFor(() => {
        expect(screen.getByText("Download files")).toBeInTheDocument();
        const checkboxes = screen.getAllByRole("checkbox");
        expect(checkboxes).toHaveLength(1);
        userEvent.click(checkboxes[1]);
        expect(checkboxes[1]).toBeChecked;
      });
    });
  });
});
