import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SectorForm } from "modules/onboarding/companyInfo/sector";
import { describe, it, vi } from "vitest";

describe("SectorForm", () => {
  const mockSubmit = vi.fn();

  it("renders sector select input and submits selected sector", async () => {
    render(
      <SectorForm
        initData={{ sector: { label: "Tourism", value: "Tourism" } }}
        submit={mockSubmit}
      />
    );

    // const select = screen.getByTestId("sector");
    // fireEvent.change(select, { target: { value: "finance" } });
    fireEvent.click(screen.getByTestId("continue-btn"));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        sector: { label: "Tourism", value: "Tourism" }
      });
    });
  });

  it("shows validation error if sector is required", async () => {
    render(<SectorForm initData={{ sector: null }} submit={mockSubmit} />);

    fireEvent.click(screen.getByTestId("continue-btn"));

    expect(await screen.findByText("Required")).toBeInTheDocument();
  });
});
