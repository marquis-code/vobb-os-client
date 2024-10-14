import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CompletedOnboardingUI } from "modules";

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

vi.mock("assets", async () => {
  const originalModule = await vi.importActual<any>("assets");
  return {
    ...originalModule,
    Check: vi.fn(({ "data-testid": testId }) => <div data-testid={testId}>Icon</div>)
  };
});

describe("CompletedOnboardingUI", () => {
  const defaultProps = {
    submit: vi.fn()
  };

  const renderComponent = (props = {}) =>
    render(
      <BrowserRouter>
        <CompletedOnboardingUI {...defaultProps} {...props} />
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
    expect(heading).toHaveTextContent("All done, yay!");
  });

  it("should render the success message", () => {
    renderComponent();
    const message = screen.getByText("You've officially set sail with us.");
    expect(message).toBeInTheDocument();
  });

  it("should render the 'Continue' button", () => {
    renderComponent();
    const continueButton = screen.getByRole("button", { name: "Continue" });

    expect(continueButton).toBeInTheDocument();
    expect(continueButton).toBeEnabled();
  });

  it("should call submit function when 'Continue' button is clicked", () => {
    renderComponent();
    const continueButton = screen.getByRole("button", { name: "Continue" });
    fireEvent.click(continueButton);
    expect(defaultProps.submit).toHaveBeenCalled();
  });
});
