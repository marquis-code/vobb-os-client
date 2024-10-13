import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { VerifyPasswordUI } from "modules";

// Mock the components
vi.mock("components", () => ({
  CustomInputOTP: ({ value, onChange }) => (
    <input data-testid="otp-input" value={value} onChange={(e) => onChange(e.target.value)} />
  ),
  Button: ({ children, onClick, "data-testid": testId, disabled }) => (
    <button data-testid={testId} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}));

describe("VerifyPasswordUI", () => {
  const defaultProps = {
    submit: vi.fn(),
    handleResend: vi.fn(),
    loading: false
  };

  const renderComponent = (props = {}) =>
    render(
      <BrowserRouter>
        <VerifyPasswordUI {...defaultProps} {...props} />
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
  it("should have empty OTP input on load", () => {
    renderComponent();
    const otpInput = screen.getByTestId("otp-input");
    expect(otpInput).toHaveValue("");
  });

  it("should disable the resend button initially", () => {
    renderComponent();
    const resendButton = screen.getByTestId("resend-btn");
    expect(resendButton).toBeDisabled();
  });

  it("should disable buttons when loading is true", () => {
    renderComponent({ loading: true });
    const continueButton = screen.getByRole("button", { name: /continue/i });
    const resendButton = screen.getByTestId("resend-btn");

    expect(continueButton).toBeDisabled();
    expect(resendButton).toBeDisabled();
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

  it("should submit the OTP when the form is submitted with a valid OTP", async () => {
    renderComponent();

    const otpInput = screen.getByTestId("otp-input");
    fireEvent.change(otpInput, { target: { value: "123456" } }); // Valid OTP

    const continueButton = screen.getByRole("button", { name: /continue/i });
    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(defaultProps.submit).toHaveBeenCalledWith({
        otp: "123456",
        token: null
      });
    });
  });

  it("should have sign in button to sign-in page", () => {
    renderComponent();
    const signupLink = screen.getByRole("button", { name: "Back to log in" });
    expect(signupLink).toBeEnabled();
  });
});
