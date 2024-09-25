import { render, RenderResult, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BranchMemberTableMock, BranchTeamTableMock } from "lib";
import { OrgBranchUI } from "modules";
import { initBranchData } from "pages";
import { BrowserRouter } from "react-router-dom";

const mockHandleTransferMember = vi.fn();
const mockHandleViewMember = vi.fn();
const mockHandleMemberPagination = vi.fn();
const mockHandleTeamPagination = vi.fn();

const defaultProps = {
  loadingMembers: false,
  branchInfo: {
    id: "334567",
    name: "Branch1",
    country: "Nigeria",
    zipCode: "123456",
    province: "lagos",
    isPrimary: false,
    addressLine1: "Okota",
    addressLine2: "",
    city: "Lasgidi",
    timeZone: "GMT + 1",
    hasMembers: true
  },
  branchTeams: {
    teamsArray: [],
    teamsMetaData: {
      currentPage: 1,
      totalCount: 50,
      totalPages: 5,
      pageLimit: 20
    }
  },
  branchMembers: {
    membersArray: [],
    membersMetaData: {
      currentPage: 1,
      totalCount: 50,
      totalPages: 5,
      pageLimit: 20
    }
  },
  handleTransferMember: mockHandleTransferMember,
  handleViewMember: mockHandleViewMember,
  handleUpdateMembersParams: mockHandleMemberPagination,
  handleUpdateTeamsParams: mockHandleTeamPagination
};

const mockedData = {
  loadingMembers: false,
  branchInfo: {
    id: "334567",
    name: "Branch1",
    country: "Nigeria",
    zipCode: "123456",
    province: "lagos",
    isPrimary: false,
    addressLine1: "Okota",
    addressLine2: "",
    city: "Lasgidi",
    timeZone: "GMT + 1",
    hasMembers: true
  },
  branchTeams: {
    teamsArray: BranchTeamTableMock,
    teamsMetaData: {
      currentPage: 1,
      totalCount: 50,
      totalPages: 5,
      pageLimit: 20
    }
  },
  branchMembers: {
    membersArray: BranchMemberTableMock,
    membersMetaData: {
      currentPage: 1,
      totalCount: 50,
      totalPages: 5,
      pageLimit: 20
    }
  },
  handleTransferMember: mockHandleTransferMember,
  handleViewMember: mockHandleViewMember,
  handleUpdateMembersParams: mockHandleMemberPagination,
  handleUpdateTeamsParams: mockHandleTeamPagination
};

const MockedBranchUI = (props = {}) => {
  const mergedProps = { ...defaultProps, ...props };
  return (
    <BrowserRouter>
      <OrgBranchUI {...mergedProps} />
    </BrowserRouter>
  );
};
const customRender = (props = {}) => render(<MockedBranchUI {...props} />);

