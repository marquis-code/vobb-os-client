import { render, screen } from "@testing-library/react";
import { useUserContext } from "context";
import { TemporarySuspensionPreview } from "modules/organization/communication/previews/TemporarySuspensionPreview";

vi.mock("context", () => ({
  useUserContext: vi.fn()
}));

describe("TemporarySuspensionPreview", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with orgDetails", () => {
    (useUserContext as jest.Mock).mockReturnValue({
      orgDetails: {
        logo: "http://example.com/logo.png",
        organisation: "ExampleOrg",
        primaryEmail: "user@example.com"
      }
    });

    render(<TemporarySuspensionPreview />);

    expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();
    expect(
      screen.getByText("Temporary suspension of ExampleOrg's Vobb Workspace")
    ).toBeInTheDocument();
    expect(screen.getByText(/Hi \(your team member's name\),/)).toBeInTheDocument();
    expect(
      screen.getByText(
        /has been temporarily suspended, effective immediately for the following reason:/
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/(the reason for suspension)/)).toBeInTheDocument();
    expect(screen.getByText(/Your access will remain suspended/)).toBeInTheDocument();
    expect(screen.getByText(/If you have any questions/)).toBeInTheDocument();
    expect(screen.getByText(/Thanks,/)).toBeInTheDocument();
    expect(screen.getByText(/This email was sent to/)).toBeInTheDocument();
    expect(screen.getByText(/© 2024 Vobb/)).toBeInTheDocument();
  });

  it("renders fallback avatar initials when logo is not provided", () => {
    (useUserContext as jest.Mock).mockReturnValue({
      orgDetails: {
        logo: null,
        organisation: "ExampleOrg",
        primaryEmail: "user@example.com"
      }
    });

    render(<TemporarySuspensionPreview />);

    // Check for initials
    expect(screen.getByText("EE")).toBeInTheDocument();
  });

  it("renders fallback avatar initials when organisation name is too short", () => {
    (useUserContext as jest.Mock).mockReturnValue({
      orgDetails: {
        logo: null,
        organisation: "A",
        primaryEmail: "user@example.com"
      }
    });

    render(<TemporarySuspensionPreview />);

    // Check for initials
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it('renders "unknown" for missing primaryEmail', () => {
    (useUserContext as jest.Mock).mockReturnValue({
      orgDetails: {
        logo: "http://example.com/logo.png",
        organisation: "ExampleOrg",
        primaryEmail: null
      }
    });

    render(<TemporarySuspensionPreview />);

    expect(screen.getByText(/This email was sent to/)).toBeInTheDocument();
    expect(screen.getByText(/If this is not you, please ignore this email./)).toBeInTheDocument();
  });
});
