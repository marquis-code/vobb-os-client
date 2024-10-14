import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { OrganisationForm } from "modules/onboarding/companyInfo/companyName";
import userEvent from "@testing-library/user-event";

describe("OrganisationForm", () => {
  const mockSubmit = vi.fn();

  it("renders correctly with initial props", () => {
    render(<OrganisationForm submit={mockSubmit} initData={{ organisation: "" }} />);

    expect(screen.getByTestId("organisation-name")).toBeInTheDocument();
    expect(screen.getByTestId("continue-btn")).toBeInTheDocument();
  });

  it("pre-fills the organisation name if provided in initData", () => {
    const initData = { organisation: "Pre-filled Company" };
    render(<OrganisationForm submit={mockSubmit} initData={initData} />);

    expect(screen.getByTestId("organisation-name")).toHaveValue("Pre-filled Company");
  });

  it("allows entering an organisation name", async () => {
    render(<OrganisationForm submit={mockSubmit} initData={{ organisation: "" }} />);

    await userEvent.type(screen.getByTestId("organisation-name"), "Test Company");

    expect(screen.getByTestId("organisation-name")).toHaveValue("Test Company");
  });

  it("submits data with input change", async () => {
    render(<OrganisationForm initData={{ organisation: "" }} submit={mockSubmit} />);

    const input = screen.getByTestId("organisation-name");
    fireEvent.change(input, { target: { value: "Test Organisation" } });
    fireEvent.click(screen.getByTestId("continue-btn"));
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        organisation: "Test Organisation"
      });
    });
  });

  it("shows validation error if organisation is required", async () => {
    render(<OrganisationForm initData={{ organisation: "" }} submit={mockSubmit} />);

    fireEvent.click(screen.getByTestId("continue-btn"));

    expect(await screen.findByText("Required")).toBeInTheDocument();
  });
});
