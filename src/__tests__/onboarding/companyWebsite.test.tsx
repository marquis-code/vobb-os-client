import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CompanyWebsiteUI } from "modules";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "router";
import { vi } from "vitest";

// Mocking the dependencies
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});
vi.mock("assets", async () => {
  const originalModule = await vi.importActual<any>("assets");
  return {
    ...originalModule,
    WeblinkIcon: vi.fn(({ "data-testid": testId }) => <div data-testid={testId}>Icon</div>)
  };
});

describe("Company website Component", () => {
  const mockSubmit = vi.fn();
  const initialProps = {
    initData: { website: "" },
    submit: mockSubmit,
    loading: false
  };

  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <CompanyWebsiteUI {...initialProps} {...props} />{" "}
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("renders the icon", () => {
    renderComponent();
    const icon = screen.getByTestId("logo");

    expect(icon).toBeInTheDocument();
  });

  it("renders the heading", () => {
    renderComponent();

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Company Website");
  });

  it("renders the form correctly", () => {
    renderComponent();
    expect(screen.getByTestId("website-input")).toBeInTheDocument();
    expect(screen.getByTestId("continue-btn")).toBeInTheDocument();
    expect(screen.getByTestId("skip-btn")).toBeInTheDocument();
    expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();
  });

  it("renders Continue button as enabled", () => {
    renderComponent();

    const continueBtn = screen.getByRole("button", { name: "Continue" });

    expect(continueBtn).toBeEnabled();
  });

  it("renders skip button as enabled", () => {
    renderComponent();

    const skipBtn = screen.getByRole("button", { name: "Skip" });

    expect(skipBtn).toBeEnabled();
  });

  it("shows validation error when an invalid URL is entered", async () => {
    renderComponent();

    fireEvent.change(screen.getByTestId("website-input"), { target: { value: "invalid-url" } });
    fireEvent.click(screen.getByTestId("continue-btn"));

    expect(screen.getByTestId("website-input")).toHaveValue("invalid-url");
    expect(await screen.findByText("Enter a valid URL")).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    renderComponent();

    fireEvent.change(screen.getByTestId("website-input"), {
      target: { value: "https://test.com" }
    });
    fireEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({ website: "https://test.com" });
    });
  });

  it("navigates to the next page when Skip button is clicked", () => {
    render(<CompanyWebsiteUI initData={{ website: "" }} submit={mockSubmit} loading={false} />);

    fireEvent.click(screen.getByTestId("skip-btn"));

    expect(mockNavigate).toHaveBeenCalledWith(Routes.onboarding_operating_address);
  });

  it("navigates to company details when back arrow is clicked", () => {
    render(<CompanyWebsiteUI initData={{ website: "" }} submit={mockSubmit} loading={false} />);

    fireEvent.click(screen.getByTestId("arrow-icon"));

    expect(mockNavigate).toHaveBeenCalledWith(Routes.onboarding_company_details);
  });
});
