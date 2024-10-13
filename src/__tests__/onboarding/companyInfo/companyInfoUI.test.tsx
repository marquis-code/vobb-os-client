import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { CompanyInfoUI } from "modules/onboarding/index";
import { Routes } from "router";

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

const mockSubmit = vi.fn();
const mockHandleCompanyChange = vi.fn();

const renderComponent = (props = {}) => {
  return render(
    <BrowserRouter>
      <CompanyInfoUI
        initName={{ organisation: "" }}
        initSize={{ size: null }}
        initSector={{ sector: null }}
        activeCompanyInfo="organisation"
        handleCompanyChange={mockHandleCompanyChange}
        submit={mockSubmit}
        loading={false}
      />
    </BrowserRouter>
  );
};

describe("CompanyInfoUI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders OrganisationForm by default", () => {
    renderComponent();
    expect(screen.getByTestId("organisation-form")).toBeInTheDocument();
  });

  it("renders TeamSizeForm when activeCompanyInfo is 'teamSize'", () => {
    render(
      <CompanyInfoUI
        initName={{ organisation: "" }}
        initSize={{
          size: {
            label: "0-5 Team members",
            value: "0-5"
          }
        }}
        initSector={{ sector: null }}
        activeCompanyInfo="teamSize"
        handleCompanyChange={mockHandleCompanyChange}
        submit={mockSubmit}
        loading={false}
      />
    );

    expect(screen.getByTestId("team-size-form")).toBeInTheDocument();
  });

  it("renders SectorForm when activeCompanyInfo is 'sector'", () => {
    render(
      <CompanyInfoUI
        initName={{ organisation: "" }}
        initSize={{
          size: {
            label: "0-5 Team members",
            value: "0-5"
          }
        }}
        initSector={{ sector: { label: "Tourism", value: "Tourism" } }}
        activeCompanyInfo="sector"
        handleCompanyChange={mockHandleCompanyChange}
        submit={mockSubmit}
        loading={false}
      />
    );

    expect(screen.getByTestId("sector-form")).toBeInTheDocument();
  });

  it("navigates back to user details on arrow click", () => {
    render(
      <CompanyInfoUI
        initName={{ organisation: "" }}
        initSize={{ size: null }}
        initSector={{ sector: null }}
        activeCompanyInfo="organisation"
        handleCompanyChange={mockHandleCompanyChange}
        submit={mockSubmit}
        loading={false}
      />
    );

    const arrow = screen.getByTestId("arrow-icon");
    fireEvent.click(arrow);

    expect(mockNavigate).toHaveBeenCalledWith(Routes.onboarding_user_details);
  });
});
