import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MembersUI } from "modules";
import { BrowserRouter } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";

const MemberTableMock = [
  {
    id: "728ed52a",
    name: "James Boe",
    email: "jason@gmail.com",
    teams: ["Finance", "Operations"],
    role: "Member",
    date: "---",
    lastActive: "---",
    status: "invited" as "invited",
    branch: ["Headquarters"],
    avatar: "",
    initial: "JB"
  },
  {
    id: "728ed52b",
    name: "Jason Mamoa",
    email: "jaso2n@gmail.com",
    teams: ["Finance", "HR"],
    role: "CEO",
    date: "12/12/2023",
    lastActive: "07/07/2024",
    status: "expired" as "expired",
    branch: ["Headquarters3"],
    avatar: "",
    initial: "JM"
  },
  {
    id: "728ed52c",
    name: "Mikel Tyrocket",
    email: "jason3@gmail.com",
    teams: ["IT", "Brands"],
    role: "Admin",
    date: "12/12/2023",
    lastActive: "07/07/2024",
    status: "active" as "active",
    branch: ["Headquarters4"],
    avatar: "",
    initial: "MT"
  },
  {
    id: "728ed52e",
    name: "John Bovi",
    email: "jason4@gmail.com",
    teams: ["Reserach", "Dev"],
    role: "Audit",
    date: "12/12/2023",
    lastActive: "07/07/2024",
    status: "suspended" as "suspended",
    branch: ["Headquarters5"],
    avatar: "",
    initial: "JB"
  }
];

// Mock components if needed
vi.mock("components", async () => {
  const actual = await vi.importActual("components");
  return {
    ...actual,
    SettingsPageTitle: ({ title }) => <h1>{title}</h1>,
    Filter: ({ filters, setFilter, attributes }) => (
      <div data-testid="filter">{/* Render the filters */}</div>
    ),
    Button: ({ onClick, children, ...props }) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
    MemberTable: ({ data }) => (
      <table data-testid="member-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Teams</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.teams.join(", ")}</td>
              <td>{member.role}</td>
              <td>{member.status}</td>
              <td>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button data-testid={`menu-${member.status}-${member.id}`}>Menu</button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {}} data-testid={`view-${member.id}`}>
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {}} data-testid={`resend-${member.id}`}>
                      Resend Invite
                    </DropdownMenuItem>
                    {/* other items */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
    Pagination: ({ handleChange, currentPage, totalPages }) => (
      <div>
        <button
          data-testid="prev-page"
          onClick={() => handleChange(currentPage - 1)}
          disabled={currentPage === 1}>
          Previous
        </button>
        <button
          data-testid="next-page"
          onClick={() => handleChange(currentPage + 1)}
          disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    ),
    LoadingSpinner: () => <div data-testid="loading">Loading...</div>
  };
});

