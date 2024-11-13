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

    // Simulate typing into the search input
    fireEvent.change(searchInput, { target: { value: "Pro" } });
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.queryByText("Security")).not.toBeInTheDocument();
  });

  it("toggles the Account section when clicked", () => {
    renderSideBar();
    const accountHeader = screen.getByText("Account");
    const profileLink = screen.getByText("Profile");

    // Initially open
    expect(profileLink).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(accountHeader);
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();

    // Click to expand again
    fireEvent.click(accountHeader);
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("highlights the active link", () => {
    renderSideBar("profile");
    const profileLink = screen.getByText("Profile");
    expect(profileLink).toHaveClass("bg-gray-100 font-semibold");
  });
});
