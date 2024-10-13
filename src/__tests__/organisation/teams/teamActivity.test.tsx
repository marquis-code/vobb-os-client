import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SortOrderType } from "components";
import { teamActivityMockData } from "lib";
import { TeamActivity } from "modules";
import { initActivityData } from "pages";
import { BrowserRouter } from "react-router-dom";

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

describe("Team Activities", () => {
  const renderComponent = (props = {}) =>
    render(
      <BrowserRouter>
        <TeamActivity {...defaultProps} {...props} />
      </BrowserRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should check for Sort button", () => {
    renderComponent();

    const sortBy = screen.getByTestId("sortBy");
    expect(sortBy).toBeInTheDocument();
    expect(sortBy).toHaveTextContent(/sorted/i);
  });

  it("should check for date select button", () => {
    renderComponent();

    const dateFilter = screen.getByTestId("dateFilter");
    expect(dateFilter).toBeInTheDocument();
  });

  it("should show loading spinner when loading is true", () => {
    renderComponent({
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

    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
  });

  it("should display paragraph with 'no activities' when there is no history", () => {
    renderComponent(mockedData);
    const paragraph = screen.getByTestId("no-activities");
    expect(paragraph).toBeInTheDocument();
  });

  it("should render with mocked data", () => {
    renderComponent({
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
    });

    const mockedActivities = screen.getAllByTestId("activity-card");
    expect(mockedActivities.length).toBeGreaterThan(0);
    expect(mockedActivities[0]).toBeInTheDocument();
  });

  it("renders the pagination component with correct initial values", () => {
    renderComponent();
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
    renderComponent();

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
