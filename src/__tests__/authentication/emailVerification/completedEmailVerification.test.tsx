import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CompletedEmailVerifyUI } from "modules";
import { Routes } from "router";

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();

vi.mock("components", () => ({
  Button: ({ children, onClick, className, size, variant }) => (
    <button
      className={className}
      onClick={onClick}
      data-testid="button"
      data-size={size}
      data-variant={variant}>
      {children}
    </button>
  )
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe("CompletedPasswordResetUI", () => {
  const defaultProps = {
    submit: vi.fn()
  };

  const renderComponent = (props = {}) =>
    render(
      <BrowserRouter>
        <CompletedEmailVerifyUI {...defaultProps} {...props} />
      </BrowserRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the logo", () => {
    renderComponent();
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render the heading with appropriate text", () => {
    renderComponent();
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Email verified");
  });

  it("should render the success message", () => {
    renderComponent();
    const message = screen.getByText("Great news! Your email is now verified.");
    expect(message).toBeInTheDocument();
  });

  it("should render the 'Continue' button", () => {
    renderComponent();
    const continueButton = screen.getByRole("button", { name: "Continue" });
    expect(continueButton).toBeInTheDocument();
  });

  it("should navigate to onboarding when 'Continue' button is clicked", () => {
    renderComponent();
    const continueButton = screen.getByRole("button", { name: "Continue" });
    fireEvent.click(continueButton);
    expect(mockNavigate).toHaveBeenCalledWith(Routes.onboarding_user_details);
  });
});
