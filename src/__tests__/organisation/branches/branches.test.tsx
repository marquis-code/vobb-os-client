import { fireEvent, render, RenderResult, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BranchTableMock } from "lib";
import { OrgBranchesUI } from "modules";

const mockHandlePagination = vi.fn();
const mockHandlePrimaryBranch = vi.fn();
const mockHandleAddBranch = vi.fn();
const mockHandleViewBranch = vi.fn();
const mockHandleEditBranch = vi.fn();
const mockHandleDeleteBranch = vi.fn();

const mockedData = {
  loading: false,
  orgBranches: {
    branchesArray: BranchTableMock,
    branchesMetaData: {
      currentPage: 1,
      totalCount: 50,
      totalPages: 5,
      pageLimit: 20
    }
  },
  handleAddBranch: mockHandleAddBranch,
  handleViewBranch: mockHandleViewBranch,
  handleEditBranch: mockHandleEditBranch,
  handlePrimaryBranch: mockHandlePrimaryBranch,
  handlePagination: mockHandlePagination,
  handleDeleteBranch: mockHandleDeleteBranch
};

describe("Organisational Branches UI tests", () => {
  let renderResult: RenderResult;

  const defaultProps = {
    loading: false,
    orgBranches: {
      branchesArray: [],
      branchesMetaData: {
        currentPage: 1,
        totalCount: 50,
        totalPages: 5,
        pageLimit: 20
      }
    },
    handleAddBranch: mockHandleAddBranch,
    handleViewBranch: mockHandleViewBranch,
    handleEditBranch: mockHandleEditBranch,
    handlePrimaryBranch: mockHandlePrimaryBranch,
    handlePagination: mockHandlePagination,
    handleDeleteBranch: mockHandleDeleteBranch
  };

  const customRender = (props = {}) => {
    const mergedProps = { ...defaultProps, ...props };
    return render(<OrgBranchesUI {...mergedProps} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    renderResult = customRender();
  });

  it("should check for heading content", () => {
    expect(renderResult.container).toBeTruthy();

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/branches/i);
  });

  it("should check for add Branch button", () => {
    expect(renderResult.container).toBeTruthy();

    const addTeamBtn = screen.getByTestId("add-branch");
    expect(addTeamBtn).toBeInTheDocument();
    expect(addTeamBtn).toHaveTextContent(/new branch/i);
  });

  it("should display table and table heads", () => {
    expect(renderResult.container).toBeTruthy();

    const table = screen.getByRole("table");
    const nameColumn = screen.getByRole("columnheader", { name: /name/i });
    const countryColumn = screen.getByRole("columnheader", { name: /country/i });
    const stateColumn = screen.getByRole("columnheader", { name: /state/i });
    const cityColumn = screen.getByRole("columnheader", { name: /city/i });
    const timezoneColumn = screen.getByRole("columnheader", { name: /timezone/i });

    expect(table).toBeInTheDocument();
    expect(nameColumn).toBeInTheDocument();
    expect(countryColumn).toBeInTheDocument();
    expect(stateColumn).toBeInTheDocument();
    expect(cityColumn).toBeInTheDocument();
    expect(timezoneColumn).toBeInTheDocument();
  });

  it("should show loading spinner when loading is true", () => {
    renderResult = customRender({ ...defaultProps.orgBranches, loading: true });
    expect(renderResult.container).toBeTruthy();

    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
  });

  it("should display cell with 'no results' when there are no teams", () => {
    expect(renderResult.container).toBeTruthy();
    const resultCell = screen.getByRole("cell", { name: /no results/i });
    expect(resultCell).toBeInTheDocument();
  });

  it("should render with mocked data", () => {
    renderResult = customRender(mockedData);
    expect(renderResult.container).toBeTruthy();
    const mockedTeam = screen.getByText("Headquarters");
    expect(mockedTeam).toBeInTheDocument();
  });

  it("renders the pagination component with correct initial values", () => {
    customRender();
    const paginationComponents = screen.getAllByTestId("pagination");
    expect(paginationComponents.length).toBeGreaterThan(0);
    const paginationComponent = paginationComponents[0];
    expect(paginationComponent).toBeInTheDocument();

    const limitSelector = within(paginationComponent).getByTestId("select-limit");
    expect(limitSelector).toHaveTextContent("20");

    const pageInfo = within(paginationComponent).getByText(/Items per page/i);
    expect(pageInfo).toBeInTheDocument();
  });

  it("calls handlePagination when a new limit is selected", async () => {
    customRender();

    const selectContainer = screen.getAllByTestId("select-limit");
    const selectLimit = selectContainer[0];
    expect(selectLimit).toBeInTheDocument();

    const selectButton = within(selectLimit).getByRole("combobox");
    await userEvent.click(selectButton);

    const options = await screen.findAllByText("50");
    const option = options[0];
    await userEvent.click(option);

    expect(mockHandlePagination).toHaveBeenCalledWith("limit", 50);
  });

  it("calls handleAddBranch when add branch button is clicked", () => {
    customRender(mockedData);
    const addBranchBtns = screen.getAllByTestId("add-branch");
    const addBranchBtn = addBranchBtns[0];
    expect(addBranchBtn).toBeInTheDocument();
    fireEvent.click(addBranchBtn);
    expect(mockHandleAddBranch).toHaveBeenCalled();
  });

  it("calls handlePrimaryBranch when mark as primary button is clicked", async () => {
    customRender(mockedData);
    const menuButtons = screen.getAllByTestId("menu-branch");
    await userEvent.click(menuButtons[0]);
    const primaryOption = await screen.findByText(/mark as primary/i);
    await userEvent.click(primaryOption);
    await waitFor(() => {
      expect(mockHandlePrimaryBranch).toHaveBeenCalled();
    });
  });

  it("calls handleViewBranch when view branch button is clicked", async () => {
    customRender(mockedData);
    const menuButtons = screen.getAllByTestId("menu-branch");
    await userEvent.click(menuButtons[0]);
    const viewBranchOption = await screen.findByText(/view branch/i);
    await userEvent.click(viewBranchOption);
    await waitFor(() => {
      expect(mockHandleViewBranch).toHaveBeenCalled();
    });
  });

  it("calls handleEditBranch when edit  button isbranch clicked", async () => {
    customRender(mockedData);
    const menuButtons = screen.getAllByTestId("menu-branch");
    await userEvent.click(menuButtons[0]);
    const editOption = await screen.findByText(/edit branch/i);
    await userEvent.click(editOption);
    await waitFor(() => {
      expect(mockHandleEditBranch).toHaveBeenCalled();
    });
  });
  it("calls handleDeleteBranch when delete button is clicked", async () => {
    customRender(mockedData);
    const menuButtons = screen.getAllByTestId("menu-branch");
    await userEvent.click(menuButtons[0]);
    const deleteOption = await screen.findByText(/delete/i);
    await userEvent.click(deleteOption);
    await waitFor(() => {
      expect(mockHandleDeleteBranch).toHaveBeenCalled();
    });
  });
});
