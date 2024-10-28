import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BranchMemberTableMock, BranchTeamTableMock } from "lib";
import { OrgBranchUI } from "modules";
import { BrowserRouter } from "react-router-dom";

const mockHandleTransferMember = vi.fn();
const mockHandleViewMember = vi.fn();
const mockHandleMemberPagination = vi.fn();
const mockHandleTeamPagination = vi.fn();
const mockHandleMemberFilter = vi.fn();
const mockHandleInviteMember = vi.fn();
const mockAddExistingMembers = vi.fn();

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
  handleUpdateTeamsParams: mockHandleTeamPagination,
  handleUpdateMemberFilters: mockHandleMemberFilter,
  handleInviteMemberToBranch: mockHandleInviteMember,
  handleAddExistingMembersToBranch: mockAddExistingMembers
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
  handleUpdateTeamsParams: mockHandleTeamPagination,
  handleUpdateMemberFilters: mockHandleMemberFilter,
  handleInviteMemberToBranch: mockHandleInviteMember,
  handleAddExistingMembersToBranch: mockAddExistingMembers
};

describe("Branch UI tests", () => {
  const renderComponent = (props = {}) =>
    render(
      <BrowserRouter>
        <OrgBranchUI {...defaultProps} {...props} />{" "}
      </BrowserRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render with mocked data", async () => {
    renderComponent(mockedData);

    const mockedBranch = screen.getByRole("cell", { name: "Garnacho Derulo" });
    expect(mockedBranch).toBeInTheDocument();
  });

  it("should display the correct branch address", () => {
    renderComponent();
    const city = screen.getByTestId("branch-city");
    const province = screen.getByTestId("branch-province");
    const zipcode = screen.getByTestId("branch-zipcode");

    expect(city).toBeInTheDocument();
    expect(province).toBeInTheDocument();
    expect(zipcode).toBeInTheDocument();

    expect(city).toHaveTextContent("Lasgidi");
    expect(province).toHaveTextContent("lagos");
    expect(zipcode).toHaveTextContent("123456");
  });

  it("should render member and teams tabs", () => {
    renderComponent();

    const memberTab = screen.getByRole("tab", { name: /Members/i });
    const teamsTab = screen.getByRole("tab", { name: /Teams/i });

    expect(memberTab).toBeInTheDocument();
    expect(teamsTab).toBeInTheDocument();
  });

  it("renders the member tab tab as active by default, while teams is inactive", () => {
    renderComponent();

    const memberTab = screen.getByRole("tab", { name: /Members/i });
    const teamsTab = screen.getByRole("tab", { name: /Teams/i });

    expect(memberTab).toHaveAttribute("data-state", "active");
    expect(teamsTab).toHaveAttribute("data-state", "inactive");
  });

  it("renders the teams attributes tab as active when tab is clicked, while member is inactive", async () => {
    const user = userEvent.setup();
    renderComponent();

    const teamsTab = screen.getByRole("tab", { name: /Teams/i });
    const memberTab = screen.getByRole("tab", { name: /Members/i });

    await user.pointer({ keys: "[MouseLeft]", target: teamsTab });

    await waitFor(() => {
      expect(teamsTab).toHaveAttribute("data-state", "active");
    });
    expect(memberTab).toHaveAttribute("data-state", "inactive");
  });

  it("should check for filter button", () => {
    renderComponent();

    const filterButtons = screen.getAllByRole("combobox");
    expect(filterButtons.length).toBeGreaterThan(0);
    const filterButton = filterButtons[0];

    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toHaveTextContent(/filter/i);

    expect(filterButton).toHaveAttribute("aria-haspopup", "dialog");
    expect(filterButton).toHaveAttribute("role", "combobox");
  });

  it("updates filters when name attribute is selected", () => {
    renderComponent();

    const filterButtons = screen.getAllByRole("combobox");
    const filterButton = filterButtons[0];
    fireEvent.click(filterButton);

    const attributeToSelect = screen.getByRole("option", { name: "Name" });
    fireEvent.click(attributeToSelect);

    const nameFilters = screen.getAllByRole("combobox");
    const nameFilter = nameFilters[0];

    expect(nameFilter).toBeInTheDocument();
    expect(nameFilter).toHaveTextContent(/name/i);
  });

  it("removes a filter when delete button is clicked", () => {
    renderComponent();

    const filterButtons = screen.getAllByRole("combobox");
    const filterButton = filterButtons[0];
    fireEvent.click(filterButton);

    const attributesToSelect = screen.getAllByText(/name/i);
    const attributeToSelect = attributesToSelect[0];
    fireEvent.click(attributeToSelect);

    const filterMenuButtons = screen.getAllByRole("button");
    const deleteBtn = filterMenuButtons[1];
    fireEvent.click(deleteBtn);

    const deleteButton = screen.getByRole("button", { name: /delete condition/i });
    fireEvent.click(deleteButton);

    const nameFilters = screen.getAllByRole("combobox");
    const nameFilter = nameFilters[0];

    expect(nameFilter).toBeInTheDocument();
    expect(nameFilter).not.toHaveTextContent(/name/i);
  });

  it("should show loading spinner when loading is true", () => {
    renderComponent({ ...defaultProps, loadingMembers: true });

    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
  });

  it("should check for Add member button", () => {
    renderComponent();

    const addMemberBtn = screen.getByTestId("add-member");
    expect(addMemberBtn).toBeInTheDocument();
    expect(addMemberBtn).toHaveTextContent(/add member/i);
  });

  it("should display table heads for members", async () => {
    const user = userEvent.setup();
    renderComponent();

    const memberTab = screen.getByRole("tab", { name: "Members" });
    await user.pointer({ keys: "[MouseLeft]", target: memberTab });

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

  it("should display 'no results' message when there are no members", async () => {
    const user = userEvent.setup();
    renderComponent({
      branchMembers: {
        membersArray: [],
        membersMetaData: {
          currentPage: 1,
          totalCount: 0,
          totalPages: 0,
          pageLimit: 20
        }
      }
    });

    const memberTabs = screen.getAllByRole("tab", { name: "Members" });
    const memberTab = memberTabs[0];
    await user.pointer({ keys: "[MouseLeft]", target: memberTab });

    const noResultsMessageCells = screen.getAllByRole("cell", { name: /no results/i });
    const noResultsMessageCell = noResultsMessageCells[0];

    expect(noResultsMessageCell).toBeInTheDocument();
  });

  it("should check for Add Team button", async () => {
    const user = userEvent.setup();
    renderComponent();

    const teamsTab = screen.getByRole("tab", { name: /teams/i });

    await user.pointer({ keys: "[MouseLeft]", target: teamsTab });

    const addTeamBtn = screen.getByTestId("add-team");
    expect(addTeamBtn).toBeInTheDocument();
    expect(addTeamBtn).toHaveTextContent(/new team/i);
  });

  it("should display table and table heads for teams", async () => {
    const user = userEvent.setup();
    renderComponent();

    const teamsTab = screen.getByRole("tab", { name: "Teams" });
    await user.pointer({ keys: "[MouseLeft]", target: teamsTab });

    const table = screen.getByRole("table");
    const nameColumn = screen.getByRole("columnheader", { name: /name/i });
    const managerColumn = screen.getByRole("columnheader", { name: /team manager/i });
    const leadColumn = screen.getByRole("columnheader", { name: /team lead/i });
    const memebersColumn = screen.getByRole("columnheader", { name: /members/i });
    const dateColumn = screen.getByRole("columnheader", { name: /date added/i });

    expect(table).toBeInTheDocument();
    expect(nameColumn).toBeInTheDocument();
    expect(managerColumn).toBeInTheDocument();
    expect(leadColumn).toBeInTheDocument();
    expect(memebersColumn).toBeInTheDocument();
    expect(dateColumn).toBeInTheDocument();
  });

  it("should display 'no results' message when there are no teams", async () => {
    const user = userEvent.setup();
    renderComponent({
      branchTeams: {
        teamsArray: [],
        teamsMetaData: {
          currentPage: 1,
          totalCount: 0,
          totalPages: 0,
          pageLimit: 20
        }
      }
    });

    const teamsTabs = screen.getAllByRole("tab", { name: "Teams" });
    const teamsTab = teamsTabs[0];
    await user.pointer({ keys: "[MouseLeft]", target: teamsTab });

    const noResultsMessageCells = screen.getAllByRole("cell", { name: /no results/i });
    const noResultsMessageCell = noResultsMessageCells[0];

    expect(noResultsMessageCell).toBeInTheDocument();
  });

  it("renders the members pagination component with correct initial values", async () => {
    const user = userEvent.setup();
    renderComponent();

    const memberTabs = screen.getAllByRole("tab", { name: "Members" });
    const memberTab = memberTabs[0];

    await user.pointer({ keys: "[MouseLeft]", target: memberTab });
    const paginationComponents = screen.getAllByTestId("pagination");
    const paginationComponent = paginationComponents[0];
    const limitSelector = within(paginationComponent).getByTestId("select-limit");
    const pageInfo = within(paginationComponent).getByText(/Items per page/i);

    expect(paginationComponent).toBeInTheDocument();
    expect(limitSelector).toHaveTextContent("20");
    expect(pageInfo).toBeInTheDocument();
  });

  it("calls handlePagination for members when a new limit is selected", async () => {
    renderComponent();

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
    renderComponent(mockedData);

    const menuButtons = screen.getAllByRole("button", { name: "Open menu" });
    await userEvent.click(menuButtons[0]);
    const viewOption = await screen.findByText(/view member/i);
    await userEvent.click(viewOption);
    await waitFor(() => {
      expect(mockHandleViewMember).toHaveBeenCalled();
    });
  });

  it("calls Transfer member when transfer member button is clicked", async () => {
    renderComponent(mockedData);

    const menuButtons = screen.getAllByRole("button", { name: "Open menu" });
    await userEvent.click(menuButtons[0]);

    const transferOption = await screen.findByText(/transfer to new branch/i);
    await userEvent.click(transferOption);

    await waitFor(() => {
      expect(mockHandleTransferMember).toHaveBeenCalled();
    });
  });

  it("renders the teams pagination component with correct initial values", async () => {
    const user = userEvent.setup();
    renderComponent();

    const teamTabs = screen.getAllByRole("tab", { name: "Teams" });
    const teamsTab = teamTabs[0];
    await user.pointer({ keys: "[MouseLeft]", target: teamsTab });

    const paginationComponents = screen.getAllByTestId("pagination");
    const paginationComponent = paginationComponents[0];
    const limitSelector = within(paginationComponent).getByTestId("select-limit");
    const pageInfo = within(paginationComponent).getByText(/Items per page/i);

    expect(paginationComponent).toBeInTheDocument();
    expect(limitSelector).toHaveTextContent("20");
    expect(pageInfo).toBeInTheDocument();
  });

  it("calls handlePagination for teams when a new limit is selected", async () => {
    const user = userEvent.setup();
    renderComponent();

    const teamTabs = screen.getAllByRole("tab", { name: "Teams" });
    const teamsTab = teamTabs[0];
    await user.pointer({ keys: "[MouseLeft]", target: teamsTab });

    const selectContainer = screen.getAllByTestId("select-limit");
    const selectLimit = selectContainer[0];
    const selectButton = within(selectLimit).getByRole("combobox");

    expect(selectLimit).toBeInTheDocument();

    await userEvent.click(selectButton);
    const options = await screen.findAllByText("50");
    const option = options[0];
    await userEvent.click(option);

    expect(mockHandleTeamPagination).toHaveBeenCalledWith("limit", 50);
  });

  it("calls handleInviteMemberToBranch when button option is clicked", async () => {
    renderComponent();

    const addMemberBtn = screen.getByTestId("add-member");
    await userEvent.click(addMemberBtn);
    const inviteOption = await screen.findByText(/new team member/i);
    await userEvent.click(inviteOption);
    await waitFor(() => {
      expect(defaultProps.handleInviteMemberToBranch).toHaveBeenCalled();
    });
  });

  it("calls handleAddExistingMembersToBranch when button option is clicked", async () => {
    renderComponent();

    const addMemberBtn = screen.getByTestId("add-member");
    await userEvent.click(addMemberBtn);
    const existingOption = await screen.findByText(/existing member/i);
    await userEvent.click(existingOption);
    await waitFor(() => {
      expect(defaultProps.handleAddExistingMembersToBranch).toHaveBeenCalled();
    });
  });
});
