import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Province } from "modules/onboarding/companyAddress/province";

const mockSubmit = vi.fn();

describe("Province Component", () => {
  const defaultProps = {
    initState: { state: "" },
    submit: mockSubmit,
    loading: false
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with initial props", () => {
    render(<Province {...defaultProps} />);

    expect(screen.getByTestId("province-input")).toBeInTheDocument();
    expect(screen.getByTestId("continue-btn")).toBeInTheDocument();
  });

  it("allows entering a province/state name", async () => {
    render(<Province {...defaultProps} />);

    await userEvent.type(screen.getByTestId("province-input"), "California");

    expect(screen.getByTestId("province-input")).toHaveValue("California");
  });

  it("submits the form with entered province/state name", async () => {
    render(<Province {...defaultProps} />);

    await userEvent.type(screen.getByTestId("province-input"), "California");
    await userEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({ state: "California" });
    });
  });

  it("shows validation error if province/state is required and not entered", async () => {
    render(<Province {...defaultProps} />);

    const provinceInput = screen.getByTestId("province-input");

    await userEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(provinceInput).toHaveAttribute("validatormessage", "Required");
    });
  });

  it("pre-fills the province/state if provided in initState", () => {
    const props = { ...defaultProps, initState: { state: "New York" } };
    render(<Province {...props} />);

    expect(screen.getByTestId("province-input")).toHaveValue("New York");
  });

  it("disables the continue button when loading is true", () => {
    const props = { ...defaultProps, loading: true };
    render(<Province {...props} />);

    expect(screen.getByTestId("continue-btn")).toBeDisabled();
  });
});
