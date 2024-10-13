import { Label } from "@radix-ui/react-dropdown-menu";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CompanyAddressUI } from "modules";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "router";
import { CompanyAddressProps, CountryType } from "types";
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
    LocationIcon: vi.fn(({ "data-testid": testId }) => <div data-testid={testId}>Icon</div>)
  };
});

describe("Company Address UI Component", () => {
  const mockSubmit = vi.fn();
  const mockHandleChange = vi.fn();

  const initialProps: CompanyAddressProps = {
    submit: mockSubmit,
    loading: false,
    initCountry: { country: { label: "Nigeria", value: "Nigeria" } },
    initZipcode: { zipCode: "123456" },
    initState: { state: "lagos" },
    initCityAddresses: {
      addressLine1: "nsk",
      addressLine2: "lag",
      city: "oworo"
    },
    activeCompanyAddress: "country",
    handleCompanyChange: mockHandleChange,
    countries: [
      { label: "Nigeria", value: "Nigeria" },
      { label: "Ghana", value: "Ghana" }
    ] as CountryType[],
    selectedCountry: { label: "Nigeria", value: "Nigeria" }
  };

  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <CompanyAddressUI {...initialProps} {...props} />{" "}
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
    expect(heading).toHaveTextContent("Company Address");
  });
});
