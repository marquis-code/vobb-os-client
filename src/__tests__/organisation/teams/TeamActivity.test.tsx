import { render, RenderResult, screen } from "@testing-library/react";
import { SortOrderType } from "components";
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
});
