import { fireEvent, render, screen } from "@testing-library/react";
import { useUserContext } from "context";
import { OrgCommunicationUI } from "modules";
import { describe, it, expect } from "vitest";

describe("OrgCommunicationUI", () => {
  const mockProps = {
    submitTempSuspend: { loadingTemp: false, handleTempSuspend: vi.fn() },
    submitIndefiniteSuspend: { loadingIndef: false, handleIndefSuspend: vi.fn() }
  };

  it("renders default OrgCommunicationUI with notices", () => {
    render(<OrgCommunicationUI {...mockProps} />);

    const heading = screen.getByRole("heading");

    expect(heading).toHaveTextContent("Communication");
    expect(heading).toBeInTheDocument();

    expect(
      screen.getByText("Control the email notices that go out to the members of your organization")
    ).toBeInTheDocument();

    expect(screen.getByText("Temporary suspension notice")).toBeInTheDocument();
    expect(screen.getByText("Deactivation notice")).toBeInTheDocument();

    expect(screen.getByTestId("temporary-suspension")).toBeInTheDocument();
    expect(screen.getByTestId("deactivation")).toBeInTheDocument();

    expect(screen.getByTestId("preview")).toHaveTextContent("No notice selected for preview");
  });

  it("toggles the temporary suspension switch to call handler", () => {
    const handleTempSuspend = vi.fn();
    const mockProps = {
      submitTempSuspend: { loadingTemp: false, handleTempSuspend },
      submitIndefiniteSuspend: { loadingIndef: false, handleIndefSuspend: vi.fn() }
    };

    render(<OrgCommunicationUI {...mockProps} />);

    const tempSwitch = screen.getByTestId("temporary-suspension");
    fireEvent.click(tempSwitch);

    expect(handleTempSuspend).toHaveBeenCalledWith({ suspend: true });
  });

  it("clicks Preview mail button to show correct preview", () => {
    const mockProps = {
      submitTempSuspend: { loadingTemp: false, handleTempSuspend: vi.fn() },
      submitIndefiniteSuspend: { loadingIndef: false, handleIndefSuspend: vi.fn() }
    };
    render(<OrgCommunicationUI {...mockProps} />);

    fireEvent.click(
      screen.getByText("Preview mail", { selector: '[data-testid="temporary-suspension"]' })
    );
    expect(screen.getByTestId("preview")).toContainElement(
      screen.getByText("TemporarySuspensionPreview content")
    );

    fireEvent.click(screen.getByText("Preview mail", { selector: '[data-testid="deactivation"]' }));
    expect(screen.getByTestId("preview")).toContainElement(
      screen.getByText("IndefiniteSuspensionPreview content")
    );
  });

  it("disables switches when loading", () => {
    const mockProps = {
      submitTempSuspend: { loadingTemp: true, handleTempSuspend: vi.fn() },
      submitIndefiniteSuspend: { loadingIndef: true, handleIndefSuspend: vi.fn() }
    };

    render(<OrgCommunicationUI {...mockProps} />);

    expect(screen.getByTestId("temporary-suspension")).toBeDisabled();
    expect(screen.getByTestId("deactivation")).toBeDisabled();
  });

  it("sets switches based on orgDetails", () => {
    vi.mock("context", () => ({
      useUserContext: vi.fn()
    }));

    const mockOrgDetails = {
      tempSuspensionNotice: true,
      indefiniteSuspensionNotice: false
    };
    (useUserContext as jest.Mock).mockReturnValue({ orgDetails: mockOrgDetails });

    const mockProps = {
      submitTempSuspend: { loadingTemp: false, handleTempSuspend: vi.fn() },
      submitIndefiniteSuspend: { loadingIndef: false, handleIndefSuspend: vi.fn() }
    };

    render(<OrgCommunicationUI {...mockProps} />);

    expect(screen.getByTestId("temporary-suspension")).toBeChecked();
    expect(screen.getByTestId("deactivation")).not.toBeChecked();
  });
});
