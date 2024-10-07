import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CompletedPasswordResetUI } from "modules";
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
        <CompletedPasswordResetUI {...defaultProps} {...props} />
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
    expect(heading).toHaveTextContent("Password reset");
  });

  it("should render the success message", () => {
    renderComponent();
    const message = screen.getByText(
      "Your password has been successfully reset. Click below to log in magically."
    );
    expect(message).toBeInTheDocument();
  });

  it("should render the 'Continue' button", () => {
    renderComponent();
    const continueButton = screen.getByRole("button", { name: "Continue" });
    expect(continueButton).toBeInTheDocument();
  });

  it("should navigate to login when 'Continue' button is clicked", () => {
    renderComponent();
    const continueButton = screen.getByRole("button", { name: "Continue" });
    fireEvent.click(continueButton);
    expect(mockNavigate).toHaveBeenCalledWith(Routes.login);
  });

  it("should render the 'Back to log in' button", () => {
    renderComponent();
    const backButton = screen.getByRole("button", { name: "Back to log in" });
    expect(backButton).toBeInTheDocument();
  });

  it("should navigate to login when 'Back to log in' button is clicked", () => {
    renderComponent();
    const backButton = screen.getByRole("button", { name: "Back to log in" });
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(Routes.login);
  });
});
