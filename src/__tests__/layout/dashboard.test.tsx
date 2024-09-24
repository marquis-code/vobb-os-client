import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useMobile, useLogout } from "hooks";
import { useModalContext, useUserContext } from "context";
import { BrowserRouter } from "react-router-dom";
import { DashboardLayout } from "layout";

vi.mock("hooks", () => ({
  useMobile: vi.fn(),
  useLogout: vi.fn()
}));

vi.mock("context", () => ({
  useModalContext: vi.fn(),
  useUserContext: vi.fn()
}));

vi.mock("layout/dashboard/navbar", () => ({
  NavBar: vi.fn(({ title }) => <nav data-testid="mocked-navbar">{title}</nav>)
}));

vi.mock("layout/dashboard/sidebar", () => ({
  SideBar: vi.fn(() => <aside data-testid="mocked-sidebar">Mocked SideBar</aside>)
}));

// Mock the modal components
vi.mock("pages/organization/branches/addBranch", () => ({
  AddBranch: vi.fn(() => <div data-testid="mocked-add-branch">Mocked Add Branch</div>)
}));

vi.mock("pages/organization/teams/addTeam", () => ({
  AddTeam: vi.fn(() => <div data-testid="mocked-add-team">Mocked Add Team</div>)
}));

vi.mock("pages/organization/members/inviteMember", () => ({
  InviteMember: vi.fn(() => <div data-testid="mocked-invite-member">Mocked Invite Member</div>)
}));

vi.mock("components", () => ({
  UnsupportedScreenSize: vi.fn(() => (
    <div data-testid="mocked-unsupported-screen">Mocked Unsupported Screen</div>
  )),
  UpdateJobTitleModal: vi.fn(() => (
    <div data-testid="mocked-update-job-title">Mocked Update Job Title</div>
  )),
  Button: vi.fn(() => <button data-testid="mocked-button">Mocked Button</button>)
}));

describe("DashboardLayout", () => {
  const mockChild = <div data-testid="child-component">Child Component</div>;
  const mockTitle = "Dashboard Title";

  const mockLogout = vi.fn();
  const mockSetAddBranch = vi.fn();
  const mockSetAddTeam = vi.fn();
  const mockSetInviteMember = vi.fn();
  const mockSetUpdateJobTitle = vi.fn();

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <DashboardLayout title={mockTitle}>{mockChild}</DashboardLayout>
      </BrowserRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
    (useMobile as jest.Mock).mockReturnValue({ isMobile: false });
    (useLogout as jest.Mock).mockReturnValue({ logout: mockLogout });
    (useModalContext as jest.Mock).mockReturnValue({
      addBranch: false,
      setAddBranch: mockSetAddBranch,
      addTeam: false,
      setAddTeam: mockSetAddTeam,
      inviteMember: false,
      setInviteMember: mockSetInviteMember,
      updateJobTitle: false,
      setUpdateJobTitle: mockSetUpdateJobTitle
    });
    (useUserContext as jest.Mock).mockReturnValue({
      userDetails: { role: "User", jobTitle: "Developer", firstName: "John", lastName: "Doe" }
    });
  });

  it("renders the desktop layout when not mobile", () => {
    renderComponent();
    expect(screen.getByTestId("child-component")).toBeInTheDocument();
    expect(screen.getByTestId("mocked-navbar")).toBeInTheDocument();
    expect(screen.getByTestId("mocked-sidebar")).toBeInTheDocument();
  });

  it("renders UnsupportedScreenSize component on mobile", () => {
    (useMobile as jest.Mock).mockReturnValue({ isMobile: true });
    renderComponent();
    expect(screen.getByTestId("mocked-unsupported-screen")).toBeInTheDocument();
  });

  it("renders modals when their respective states are true", () => {
    (useModalContext as jest.Mock).mockReturnValue({
      addBranch: true,
      setAddBranch: mockSetAddBranch,
      addTeam: true,
      setAddTeam: mockSetAddTeam,
      inviteMember: true,
      setInviteMember: mockSetInviteMember,
      updateJobTitle: false,
      setUpdateJobTitle: mockSetUpdateJobTitle
    });
    renderComponent();
    expect(screen.getByTestId("mocked-add-branch")).toBeInTheDocument();
    expect(screen.getByTestId("mocked-add-team")).toBeInTheDocument();
    expect(screen.getByTestId("mocked-invite-member")).toBeInTheDocument();
  });

  it("renders UpdateJobTitleModal for Super Admin without job title", async () => {
    (useUserContext as jest.Mock).mockReturnValue({
      userDetails: { role: "Super Admin", jobTitle: null, firstName: "John", lastName: "Doe" }
    });
    (useModalContext as jest.Mock).mockReturnValue({
      updateJobTitle: true,
      setUpdateJobTitle: mockSetUpdateJobTitle
    });
    renderComponent();
    await waitFor(() => {
      expect(screen.getByTestId("mocked-update-job-title")).toBeInTheDocument();
    });
  });
});
