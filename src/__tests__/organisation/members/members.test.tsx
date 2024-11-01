import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemberTableMock } from "lib";
import { MembersUI } from "modules";
import { BrowserRouter } from "react-router-dom";

const mockHandleInviteMember = vi.fn();
const mockHandleParams = vi.fn();
const mockHandleViewMember = vi.fn();
const mockHandleSuspension = vi.fn();
const mockHandleCancelInvitation = vi.fn();
const mockHandleChangeRole = vi.fn();
const mockHandleResendInvitation = vi.fn();

const mockHandleViewMembers = {
  loading: false,
  orgMembersData: {
    membersArray: MemberTableMock,
    metaData: {
      currentPage: 1,
      totalCount: 50,
      totalPages: 5,
      pageLimit: 20
    }
  },
  handleParams: mockHandleParams
};

const defaultProps = {
  handleViewMembers: {
    loading: false,
    orgMembersData: {
      membersArray: [],
      metaData: {
        currentPage: 1,
        totalCount: 50,
        totalPages: 5,
        pageLimit: 20
      }
    },
    handleParams: mockHandleParams
  },
  handleInviteMember: mockHandleInviteMember,
  handleViewMember: mockHandleViewMember,
  handleSuspension: mockHandleSuspension,
  handleCancelInvitation: mockHandleCancelInvitation,
  handleChangeRole: mockHandleChangeRole,
  handleResendInvitation: mockHandleResendInvitation
};

const mockedData = {
  handleViewMembers: mockHandleViewMembers,
  handleInviteMember: mockHandleInviteMember,
  handleViewMember: mockHandleViewMember,
  handleSuspension: mockHandleSuspension,
  handleCancelInvitation: mockHandleCancelInvitation,
  handleChangeRole: mockHandleChangeRole,
  handleResendInvitation: mockHandleResendInvitation
};

