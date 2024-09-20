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

  beforeEach(() => {
    vi.clearAllMocks();
    (useUserContext as jest.Mock).mockReturnValue({ orgDetails: mockProfile });
  });

  it("renders correctly with initial values", () => {
    render(
      <OrgProfileUI
        handleChangeEmail={mockHandleChangeEmail}
        updateProfile={mockUpdateProfile}
        updateEmails={mockUpdateEmails}
        updateNumbers={mockUpdateNumbers}
      />
    );

    expect(screen.getByTestId("avatar-section")).toBeInTheDocument();
    expect(screen.getByTestId("name")).toHaveValue("Test Org");
    expect(screen.getByTestId("website")).toHaveValue("https://test.org");
    expect(screen.getByTestId("primary-emailBtn")).toBeInTheDocument();
    expect(screen.getByTestId("secondary-emailBtn")).toBeInTheDocument();
  });

  it("should update input values on change", () => {
    render(
      <OrgProfileUI
        handleChangeEmail={mockHandleChangeEmail}
        updateProfile={mockUpdateProfile}
        updateEmails={mockUpdateEmails}
        updateNumbers={mockUpdateNumbers}
      />
    );

    const nameInput = screen.getByTestId("name");
    fireEvent.change(nameInput, { target: { value: "Updated Org" } });
    expect(nameInput).toHaveValue("Updated Org");

    const websiteInput = screen.getByTestId("website");
    fireEvent.change(websiteInput, { target: { value: "https://newsite.org" } });
    expect(websiteInput).toHaveValue("https://newsite.org");
  });

  it("should call handleChangeEmail on primary email change button click", () => {
    render(
      <OrgProfileUI
        handleChangeEmail={mockHandleChangeEmail}
        updateProfile={mockUpdateProfile}
        updateEmails={mockUpdateEmails}
        updateNumbers={mockUpdateNumbers}
      />
    );

    const changePrimaryEmailBtn = screen.getByTestId("primary-emailBtn");
    fireEvent.click(changePrimaryEmailBtn);
    expect(mockHandleChangeEmail).toHaveBeenCalled();
  });

  it("should submit the form when Save button is clicked", async () => {
    render(
      <OrgProfileUI
        handleChangeEmail={mockHandleChangeEmail}
        updateProfile={mockUpdateProfile}
        updateEmails={mockUpdateEmails}
        updateNumbers={mockUpdateNumbers}
      />
    );

    // Change the input values
    const nameInput = screen.getByTestId("name");
    fireEvent.change(nameInput, { target: { value: "Updated Org" } });

    const saveButton = screen.getByTestId("save-btn");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockUpdateProfile.submit).toHaveBeenCalled();
    });
  });

  it("should display validation errors if form inputs are invalid", async () => {
    render(
      <OrgProfileUI
        handleChangeEmail={mockHandleChangeEmail}
        updateProfile={mockUpdateProfile}
        updateEmails={mockUpdateEmails}
        updateNumbers={mockUpdateNumbers}
      />
    );

    const nameInput = screen.getByTestId("name");
    fireEvent.change(nameInput, { target: { value: "" } });

    const saveButton = screen.getByTestId("save-btn");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("Required")).toBeInTheDocument();
    });
  });

  it("should handle phone number updates correctly", () => {
    render(
      <OrgProfileUI
        handleChangeEmail={mockHandleChangeEmail}
        updateProfile={mockUpdateProfile}
        updateEmails={mockUpdateEmails}
        updateNumbers={mockUpdateNumbers}
      />
    );

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
