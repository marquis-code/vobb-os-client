import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { CompanyInfoUI } from "modules/onboarding/index";
import { Routes } from "router";
import { CompanyFormProps } from "types";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

vi.mock("modules/onboarding/companyInfo/companyName", () => ({
  OrganisationForm: vi.fn(() => <div data-testid="organisation-form" />)
}));

vi.mock("modules/onboarding/companyInfo/sector", () => ({
  SectorForm: vi.fn(() => <div data-testid="sector-form" />)
}));

vi.mock("modules/onboarding/companyInfo/teamSize", () => ({
  TeamSizeForm: vi.fn(() => <div data-testid="team-size-form" />)
}));

vi.mock("assets", async () => {
  const originalModule = await vi.importActual<any>("assets");
  return {
    ...originalModule,
    CompanyInfoIcon: vi.fn(({ "data-testid": testId }) => <div data-testid={testId}>Icon</div>)
  };
});

describe("CompanyInfoUI", () => {
  const mockSubmit = vi.fn();
  const mockHandleCompanyChange = vi.fn();
  const initialProps: CompanyFormProps = {
    initName: { organisation: "" },
    initSize: { size: null },
    initSector: { sector: null },
    activeCompanyInfo: "organisation",
    handleCompanyChange: mockHandleCompanyChange,
    submit: mockSubmit,
    loading: false
  };

  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <CompanyInfoUI {...initialProps} {...props} />
      </BrowserRouter>
    );
  };
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the icon", () => {
    renderComponent();
    const icon = screen.getByTestId("logo");

    expect(icon).toBeInTheDocument();
  });

  it("renders the heading", () => {
    renderComponent();

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Company information");
  });

  it("renders the paragraph description", () => {
    renderComponent();

    const subtitle = screen.getByTestId("subtitle");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent("Enter your company details.");
  });

  it("renders OrganisationForm by default", () => {
    renderComponent();
    expect(screen.getByTestId("organisation-form")).toBeInTheDocument();
  });

  it("renders TeamSizeForm when activeCompanyInfo is 'teamSize'", () => {
    renderComponent({ activeCompanyInfo: "teamSize" });

    expect(screen.getByTestId("team-size-form")).toBeInTheDocument();
  });

  it("renders SectorForm when activeCompanyInfo is 'sector'", () => {
    renderComponent({ activeCompanyInfo: "sector" });

    expect(screen.getByTestId("sector-form")).toBeInTheDocument();
  });

  it("navigates back to user details on arrow click", () => {
    renderComponent();

    const arrow = screen.getByTestId("arrow-icon");
    fireEvent.click(arrow);

    expect(mockNavigate).toHaveBeenCalledWith(Routes.onboarding_user_details);
  });

  it('should call handleCompanyChange function with "organisation" as parameter', () => {
    renderComponent();
    const orgBtnState = screen.getByTestId("organisation-name-state");
    fireEvent.click(orgBtnState);

    expect(mockHandleCompanyChange).toHaveBeenCalledWith("organisation");
  });

  it('should call handleCompanyChange function with "teamSize" as parameter', () => {
    renderComponent();
    const teamSizeBtnState = screen.getByTestId("teamsize-state");
    fireEvent.click(teamSizeBtnState);

    expect(mockHandleCompanyChange).toHaveBeenCalledWith("teamSize");
  });

  it('should call handleCompanyChange function with "sector" as parameter', () => {
    renderComponent();
    const sectorState = screen.getByTestId("sector-state");
    fireEvent.click(sectorState);

    expect(mockHandleCompanyChange).toHaveBeenCalledWith("sector");
  });
});
