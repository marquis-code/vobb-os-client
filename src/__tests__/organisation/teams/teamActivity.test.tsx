import { render, RenderResult, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SortOrderType } from "components";
import { teamActivityMockData } from "lib";
import { TeamActivity } from "modules";
import { initActivityData } from "pages";

describe("Team Activities", () => {
  let renderResult: RenderResult;
  const mockHandlePagination = vi.fn();

  const defaultProps = {
    teamActivities: {
      loading: false,
      data: {
        activityArray: teamActivityMockData,
        metaData: {
          currentPage: 1,
          totalCount: 50,
          totalPages: 5,
          pageLimit: 20
        }
      },
      params: {
        page: 1,
        limit: 20,
        order: "desc" as SortOrderType,
        startDate: "",
        endDate: ""
      },
      handleFilter: mockHandlePagination
    }
  };

  const customRender = (props = {}) => {
    const mergedProps = { ...defaultProps, ...props };
    return render(<TeamActivity {...mergedProps} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
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
    });

    expect(renderResult.container).toBeTruthy();

    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
  });

  it("should display paragraph with 'no activities' when there is no history", () => {
    const mockedData = {
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
    renderResult = customRender(mockedData);
    expect(renderResult.container).toBeTruthy();
    const paragraph = screen.getByTestId("no-activities");
    expect(paragraph).toBeInTheDocument();
  });

  it("should render with mocked data", () => {
    const mockedData = {
      teamActivities: {
        loading: false,
        data: {
          activityArray: teamActivityMockData,
          metaData: {
            currentPage: 1,
            totalPages: 1,
            totalCount: 8,
            pageLimit: 8
          }
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
    };
    renderResult = customRender(mockedData);
    expect(renderResult.container).toBeTruthy();
    const mockedActivities = screen.getAllByTestId("activity-card");
    expect(mockedActivities.length).toBeGreaterThan(0);
    const mockedActivity = mockedActivities[0];
    expect(mockedActivity).toBeInTheDocument();
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

    screen.debug();
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
