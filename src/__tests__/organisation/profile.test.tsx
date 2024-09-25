import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useUserContext } from "context";
import { OrgProfileUI } from "modules";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn()
}));

vi.mock("context", () => ({
  useUserContext: vi.fn()
}));

describe("OrgProfileUI Component", () => {
  const mockUpdateProfile = { submit: vi.fn(), loading: false };
  const mockUpdateEmails = { submit: vi.fn(), loading: false };
  const mockUpdateNumbers = { submit: vi.fn(), loading: false };
  const mockHandleChangeEmail = vi.fn();

  const mockProfile = {
    organisation: "Test Org",
    logo: "",
    website: "https://test.org",
    primaryEmail: "primary@test.com",
    pendingPrimaryEmail: null,
    secondaryEmail: "secondary@test.com",
    pendingSecondaryEmail: null,
    primaryPhoneNumber: "1234567890",
    secondaryPhoneNumber: "0987654321",
    sector: ["tech"]
  };

  const setup = () => {
    render(
      <OrgProfileUI
        handleChangeEmail={mockHandleChangeEmail}
        updateProfile={{
          submit: vi.fn(),
          loading: false
        }}
        updateNumbers={{
          submit: vi.fn(),
          loading: false
        }}
        updateEmails={{
          submit: vi.fn(),
          loading: false
        }}
      />
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useUserContext as jest.Mock).mockReturnValue({ orgDetails: mockProfile });
    setup();
  });

  it("renders correctly with initial values", () => {
    expect(screen.getByTestId("avatar-section")).toBeInTheDocument();
    expect(screen.getByTestId("name")).toHaveValue("Test Org");
    expect(screen.getByTestId("website")).toHaveValue("https://test.org");
    expect(screen.getByTestId("primary-emailBtn")).toBeInTheDocument();
    expect(screen.getByTestId("secondary-emailBtn")).toBeInTheDocument();
  });

  it("should update input values on change", () => {
    const nameInput = screen.getByTestId("name");
    fireEvent.change(nameInput, { target: { value: "Updated Org" } });
    expect(nameInput).toHaveValue("Updated Org");

    const websiteInput = screen.getByTestId("website");
    fireEvent.change(websiteInput, { target: { value: "https://newsite.org" } });
    expect(websiteInput).toHaveValue("https://newsite.org");
  });

  it("renders and handles avatar upload", () => {
    setup();

    const avatarInput = screen.getByLabelText("Upload image") as HTMLInputElement;
    const testFile = new File(["avatar"], "avatar.png", { type: "image/png" });

    expect(avatarInput).toBeInTheDocument();

    fireEvent.change(avatarInput, { target: { files: [testFile] } });
    expect(avatarInput.files![0]).toBe(testFile);
  });

  it("should call handleChangeEmail on primary email change button click", () => {
    const changePrimaryEmailBtn = screen.getByTestId("primary-emailBtn");
    fireEvent.click(changePrimaryEmailBtn);
    expect(mockHandleChangeEmail).toHaveBeenCalled();
  });

  it("should submit the form when Save button is clicked", async () => {
    const nameInput = screen.getByTestId("name");
    fireEvent.change(nameInput, { target: { value: "Updated Org" } });
    expect(nameInput).toHaveValue("Updated Org");

    const saveButton = screen.getByTestId("save-btn");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockUpdateProfile.submit).toHaveBeenCalled();
    });
  });

  it("calls handleChangeEmail function when primary email button is clicked", () => {
    const primaryEmailButton = screen.getByTestId("primary-emailBtn");
    fireEvent.click(primaryEmailButton);

    expect(mockHandleChangeEmail).toHaveBeenCalled();
  });

  it("calls handleChangeEmail function when secondary email button is clicked", () => {
    const secondaryEmailButton = screen.getByTestId("secondary-emailBtn");
    fireEvent.click(secondaryEmailButton);

    expect(mockHandleChangeEmail).toHaveBeenCalled();
  });

  it("resend verification primary email calls correct function", async () => {
    const resendPrimaryEmailBtn = screen.getByTestId("primary-resend-button");
    await fireEvent.click(resendPrimaryEmailBtn[0]);

    expect(mockUpdateEmails).toHaveBeenCalledWith({ action: "primary" });
  });

  it("resend verification secondary email calls correct function", async () => {
    const resendSecondaryEmailBtn = screen.getByTestId("secondary-resend-button");
    await fireEvent.click(resendSecondaryEmailBtn);

    expect(mockUpdateEmails).toHaveBeenCalledWith({ action: "support" });
  });

  it("should display validation errors if form inputs are invalid", async () => {
    const nameInput = screen.getByTestId("name");
    fireEvent.change(nameInput, { target: { value: "" } });

    const saveButton = screen.getByTestId("save-btn");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("Required")).toBeInTheDocument();
    });
  });

  it("should handle phone number updates correctly", () => {
    const primaryPhoneNumber = screen.getByLabelText("Primary Phone Number");
    fireEvent.change(primaryPhoneNumber, { target: { value: "1112223333" } });

    const saveButton = screen.getByTestId("save-btn");
    fireEvent.click(saveButton);

    expect(mockUpdateNumbers.submit).toHaveBeenCalledWith({
      number: "1112223333",
      action: "primary"
    });
  });
});
