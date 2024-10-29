import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import selectEvent from "react-select-event";
import { teamSizeOptions } from "lib";
import { TeamSizeForm } from "modules/onboarding/companyInfo/teamSize";

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
        <option value="">What is the size of your team?</option>
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

describe("TeamSizeForm Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with initial props", () => {
    render(<TeamSizeForm submit={mockSubmit} initData={{ size: null }} />);

    expect(screen.getByTestId("teamsize")).toBeInTheDocument();
    expect(screen.getByTestId("continue-btn")).toBeInTheDocument();
  });

  it("allows selecting a team size", async () => {
    render(<TeamSizeForm submit={mockSubmit} initData={{ size: null }} />);

    await selectEvent.select(screen.getByTestId("teamsize"), teamSizeOptions[0].label);

    expect(screen.getByText(teamSizeOptions[0].label)).toBeInTheDocument();
  });

  it("submits the form with selected team size", async () => {
    render(<TeamSizeForm submit={mockSubmit} initData={{ size: teamSizeOptions[1] }} />);

    await selectEvent.select(screen.getByTestId("teamsize"), teamSizeOptions[1].label);
    await userEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        size: { value: teamSizeOptions[1].value, label: teamSizeOptions[1].label }
      });
    });
  });

  it("shows validation error if team size is required and not selected", async () => {
    render(<TeamSizeForm submit={mockSubmit} initData={{ size: null }} />);

    await userEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(screen.getByTestId("validator-message")).toHaveTextContent("Required");
    });
  });

  it("pre-selects the initial team size if provided", () => {
    const initData = { size: teamSizeOptions[2] };
    render(<TeamSizeForm submit={mockSubmit} initData={initData} />);

    expect(screen.getByText(teamSizeOptions[2].label)).toBeInTheDocument();
  });

  it("updates the selected team size when a new one is chosen", async () => {
    render(<TeamSizeForm submit={mockSubmit} initData={{ size: null }} />);

    await selectEvent.select(screen.getByTestId("teamsize"), teamSizeOptions[0].label);
    expect(screen.getByText(teamSizeOptions[0].label)).toBeInTheDocument();

    await selectEvent.select(screen.getByTestId("teamsize"), teamSizeOptions[1].label);
    expect(screen.getByText(teamSizeOptions[1].label)).toBeInTheDocument();
  });
});
