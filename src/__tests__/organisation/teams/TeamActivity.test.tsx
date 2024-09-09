import { render, RenderResult, screen } from "@testing-library/react";
import { SortOrderType } from "components";
import { teamActivityMockData } from "lib";
import { TeamActivity } from "modules";
import { initActivityData } from "pages";

describe("Team Activities", () => {
  let renderResult: RenderResult;
  const defaultProps = {
    teamActivities: {
      loading: false,
      data: initActivityData,
      params: {
        page: 1,
        limit: 20,
        order: "desc" as SortOrderType,
        startDate: "",
        endDate: ""
      },
      handleFilter: vi.fn()
    }
  };

  const customRender = (props = {}) => {
    const mergedProps = { ...defaultProps, ...props };
    return render(<TeamActivity {...mergedProps} />);
  };

  beforeEach(() => {
    renderResult = customRender();
  });

  it("should render teams ui page", () => {
    expect(renderResult.container).toBeTruthy();
  });

  it("should check for Sort button", () => {
    const sortBy = screen.getByTestId("sortBy");
    expect(sortBy).toBeInTheDocument();
    expect(sortBy).toHaveTextContent(/sorted/i);
  });

  it("should check for date select button", () => {
    const dateFilter = screen.getByTestId("dateFilter");
    expect(dateFilter).toBeInTheDocument();
  });

  it("should show loading spinner when loading is true", () => {
    renderResult = customRender({
      teams: {
        teamActivities: {
          loading: true,
          data: initActivityData,
          params: {
            page: 1,
            limit: 20,
            order: "desc" as SortOrderType,
            startDate: "",
            endDate: ""
          },
          handleFilter: vi.fn()
        }
      }
    });
    expect(renderResult.container).toBeTruthy();
    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
  });

  it("should display paragraph with 'no activities' when there is no history", () => {
    const paragraph = screen.getByTestId("no-activities");
    expect(paragraph).toBeInTheDocument();
  });

  it("should render with mocked data", () => {
    const mockedData = {
      teams: {
        teamActivities: {
          loading: false,
          data: {
            activityArray: teamActivityMockData,
            metaData: {
              currentPage: 1,
              totalPages: 1,
              totalCount: 8,
              pageLimit: 8
            },
            params: {
              page: 1,
              limit: 20,
              order: "desc" as SortOrderType,
              startDate: "",
              endDate: ""
            },
            handleFilter: vi.fn()
          }
        }
      }
    };
    renderResult = customRender(mockedData);
    expect(renderResult.container).toBeTruthy();
    const mockedActivities = screen.getAllByTestId("activity-card");
    expect(mockedActivities.length).toBeGreaterThan(0);
    const mockedActivity = mockedActivities[0];

    expect(mockedActivity).toBeInTheDocument();
  });
});
