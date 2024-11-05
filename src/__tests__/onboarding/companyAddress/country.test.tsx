import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import selectEvent from "react-select-event";
import { CountrySelect } from "modules/onboarding/companyAddress/country";
import { CountryType } from "types";

// Mock the dependencies
vi.mock("components", () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  SelectInput: ({ options, onChange, value, validatorMessage, ...props }) => (
    <div>
      <select
        data-testid="select-input"
        onChange={(e) =>
          onChange({ value: e.target.value, label: e.target.options[e.target.selectedIndex].text })
        }
        value={value?.value || ""}
        {...props}>
        <option value="">Select a country</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {validatorMessage && <span data-testid="validator-message">{validatorMessage}</span>}
    </div>
  )
}));

const mockSubmit = vi.fn();

const mockCountries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" }
] as CountryType[];

describe("CountrySelect Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with initial props", () => {
    render(<CountrySelect submit={mockSubmit} countries={mockCountries} loading={false} />);

    expect(screen.getByTestId("select-input")).toBeInTheDocument();
    expect(screen.getByTestId("continue-btn")).toBeInTheDocument();
  });

  it("allows selecting a country", async () => {
    render(<CountrySelect submit={mockSubmit} countries={mockCountries} loading={false} />);

    await selectEvent.select(screen.getByTestId("select-input"), "Canada");

    expect(screen.getByText("Canada")).toBeInTheDocument();
  });

  it("submits the form with selected country", async () => {
    render(
      <CountrySelect
        submit={mockSubmit}
        initCountry={{ country: { label: "United Kingdom", value: "uk" } }}
        countries={mockCountries}
        loading={false}
      />
    );

    await selectEvent.select(screen.getByTestId("select-input"), "United Kingdom");
    await userEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        country: { label: "United Kingdom", value: "uk" }
      });
    });
  });

  it("shows validation error if country is required and not selected", async () => {
    render(<CountrySelect submit={mockSubmit} countries={mockCountries} loading={false} />);

    await userEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(screen.getByTestId("validator-message")).toHaveTextContent("Required");
    });
  });

  it("disables the continue button when loading", () => {
    render(<CountrySelect submit={mockSubmit} countries={mockCountries} loading={true} />);

    expect(screen.getByTestId("continue-btn")).toBeDisabled();
  });

  it("pre-selects the initial country if provided", () => {
    const initCountry = { country: { value: "ca", label: "Canada" } };
    render(
      <CountrySelect
        submit={mockSubmit}
        countries={mockCountries}
        initCountry={initCountry}
        loading={false}
      />
    );

    expect(screen.getByText("Canada")).toBeInTheDocument();
  });

  it("updates the selected country when a new one is chosen", async () => {
    render(<CountrySelect submit={mockSubmit} countries={mockCountries} loading={false} />);

    await selectEvent.select(screen.getByTestId("select-input"), "United States");
    expect(screen.getByText("United States")).toBeInTheDocument();

    await selectEvent.select(screen.getByTestId("select-input"), "Canada");
    expect(screen.getByText("Canada")).toBeInTheDocument();
  });
});
