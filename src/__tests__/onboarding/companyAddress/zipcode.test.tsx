import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Zipcode } from "modules/onboarding/companyAddress/zipcode";

const mockSubmit = vi.fn();

describe("Zipcode Component", () => {
  const defaultProps = {
    initZipcode: { zipCode: "" },
    submit: mockSubmit,
    loading: false,
    postalCode: { format: "#####", regex: "^\\d{5}$" }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with initial props", () => {
    render(<Zipcode {...defaultProps} />);

    expect(screen.getByTestId("zipcode-input")).toBeInTheDocument();
    expect(screen.getByTestId("continue-btn")).toBeInTheDocument();
  });

  it("allows entering a zipcode", async () => {
    render(<Zipcode {...defaultProps} />);
    const zipcodeInput = screen.getByTestId("zipcode-input");

    await userEvent.type(zipcodeInput, "12345");

    expect(zipcodeInput).toHaveValue("12345");
  });

  it("submits the form with entered zipcode", async () => {
    render(<Zipcode {...defaultProps} />);

    await userEvent.type(screen.getByTestId("zipcode-input"), "12345");
    await userEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({ zipCode: "12345" });
    });
  });

  it("shows validation error if zipcode is required and not entered", async () => {
    render(<Zipcode {...defaultProps} />);
    const zipcodeInput = screen.getByTestId("zipcode-input");

    await userEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(zipcodeInput).toHaveAttribute("validatormessage", "Required");
    });
  });

  it("shows validation error if zipcode does not match the required format", async () => {
    render(<Zipcode {...defaultProps} />);

    const zipcodeInput = screen.getByTestId("zipcode-input");

    await userEvent.type(zipcodeInput, "1234");
    await userEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(zipcodeInput).toHaveAttribute(
        "validatormessage",
        "Enter a valid zip code with the format #####"
      );
    });
  });

  it("pre-fills the zipcode if provided in initZipcode", () => {
    const props = { ...defaultProps, initZipcode: { zipCode: "54321" } };
    render(<Zipcode {...props} />);

    expect(screen.getByTestId("zipcode-input")).toHaveValue("54321");
  });

  it("disables the continue button when loading is true", () => {
    const props = { ...defaultProps, loading: true };
    render(<Zipcode {...props} />);

    expect(screen.getByTestId("continue-btn")).toBeDisabled();
  });
});
