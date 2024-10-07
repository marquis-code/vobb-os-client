import React, { act } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { VerifyEmailUI } from "modules";
import { Routes } from "router";
import userEvent from "@testing-library/user-event";

// Mock useNavigate and useSearchParams from react-router-dom
const mockNavigate = vi.fn();
const mockUseSearchParams = vi.fn(() => [{ get: vi.fn(() => "test%40email.com") }]);

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => mockUseSearchParams()
  };
});

vi.mock("components", () => ({
  Button: ({ children, onClick, "data-testid": testId, disabled }) => (
    <button data-testid={testId} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
  CustomInputOTP: ({ value, onChange }) => (
    <input data-testid="otp-input" value={value} onChange={(e) => onChange(e.target.value)} />
  )
}));

describe("VerifyEmailUI", () => {
  const defaultProps = {
    handleVerify: vi.fn(),
    handleResend: vi.fn(),
    loading: false
  };

  const renderComponent = (props = {}) =>
    render(
      <BrowserRouter>
        <VerifyEmailUI {...defaultProps} {...props} />
      </BrowserRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("should render the email verification icon", () => {
    renderComponent();
    const icon = screen.getByTestId("logo");
    expect(icon).toBeInTheDocument();
  });

  it("should display the correct heading", () => {
    renderComponent();
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Check your email");
  });

  it("should display the subtitle with email", () => {
    renderComponent();
    const subtitle = screen.getByTestId("subtitle");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent("We sent a verification code to test@email.com");
  });

  it("should render the OTP input field", () => {
    renderComponent();
    const otpInput = screen.getByTestId("otp-input");
    expect(otpInput).toBeInTheDocument();
  });

  it("should update OTP input field on user input", () => {
    renderComponent();
    const otpInput = screen.getByTestId("otp-input");
    fireEvent.change(otpInput, { target: { value: "123456" } });
    expect(otpInput).toHaveValue("123456");
  });

  it("should disable the continue button when OTP length is not equal to 6", () => {
    renderComponent();

    const otpInput = screen.getByTestId("otp-input");
    const continueButton = screen.getByRole("button", { name: /continue/i });

    expect(continueButton).toBeDisabled();

    fireEvent.change(otpInput, { target: { value: "123" } });
    expect(continueButton).toBeDisabled();

    fireEvent.change(otpInput, { target: { value: "123456" } });
    expect(continueButton).toBeEnabled();
  });

  it("should enable the 'Continue' button when OTP is 6 characters", () => {
    renderComponent();

    const otpInput = screen.getByTestId("otp-input");
    const continueButton = screen.getByRole("button", { name: /continue/i });

    fireEvent.change(otpInput, { target: { value: "123456" } });
    expect(continueButton).toBeEnabled();
  });

  it("should submit the OTP when the form is submitted with a valid OTP", async () => {
    renderComponent();

    const otpInput = screen.getByTestId("otp-input");
    fireEvent.change(otpInput, { target: { value: "123456" } }); // Valid OTP

    const continueButton = screen.getByRole("button", { name: /continue/i });
    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(defaultProps.handleVerify).toHaveBeenCalledWith({
        token: 123456
      });
    });
  });

  it("should display the countdown for resend button", () => {
    renderComponent();
    const resendButton = screen.getByTestId("resend-btn");
    expect(resendButton).toHaveTextContent("30");
    //Simulate countdown effect (this would require mocking the timer in a more advanced case)
  });

  it("should call handleResend when the resend button is clicked", async () => {
    renderComponent();
    const resendButton = screen.getByTestId("resend-btn");

    expect(resendButton).toBeDisabled();
    await act(() => vi.runAllTimers());
    expect(resendButton).toBeEnabled();
  });

  it("should call handleResend when resend button is clicked", async () => {
    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms)
    });
    renderComponent();
    const resendButton = screen.getByTestId("resend-btn");

    await act(() => vi.runAllTimers());

    user.click(resendButton);

    expect(defaultProps.handleResend).toHaveBeenCalled();
  });

  it("back to sign up button should be enabled", () => {
    renderComponent();
    const signupLink = screen.getByRole("button", { name: "Back to sign up" });
    expect(signupLink).toBeEnabled();
  });
});