describe("MembersUI", () => {
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
      metaData: { currentPage: 1, totalPages: 3, totalCount: 3, pageLimit: 20 }
    },
    handleParams: mockHandleParams
  };

  it("renders the MembersUI component and displays member data", () => {
    render(
      <BrowserRouter>
        <MembersUI
          handleInviteMember={mockHandleInviteMember}
          handleViewMembers={mockHandleViewMembers}
          handleViewMember={mockHandleViewMember}
          handleSuspension={mockHandleSuspension}
          handleCancelInvitation={mockHandleCancelInvitation}
          handleChangeRole={mockHandleChangeRole}
          handleResendInvitation={mockHandleResendInvitation}
        />
      </BrowserRouter>
    );

    // Check member table rendering
    const table = screen.getByTestId("member-table");
    expect(table).toBeInTheDocument();

    // Verify each member data is rendered
    MemberTableMock.forEach((member) => {
      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getByText(member.email)).toBeInTheDocument();
      expect(screen.getByText(member.teams.join(", "))).toBeInTheDocument();
      expect(screen.getByText(member.role)).toBeInTheDocument();
      expect(screen.getByText(member.status)).toBeInTheDocument();
    });
  });

  it("displays the loading spinner when data is being fetched", () => {
    render(
      <BrowserRouter>
        <MembersUI
          handleInviteMember={mockHandleInviteMember}
          handleViewMembers={{ ...mockHandleViewMembers, loading: true }}
          handleViewMember={mockHandleViewMember}
          handleSuspension={mockHandleSuspension}
          handleCancelInvitation={mockHandleCancelInvitation}
          handleChangeRole={mockHandleChangeRole}
          handleResendInvitation={mockHandleResendInvitation}
        />
      </BrowserRouter>
    );

    // Check Loading Spinner
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("handles pagination changes", () => {
    render(
      <BrowserRouter>
        <MembersUI
          handleInviteMember={mockHandleInviteMember}
          handleViewMembers={mockHandleViewMembers}
          handleViewMember={mockHandleViewMember}
          handleSuspension={mockHandleSuspension}
          handleCancelInvitation={mockHandleCancelInvitation}
          handleChangeRole={mockHandleChangeRole}
          handleResendInvitation={mockHandleResendInvitation}
        />
      </BrowserRouter>
    );

    // Click next page
    fireEvent.click(screen.getByTestId("next-page"));
    expect(mockHandleParams).toHaveBeenCalledWith("page", 2);

    // Click previous page
    fireEvent.click(screen.getByTestId("prev-page"));
    expect(mockHandleParams).toHaveBeenCalledWith("page", 2);
  });

  // it("calls the respective action handlers when action buttons are clicked", () => {
  //   render(
  //     <BrowserRouter>
  //       <MembersUI
  //         handleInviteMember={mockHandleInviteMember}
  //         handleViewMembers={mockHandleViewMembers}
  //         handleViewMember={mockHandleViewMember}
  //         handleSuspension={mockHandleSuspension}
  //         handleCancelInvitation={mockHandleCancelInvitation}
  //         handleChangeRole={mockHandleChangeRole}
  //         handleResendInvitation={mockHandleResendInvitation}
  //       />
  //     </BrowserRouter>
  //   );

  //   // Simulate actions on the first member
  //   fireEvent.click(screen.getByTestId(`view-${MemberTableMock[0].id}`));
  //   expect(mockHandleViewMember).toHaveBeenCalled();

  //   fireEvent.click(screen.getByTestId(`suspend-${MemberTableMock[0].id}`));
  //   expect(mockHandleSuspension).toHaveBeenCalled();

  //   fireEvent.click(screen.getByTestId(`cancel-${MemberTableMock[0].id}`));
  //   expect(mockHandleCancelInvitation).toHaveBeenCalled();

  //   fireEvent.click(screen.getByTestId(`change-role-${MemberTableMock[0].id}`));
  //   expect(mockHandleChangeRole).toHaveBeenCalled();

  //   fireEvent.click(screen.getByTestId(`resend-${MemberTableMock[0].id}`));
  //   expect(mockHandleResendInvitation).toHaveBeenCalled();
  // });

  it("calls handleResendInvitation when the resend invite button is clicked", () => {
    render(
      <BrowserRouter>
        <MembersUI
          handleInviteMember={mockHandleInviteMember}
          handleViewMembers={mockHandleViewMembers}
          handleViewMember={mockHandleViewMember}
          handleSuspension={mockHandleSuspension}
          handleCancelInvitation={mockHandleCancelInvitation}
          handleChangeRole={mockHandleChangeRole}
          handleResendInvitation={mockHandleResendInvitation}
        />
      </BrowserRouter>
    );

    // Click the Resend Invite button for the first member
    fireEvent.click(screen.getByTestId(`menu-invited-${MemberTableMock[0].id}`));

    // Assert that the mock function is called
    expect(mockHandleResendInvitation).toHaveBeenCalled();
  });
});