describe("Members UI tests", () => {
  const renderComponent = (props = {}) =>
    render(
      <BrowserRouter>
        <MembersUI {...defaultProps} {...props} />
      </BrowserRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render with mocked data", () => {
    renderComponent(mockedData);

    const mockedMember = screen.getByText("Jason Mamoa");
    expect(mockedMember).toBeInTheDocument();
  });

  it("should check for heading content", () => {
    renderComponent();

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/members/i);
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

  it("should check for invite member button", () => {
    renderComponent();

    const addTeamBtn = screen.getByTestId("invite-member");
    expect(addTeamBtn).toBeInTheDocument();
    expect(addTeamBtn).toHaveTextContent(/invite member/i);
  });

  it("should display table and table heads", () => {
    renderComponent();

    const table = screen.getByRole("table");
    const nameColumn = screen.getByRole("columnheader", { name: /name/i });
    const emailColumn = screen.getByRole("columnheader", { name: /email/i });
    const branchesColumn = screen.getByRole("columnheader", { name: /branches/i });
    const teamsColumn = screen.getByRole("columnheader", { name: /teams/i });
    const roleColumn = screen.getByRole("columnheader", { name: /role/i });
    const dateColumn = screen.getByRole("columnheader", { name: /date/i });
    const lastActiveColumn = screen.getByRole("columnheader", { name: /last active/i });
    const statusColumn = screen.getByRole("columnheader", { name: /status/i });

    expect(table).toBeInTheDocument();
    expect(nameColumn).toBeInTheDocument();
    expect(emailColumn).toBeInTheDocument();
    expect(branchesColumn).toBeInTheDocument();
    expect(teamsColumn).toBeInTheDocument();
    expect(roleColumn).toBeInTheDocument();
    expect(dateColumn).toBeInTheDocument();
    expect(lastActiveColumn).toBeInTheDocument();
    expect(statusColumn).toBeInTheDocument();
  });

  it("should show loading spinner when loading is true", () => {
    const updatedProps = {
      ...defaultProps,
      handleViewMembers: {
        ...defaultProps.handleViewMembers,
        loading: true
      }
    };

    renderComponent(updatedProps);
    renderComponent();

    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
  });

  it("should display cell with 'no results' when there are no teams", () => {
    renderComponent();
    const resultCell = screen.getByRole("cell", { name: /no results/i });
    expect(resultCell).toBeInTheDocument();
  });

  it("renders the pagination component with correct initial values", () => {
    renderComponent();
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
    renderComponent();

    const selectContainer = screen.getAllByTestId("select-limit");
    const selectLimit = selectContainer[0];
    expect(selectLimit).toBeInTheDocument();

    const selectButton = within(selectLimit).getByRole("combobox");
    await userEvent.click(selectButton);

    const options = await screen.findAllByText("50");
    const option = options[0];
    await userEvent.click(option);

    expect(mockHandleViewMembers.handleParams).toHaveBeenCalledWith("limit", 50);
  });

  it("calls handleInviteMember when invite member button is clicked", () => {
    renderComponent(mockedData);
    const inviteMemberBtns = screen.getAllByTestId("invite-member");
    const inviteMemberBtn = inviteMemberBtns[0];
    expect(inviteMemberBtn).toBeInTheDocument();
    fireEvent.click(inviteMemberBtn);
    expect(mockHandleInviteMember).toHaveBeenCalled();
  });

  it("calls handleViewMember when view member button is clicked", async () => {
    renderComponent(mockedData);
    const menuButtons = screen.getAllByTestId("menu-activeUser");
    await userEvent.click(menuButtons[0]);
    const viewOption = await screen.findByText(/view member/i);
    await userEvent.click(viewOption);
    await waitFor(() => {
      expect(mockHandleViewMember).toHaveBeenCalled();
    });
  });

  it("displays 'suspend member' when the user is not suspended", async () => {
    renderComponent(mockedData);
    const menuButtons = screen.getAllByTestId("menu-activeUser");
    await userEvent.click(menuButtons[0]);

    const suspendOption = await screen.findByText(/suspend member/i);
    const unsuspendOption = screen.queryByText(/undo suspension/i);

    expect(unsuspendOption).not.toBeInTheDocument();

    await userEvent.click(suspendOption);
    await waitFor(() => {
      expect(mockHandleSuspension).toHaveBeenCalled();
    });
  });

  it("displays 'undo suspension' when the user is suspended", async () => {
    renderComponent(mockedData);
    const menuButtons = screen.getAllByTestId("menu-suspendedUser");
    await userEvent.click(menuButtons[0]);

    const unsuspendOption = await screen.findByText(/undo suspension/i);
    const suspendOption = screen.queryByText(/suspend member/i);

    expect(suspendOption).not.toBeInTheDocument();

    await userEvent.click(unsuspendOption);
    await waitFor(() => {
      expect(mockHandleSuspension).toHaveBeenCalled();
    });
  });

  it("calls handleChangeRole when change role for member button is clicked", async () => {
    renderComponent(mockedData);
    const menuButtons = screen.getAllByTestId("menu-activeUser");
    await userEvent.click(menuButtons[0]);
    const changeRoleOption = await screen.findByText(/change role/i);
    await userEvent.click(changeRoleOption);
    await waitFor(() => {
      expect(mockHandleChangeRole).toHaveBeenCalled();
    });
  });

  it("calls handleResendInvitation when resend invite button is clicked", async () => {
    renderComponent(mockedData);
    const menuButtons = screen.getAllByTestId("menu-inactiveUser");
    await userEvent.click(menuButtons[0]);
    const resendOption = await screen.findByText(/resend invitation/i);
    await userEvent.click(resendOption);
    await waitFor(() => {
      expect(mockHandleResendInvitation).toHaveBeenCalled();
    });
  });

  it("calls handleCancelInvitation when cancel invite button is clicked", async () => {
    renderComponent(mockedData);
    const menuButtons = screen.getAllByTestId("menu-inactiveUser");
    await userEvent.click(menuButtons[0]);
    const cancelOption = await screen.findByText(/cancel invitation/i);
    await userEvent.click(cancelOption);
    await waitFor(() => {
      expect(mockHandleCancelInvitation).toHaveBeenCalled();
    });
  });
});
