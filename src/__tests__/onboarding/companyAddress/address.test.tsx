import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CityAddress } from "modules/onboarding/companyAddress/address";

const mockSubmit = vi.fn();

describe("CityAddress Component", () => {
  const defaultProps = {
    initCityAddresses: { addressLine1: "", addressLine2: "", city: "" },
    submit: mockSubmit,
    loading: false
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with initial props", () => {
    render(<CityAddress {...defaultProps} />);

    expect(screen.getByTestId("address-input1")).toBeInTheDocument();
    expect(screen.getByTestId("address-input2")).toBeInTheDocument();
    expect(screen.getByTestId("city")).toBeInTheDocument();
    expect(screen.getByTestId("continue-btn")).toBeInTheDocument();
  });

  it("allows entering address and city information", async () => {
    render(<CityAddress {...defaultProps} />);

    await userEvent.type(screen.getByTestId("address-input1"), "123 Main St");
    await userEvent.type(screen.getByTestId("address-input2"), "Apt 4B");
    await userEvent.type(screen.getByTestId("city"), "New York");

    expect(screen.getByTestId("address-input1")).toHaveValue("123 Main St");
    expect(screen.getByTestId("address-input2")).toHaveValue("Apt 4B");
    expect(screen.getByTestId("city")).toHaveValue("New York");
  });

  it("submits the form with entered address and city information", async () => {
    render(<CityAddress {...defaultProps} />);

    await userEvent.type(screen.getByTestId("address-input1"), "123 Main St");
    await userEvent.type(screen.getByTestId("address-input2"), "Apt 4B");
    await userEvent.type(screen.getByTestId("city"), "New York");
    await userEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        addressLine1: "123 Main St",
        addressLine2: "Apt 4B",
        city: "New York"
      });
    });
  });

  it("shows validation errors if required fields are not filled", async () => {
    render(<CityAddress {...defaultProps} />);
    const addressInput1 = screen.getByTestId("address-input1");

    const cityInput = screen.getByTestId("city");

    await userEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(addressInput1).toHaveAttribute("validatormessage", "Required");
    });
    expect(cityInput).toHaveAttribute("validatormessage", "Required");
  });

  it("does not show validation error for optional addressLine2", async () => {
    render(<CityAddress {...defaultProps} />);
    const addressInput2 = screen.getByTestId("address-input2");

    await userEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(addressInput2).not.toHaveAttribute("validatormessage", "Required");
    });
  });

  it("pre-fills the address and city if provided in initCityAddresses", () => {
    const props = {
      ...defaultProps,
      initCityAddresses: {
        addressLine1: "456 Elm St",
        addressLine2: "Suite 7C",
        city: "Chicago"
      }
    };
    render(<CityAddress {...props} />);

    expect(screen.getByTestId("address-input1")).toHaveValue("456 Elm St");
    expect(screen.getByTestId("address-input2")).toHaveValue("Suite 7C");
    expect(screen.getByTestId("city")).toHaveValue("Chicago");
  });

  it("disables the continue button when loading is true", () => {
    const props = { ...defaultProps, loading: true };
    render(<CityAddress {...props} />);

    expect(screen.getByTestId("continue-btn")).toBeDisabled();
  });
});
