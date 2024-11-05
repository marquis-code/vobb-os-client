import { render, screen, fireEvent } from "@testing-library/react";
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

vi.mock("modules/onboarding/companyAddress/country", () => ({
  CountrySelect: vi.fn(() => <div data-testid="country-form" />)
}));

vi.mock("modules/onboarding/companyAddress/zipcode", () => ({
  Zipcode: vi.fn(() => <div data-testid="zipcode-form" />)
}));

vi.mock("modules/onboarding/companyAddress/province", () => ({
  Province: vi.fn(() => <div data-testid="province-form" />)
}));

vi.mock("modules/onboarding/companyAddress/address", () => ({
  CityAddress: vi.fn(() => <div data-testid="city-address-form" />)
}));
vi.mock("assets", async () => {
  const originalModule = await vi.importActual<any>("assets");
  return {
    ...originalModule,
    LocationIcon: vi.fn(({ "data-testid": testId }) => <div data-testid={testId}>Icon</div>)
  };
});

describe("Company Address UI Component", () => {
  const mockSubmit = vi.fn();
  const mockHandleCompanyChange = vi.fn();

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
    handleCompanyChange: mockHandleCompanyChange,
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

  it("renders the paragraph description", () => {
    renderComponent();

    const subtitle = screen.getByTestId("subtitle");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent("Where are you operating from?");
  });

  it("renders Country form by default", () => {
    renderComponent();
    expect(screen.getByTestId("country-form")).toBeInTheDocument();
  });

  it("renders Zip code form when activeCompanyAddress is 'zipcode'", () => {
    renderComponent({ activeCompanyAddress: "zipcode" });

    expect(screen.getByTestId("zipcode-form")).toBeInTheDocument();
  });

  it("renders Province form when activeCompanyAddress is 'province'", () => {
    renderComponent({ activeCompanyAddress: "province" });

    expect(screen.getByTestId("province-form")).toBeInTheDocument();
  });

  it("renders City and addresses when activeCompanyAddress is 'cityAddress'", () => {
    renderComponent({ activeCompanyAddress: "cityAddress" });

    expect(screen.getByTestId("city-address-form")).toBeInTheDocument();
  });

  it("navigates back to user details on arrow click", () => {
    renderComponent();

    const arrow = screen.getByTestId("arrow-icon");
    fireEvent.click(arrow);

    expect(mockNavigate).toHaveBeenCalledWith(Routes.onboarding_company_website);
  });

  it('should call handleCompanyChange function with "country" as parameter', () => {
    renderComponent();
    const countryBtnState = screen.getByTestId("country-state");
    fireEvent.click(countryBtnState);

    expect(mockHandleCompanyChange).toHaveBeenCalledWith("country");
  });

  it('should call handleCompanyChange function with "zipcode" as parameter', () => {
    renderComponent();
    const zipcodeBtnState = screen.getByTestId("zipcode-state");
    fireEvent.click(zipcodeBtnState);

    expect(mockHandleCompanyChange).toHaveBeenCalledWith("zipcode");
  });

  it('should call handleCompanyChange function with "province" as parameter', () => {
    renderComponent();
    const provinceBtnState = screen.getByTestId("province-state");
    fireEvent.click(provinceBtnState);

    expect(mockHandleCompanyChange).toHaveBeenCalledWith("province");
  });

  it('should call handleCompanyChange function with "city" as parameter', () => {
    renderComponent();
    const cityBtnState = screen.getByTestId("city-state");
    fireEvent.click(cityBtnState);

    expect(mockHandleCompanyChange).toHaveBeenCalledWith("city");
  });
});
