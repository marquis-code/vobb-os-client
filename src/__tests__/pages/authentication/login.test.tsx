import { act } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { LoginUI } from "../../../modules";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../../../hooks", () => ({
  useMobile: () => ({ isMobile: false })
}));

// Mock ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("LoginUI Component", () => {
  const mockSubmit = jest.fn();
  const mockHandleGoogleSignin = jest.fn();

  const setup = () => {
    render(
      <LoginUI submit={mockSubmit} loading={false} handleGoogleSignin={mockHandleGoogleSignin} />
    );
  };

  it("renders the login form", () => {
    setup();

    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
    // expect(screen.getByLabelText("Email")).toBeInTheDocument();
    // expect(screen.getByLabelText("Password")).toBeInTheDocument();
    // expect(screen.getByText("Stay signed in for a week")).toBeInTheDocument();
    // expect(screen.getByText("Forgot password?")).toBeInTheDocument();
    // expect(screen.getByText("Sign in")).toBeInTheDocument();
    // expect(screen.getByText("Signin with Google")).toBeInTheDocument();
  });
});
