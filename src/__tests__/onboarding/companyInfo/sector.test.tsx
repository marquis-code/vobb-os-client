import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import selectEvent from "react-select-event";
import { sectorOptions } from "lib";
import { SectorForm } from "modules/onboarding/companyInfo/sector";

// Mock the dependencies
vi.mock("components", () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  SelectInput: ({ options, onChange, value, validatorMessage, ...props }) => (
    <div>
      <select
        data-testid={props.testId}
        onChange={(e) =>
          onChange({ value: e.target.value, label: e.target.options[e.target.selectedIndex].text })
        }
        value={value?.value || ""}
        {...props}>
        <option value="">Select travel industry</option>
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

describe("SectorForm Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with initial props", () => {
    render(<SectorForm submit={mockSubmit} />);

    expect(screen.getByTestId("sector")).toBeInTheDocument();
    expect(screen.getByTestId("continue-btn")).toBeInTheDocument();
  });

  it("allows selecting a sector", async () => {
    render(<SectorForm submit={mockSubmit} />);

    await selectEvent.select(screen.getByTestId("sector"), sectorOptions[0].label);

    expect(screen.getByText(sectorOptions[0].label)).toBeInTheDocument();
  });

  it("submits the form with selected sector", async () => {
    render(<SectorForm submit={mockSubmit} initData={{ sector: sectorOptions[1] }} />);

    await selectEvent.select(screen.getByTestId("sector"), sectorOptions[1].label);
    await userEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        sector: { value: sectorOptions[1].value, label: sectorOptions[1].label }
      });
    });
  });

  it("shows validation error if sector is required and not selected", async () => {
    render(<SectorForm submit={mockSubmit} />);

    await userEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(screen.getByTestId("validator-message")).toHaveTextContent("Required");
    });
  });

  it("pre-selects the initial sector if provided", () => {
    const initData = { sector: sectorOptions[2] };
    render(<SectorForm submit={mockSubmit} initData={initData} />);

    expect(screen.getByText(sectorOptions[2].label)).toBeInTheDocument();
  });

  it("updates the selected sector when a new one is chosen", async () => {
    render(<SectorForm submit={mockSubmit} />);

    await selectEvent.select(screen.getByTestId("sector"), sectorOptions[0].label);
    expect(screen.getByText(sectorOptions[0].label)).toBeInTheDocument();

    await selectEvent.select(screen.getByTestId("sector"), sectorOptions[1].label);
    expect(screen.getByText(sectorOptions[1].label)).toBeInTheDocument();
  });
});
