import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TeamSizeForm } from "modules/onboarding/companyInfo/teamSize";
import { describe, it, vi } from "vitest";

describe("TeamSizeForm", () => {
  const mockSubmit = vi.fn();

  it("renders team size select input and submits selected data", async () => {
    render(
      <TeamSizeForm
        initData={{
          size: {
            label: "0-5 Team members",
            value: "0-5"
          }
        }}
        submit={mockSubmit}
      />
    );

    fireEvent.click(screen.getByTestId("continue-btn"));
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        size: { label: "0-5 Team members", value: "0-5" }
      });
    });
  });

  it("shows validation error if team size is required", async () => {
    render(<TeamSizeForm initData={{ size: null }} submit={mockSubmit} />);

    fireEvent.click(screen.getByTestId("continue-btn"));

    expect(await screen.findByText("Required")).toBeInTheDocument();
  });
});
