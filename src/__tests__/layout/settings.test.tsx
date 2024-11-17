import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import { SideBar } from "layout/settings/sidebar";

// Mock useNavigate from react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

// Mock useModalContext
vi.mock("context", () => ({
  useModalContext: vi.fn()
}));

describe("SideBar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderSideBar = (active = "profile") => {
    render(
      <BrowserRouter>
        <SideBar sideBarWidth="250px" active={active} />
      </BrowserRouter>
    );
  };

  it("renders the sidebar with all main sections", () => {
    renderSideBar();
    const settingsHeader = screen.getByText("Settings");
    const accountTab = screen.getByText("Account");
    const workspaceTab = screen.getByText("Workspace");
    const automationTab = screen.getByText("Automation");
    const reportsTab = screen.getAllByText("Reports")[0];

    expect(settingsHeader).toBeInTheDocument();
    expect(accountTab).toBeInTheDocument();
    expect(workspaceTab).toBeInTheDocument();
    expect(automationTab).toBeInTheDocument();
    expect(reportsTab).toBeInTheDocument();
  });

  it("filters items based on search input", () => {
    renderSideBar();
    const searchInput = screen.getByPlaceholderText("search");

    fireEvent.change(searchInput, { target: { value: "Pro" } });
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.queryByText("Security")).not.toBeInTheDocument();
  });

  it("toggles the Account section when clicked", () => {
    renderSideBar();
    const accountHeader = screen.getByText("Account");
    const profileLink = screen.getByText("Profile");

    expect(profileLink).toBeInTheDocument();

    fireEvent.click(accountHeader);
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();

    fireEvent.click(accountHeader);
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("toggles the Workspace section when clicked", () => {
    renderSideBar();
    const workspaceHeader = screen.getByText("Workspace");
    const organizationLink = screen.getByText("Organization");

    expect(organizationLink).toBeInTheDocument();

    fireEvent.click(workspaceHeader);
    expect(screen.queryByText("Organization")).not.toBeInTheDocument();

    fireEvent.click(workspaceHeader);
    expect(screen.getByText("Organization")).toBeInTheDocument();
  });

  it("toggles the Reports section when clicked", () => {
    renderSideBar();
    const reportsHeader = screen.getAllByText("Reports")[0];
    const reportsLink = screen.getByTestId("Reports-link");

    expect(reportsLink).toBeInTheDocument();

    fireEvent.click(reportsHeader);
    expect(screen.queryByTestId("Reports-link")).not.toBeInTheDocument();

    fireEvent.click(reportsHeader);
    expect(screen.getByTestId("Reports-link")).toBeInTheDocument();
  });

  it("toggles the Automation section when clicked", () => {
    renderSideBar();
    const automationHeader = screen.getByText("Automation");
    const workflowsLink = screen.getByText("Workflows");

    expect(workflowsLink).toBeInTheDocument();

    fireEvent.click(automationHeader);
    expect(screen.queryByText("Workflows")).not.toBeInTheDocument();

    fireEvent.click(automationHeader);
    expect(screen.getByText("Workflows")).toBeInTheDocument();
  });

  it("highlights the active link", () => {
    renderSideBar("profile");
    const profileLink = screen.getByText("Profile");
    expect(profileLink).toHaveClass("bg-gray-100 font-semibold");
  });
});
