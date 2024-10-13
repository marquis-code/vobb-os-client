import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { OrganisationForm } from "modules/onboarding/companyInfo/companyName";

describe("OrganisationForm", () => {
  const mockSubmit = vi.fn();

  it("renders the form and submits data", async () => {
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