describe("Branch UI tests", () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = customRender();
  });

  it("should render with mocked data", async () => {
    renderResult = customRender(mockedData);

    const mockedBranches = screen.getAllByText("Branch1 (GMT + 1)");
    const mockedBranch = mockedBranches[0];
    expect(mockedBranch).toBeInTheDocument();
  });

  it("should check for filter button", () => {
    expect(renderResult.container).toBeTruthy();

    const filterButtons = screen.getAllByRole("combobox");
    expect(filterButtons.length).toBeGreaterThan(0);
    const filterButton = filterButtons[0];

    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toHaveTextContent(/filter/i);

    expect(filterButton).toHaveAttribute("aria-haspopup", "dialog");
    expect(filterButton).toHaveAttribute("role", "combobox");
  });

  it("should check for Add member button", () => {
    expect(renderResult.container).toBeTruthy();

    const addTeamBtn = screen.getByTestId("add-member");
    expect(addTeamBtn).toBeInTheDocument();
    expect(addTeamBtn).toHaveTextContent(/add member/i);
  });

  it("should display table and table heads for members", () => {
    expect(renderResult.container).toBeTruthy();
    const memberTab = screen.getByRole("tab", { name: "Members" });
    userEvent.click(memberTab);
    const table = screen.getByRole("table");
    const nameColumn = screen.getByRole("columnheader", { name: /name/i });
    const emailColumn = screen.getByRole("columnheader", { name: /email/i });
    const roleColumn = screen.getByRole("columnheader", { name: /role/i });
    const teamsColumn = screen.getByRole("columnheader", { name: /teams/i });
    const dateColumn = screen.getByRole("columnheader", { name: /date/i });

    expect(table).toBeInTheDocument();
    expect(nameColumn).toBeInTheDocument();
    expect(emailColumn).toBeInTheDocument();
    expect(roleColumn).toBeInTheDocument();
    expect(teamsColumn).toBeInTheDocument();
    expect(dateColumn).toBeInTheDocument();
  });

  it("should show loading spinner when loading is true", () => {
    renderResult = customRender({ ...defaultProps, loadingMembers: true });
    expect(renderResult.container).toBeTruthy();

    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
  });

  it("should display cell with 'no results' when there are no members", () => {
    expect(renderResult.container).toBeTruthy();
    const resultCell = screen.getByRole("cell", { name: /no results/i });
    expect(resultCell).toBeInTheDocument();
  });

  it("renders the members pagination component with correct initial values", () => {
    customRender();
    const memberTabs = screen.getAllByRole("tab", { name: "Members" });
    const memberTab = memberTabs[0];
    userEvent.click(memberTab);
    const paginationComponents = screen.getAllByTestId("pagination");
    expect(paginationComponents.length).toBeGreaterThan(0);
    const paginationComponent = paginationComponents[0];
    expect(paginationComponent).toBeInTheDocument();

    const limitSelector = within(paginationComponent).getByTestId("select-limit");
    expect(limitSelector).toHaveTextContent("20");

    const pageInfo = within(paginationComponent).getByText(/Items per page/i);
    expect(pageInfo).toBeInTheDocument();
  });

  it("calls handlePagination for members when a new limit is selected", async () => {
    customRender();
    const memberTabs = screen.getAllByRole("tab", { name: "Members" });
    const memberTab = memberTabs[0];
    userEvent.click(memberTab);

    const selectContainer = screen.getAllByTestId("select-limit");
    const selectLimit = selectContainer[0];
    expect(selectLimit).toBeInTheDocument();

    const selectButton = within(selectLimit).getByRole("combobox");
    await userEvent.click(selectButton);

    const options = await screen.findAllByText("50");
    const option = options[0];
    await userEvent.click(option);

    expect(mockHandleMemberPagination).toHaveBeenCalledWith("limit", 50);
  });

  it("calls handleViewMember when view member button is clicked", async () => {
    customRender(mockedData);
    const menuButtons = screen.getAllByTestId("menu-branch");
    await userEvent.click(menuButtons[0]);
    const viewOption = await screen.findByText(/view member/i);
    await userEvent.click(viewOption);
    await waitFor(() => {
      expect(mockHandleViewMember).toHaveBeenCalled();
    });
  });

  it("calls Transfer member when transfer member button is clicked", async () => {
    customRender(mockedData);
    const menuButtons = screen.getAllByTestId("menu-branch");
    await userEvent.click(menuButtons[0]);
    const transferOption = await screen.findByText(/transfer member/i);
    await userEvent.click(transferOption);
    await waitFor(() => {
      expect(mockHandleTransferMember).toHaveBeenCalled();
    });
  });

  it("renders the teams pagination component with correct initial values", () => {
    customRender();
    const teamTabs = screen.getAllByRole("tab", { name: "Teams" });
    const teamsTab = teamTabs[0];
    userEvent.click(teamsTab);
    const paginationComponents = screen.getAllByTestId("pagination");
    expect(paginationComponents.length).toBeGreaterThan(0);
    const paginationComponent = paginationComponents[0];
    expect(paginationComponent).toBeInTheDocument();

    const limitSelector = within(paginationComponent).getByTestId("select-limit");
    expect(limitSelector).toHaveTextContent("20");

    const pageInfo = within(paginationComponent).getByText(/Items per page/i);
    expect(pageInfo).toBeInTheDocument();
  });

  it("calls handlePagination for teams when a new limit is selected", async () => {
    customRender();
    const teamTabs = screen.getAllByRole("tab", { name: "Teams" });
    const teamsTab = teamTabs[0];
    userEvent.click(teamsTab);

    const selectContainer = screen.getAllByTestId("select-limit");
    const selectLimit = selectContainer[0];
    expect(selectLimit).toBeInTheDocument();

    const selectButton = within(selectLimit).getByRole("combobox");
    await userEvent.click(selectButton);

    const options = await screen.findAllByText("50");
    const option = options[0];
    await userEvent.click(option);

    expect(mockHandleTeamPagination).toHaveBeenCalledWith("limit", 50);
  });
});
