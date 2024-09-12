import { render, RenderResult, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { initTeamsData } from "hooks";
import { TeamTableMock } from "lib";
import { TeamsUI } from "modules";

describe("Team UI tests", () => {
  let renderResult: RenderResult;
  const mockHandlePagination = vi.fn();
  const defaultProps = {
    teams: {
      orgTeams: {
        teamsData: [],
        metaData: {
          currentPage: 1,
          totalCount: 50,
          totalPages: 5,
          pageLimit: 20
        }
      },
      handlePagination: mockHandlePagination,
      loading: false
    },
    handleEditTeam: vi.fn(),
    handleViewBranches: vi.fn(),
    handleTeamHistory: vi.fn(),
    handleViewTeam: vi.fn(),
    handleAddTeam: vi.fn()
  };

  const customRender = (props = {}) => {
    const mergedProps = { ...defaultProps, ...props };
    return render(<TeamsUI {...mergedProps} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    renderResult = customRender();
  });

  it("should check for heading content", () => {
    expect(renderResult.container).toBeTruthy();

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/teams/i);
  });

  it("should check for filter button", () => {
    expect(renderResult.container).toBeTruthy();

    const filterButtons = screen.getAllByRole("combobox");
    expect(filterButtons.length).toBeGreaterThan(0);
    const filterButton = filterButtons[0];

    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toHaveTextContent(/filter/i);

    expect(filterButton).toHaveAttribute("aria-haspopup", "dialog");
    expect(filterButton).toHaveAttribute("role", "combobox");
  });

  it("should check for Add Team button", () => {
    expect(renderResult.container).toBeTruthy();

    const addTeamBtn = screen.getByTestId("add-team");
    expect(addTeamBtn).toBeInTheDocument();
    expect(addTeamBtn).toHaveTextContent(/new team/i);
  });

  it("should display table and table heads", () => {
    expect(renderResult.container).toBeTruthy();

    const table = screen.getByRole("table");
    const nameColumn = screen.getByRole("columnheader", { name: /name/i });
    const managerColumn = screen.getByRole("columnheader", { name: /manager/i });
    const leadColumn = screen.getByRole("columnheader", { name: /lead/i });
    const branchesColumn = screen.getByRole("columnheader", { name: /branches/i });
    const membersColumn = screen.getByRole("columnheader", { name: /members/i });
    const dateColumn = screen.getByRole("columnheader", { name: /date/i });

    expect(table).toBeInTheDocument();
    expect(nameColumn).toBeInTheDocument();
    expect(managerColumn).toBeInTheDocument();
    expect(leadColumn).toBeInTheDocument();
    expect(branchesColumn).toBeInTheDocument();
    expect(membersColumn).toBeInTheDocument();
    expect(dateColumn).toBeInTheDocument();
  });

  it("should show loading spinner when loading is true", () => {
    renderResult = customRender({ teams: { ...defaultProps.teams, loading: true } });
    expect(renderResult.container).toBeTruthy();

    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
  });

  it("should display cell with 'no results' when there are no teams", () => {
    expect(renderResult.container).toBeTruthy();
    const resultCell = screen.getByRole("cell", { name: /no results/i });
    expect(resultCell).toBeInTheDocument();
  });

  it("should render with mocked data", () => {
    const mockedData = {
      teams: {
        orgTeams: {
          teamsData: TeamTableMock,
          metaData: {
            currentPage: 1,
            pageLimit: 8,
            totalCount: 5,
            totalPages: 1
          }
        },
        handlePagination: vi.fn(),
        loading: false
      }
    };
    renderResult = customRender(mockedData);
    expect(renderResult.container).toBeTruthy();
    const mockedTeam = screen.getByText("Support");
    expect(mockedTeam).toBeInTheDocument();
  });

  it("renders the pagination component with correct initial values", () => {
    customRender();
    const paginationComponents = screen.getAllByTestId("pagination");
    expect(paginationComponents.length).toBeGreaterThan(0);
    const paginationComponent = paginationComponents[0];
    expect(paginationComponent).toBeInTheDocument();

    const limitSelector = within(paginationComponent).getByTestId("select-limit");
    expect(limitSelector).toHaveTextContent("20");

    const pageInfo = within(paginationComponent).getByText(/Items per page/i);
    expect(pageInfo).toBeInTheDocument();
  });

  it("calls handlePagination when a new limit is selected", async () => {
    customRender();

    const selectContainer = screen.getAllByTestId("select-limit");
    const selectLimit = selectContainer[0];
    expect(selectLimit).toBeInTheDocument();

    const selectButton = within(selectLimit).getByRole("combobox");
    await userEvent.click(selectButton);

    const options = await screen.findAllByText("50");
    const option = options[0];
    await userEvent.click(option);

    expect(mockHandlePagination).toHaveBeenCalledWith("limit", 50);
  });
});
