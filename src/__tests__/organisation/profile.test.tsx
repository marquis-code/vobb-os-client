import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { OrgProfileUI } from "modules";
import { useUserContext } from "context";

// Mock the context
vi.mock("context", () => ({
  useModalContext: vi.fn(),
  useUserContext: vi.fn()
}));

const mockUserContext = {
  orgDetails: {
    organisation: "Test Org",
    logo: "test-logo.png",
    website: "https://testorg.com",
    primaryEmail: "primary@testorg.com",
    secondaryEmail: "secondary@testorg.com",
    primaryPhoneNumber: "1234567890",
    secondaryPhoneNumber: "0987654321",
    sector: ["IT", "Finance"]
  }
};

// Mock the props
const mockProps = {
  handleChangeEmail: vi.fn(),
  updateProfile: {
    submit: vi.fn(),
    loading: false
  },
  updateNumbers: {
    submit: vi.fn(),
    loading: false
  },
  updateEmails: {
    submit: vi.fn(),
    loading: false
  }
};

// Mock the router
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn()
}));

const renderComponent = (props = {}) => render(<OrgProfileUI {...mockProps} />);

describe("OrgProfileUI", () => {
  beforeEach(() => {
    (useUserContext as jest.Mock).mockReturnValue({
      mockUserContext
    });
  });

  it("renders the component with initial data", () => {
    renderComponent();
    expect(screen.getByTestId("avatar-section")).toBeInTheDocument();
    expect(screen.getByTestId("profile-form")).toBeInTheDocument();
    expect(screen.getByTestId("name")).toHaveAttribute("label", "Company Name");
    expect(screen.getByTestId("website")).toHaveAttribute("label", "Company Website");
  });

  it("renders and handles avatar upload", () => {
    renderComponent();

    const avatarInput = screen.getByLabelText("Upload image") as HTMLInputElement;
    const testFile = new File(["avatar"], "avatar.png", { type: "image/png" });

    expect(avatarInput).toBeInTheDocument();

    fireEvent.change(avatarInput, { target: { files: [testFile] } });
    expect(avatarInput.files![0]).toBe(testFile);
  });

  it("handles form submission", async () => {
    renderComponent();

    const nameInput = screen.getByTestId("name");
    const saveButton = screen.getByTestId("save-btn");

    fireEvent.change(nameInput, { target: { value: "New Org Name here" } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockProps.updateProfile.submit).toHaveBeenCalled();
    });
  });

  it("handles primary email change", () => {
    renderComponent();

    const changePrimaryEmailButton = screen.getByTestId("primary-emailBtn");
    fireEvent.click(changePrimaryEmailButton);

    expect(mockProps.handleChangeEmail).toHaveBeenCalled();
  });

  it("handles secondary email change", () => {
    renderComponent();

    const changeSecondaryEmailButton = screen.getByTestId("secondary-emailBtn");
    fireEvent.click(changeSecondaryEmailButton);

    expect(mockProps.handleChangeEmail).toHaveBeenCalled();
  });

  it("enables save button when changes are made", () => {
    renderComponent();

    const nameInput = screen.getByTestId("name");
    fireEvent.change(nameInput, { target: { value: "New Org Name" } });

    const saveButton = screen.getByTestId("save-btn");
    expect(saveButton).not.toBeDisabled();
  });
});
