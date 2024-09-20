import { fireEvent, render, RenderResult, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AttributesTableMock } from "lib";
import { MemberAttributes } from "modules/organization/attributes/member";

const mockHandlePagination = vi.fn();
const mockHandleAddAttribute = vi.fn();
const mockHandleEditAttribute = vi.fn();
const mockHandleArchiveAttr = vi.fn();
const mockHandleRestoreAttr = vi.fn();
const mockHandleDuplicateAttr = vi.fn();

const mockedData = {
  memberAttributes: {
    attributesArray: AttributesTableMock,
    attributesMetaData: {
      currentPage: 1,
      pageLimit: 8,
      totalCount: 5,
      totalPages: 1
    }
  },
  handleAddAttribute: mockHandleAddAttribute,
  handleEditAttribute: mockHandleEditAttribute,
  handleDuplicateAttribute: mockHandleDuplicateAttr,
  handleRestoreAttribute: mockHandleRestoreAttr,
  handleArchiveAttribute: mockHandleArchiveAttr,
  handlePagination: mockHandlePagination
};

describe("Member Attributes UI tests", () => {
  let renderResult: RenderResult;

  const defaultProps = {
    memberAttributes: {
      attributesArray: [],
      attributesMetaData: {
        currentPage: 1,
        totalCount: 50,
        totalPages: 5,
        pageLimit: 20
      }
    },
    handleAddAttribute: mockHandleAddAttribute,
    handleEditAttribute: mockHandleEditAttribute,
    handleDuplicateAttribute: mockHandleDuplicateAttr,
    handleRestoreAttribute: mockHandleRestoreAttr,
    handleArchiveAttribute: mockHandleArchiveAttr,
    handlePagination: mockHandlePagination
  };

  const customRender = (props = {}) => {
    const mergedProps = { ...defaultProps, ...props };
    return render(<MemberAttributes {...mergedProps} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    renderResult = customRender();
  });

  it("should check for Add attribute button", () => {
    expect(renderResult.container).toBeTruthy();

    const addAttrBtn = screen.getByTestId("add-memberAttr");
    expect(addAttrBtn).toBeInTheDocument();
    expect(addAttrBtn).toHaveTextContent(/new member attribute/i);

    userEvent.click(addAttrBtn);
    expect(mockHandleAddAttribute).toHaveBeenCalled();
  });

  it("should display table and table heads", () => {
    expect(renderResult.container).toBeTruthy();

    const table = screen.getByRole("table");
    const titleColumn = screen.getByRole("columnheader", { name: /title/i });
    const typeColumn = screen.getByRole("columnheader", { name: /type/i });
    const propertiesColumn = screen.getByRole("columnheader", { name: /attribute properties/i });

    expect(table).toBeInTheDocument();
    expect(titleColumn).toBeInTheDocument();
    expect(typeColumn).toBeInTheDocument();
    expect(propertiesColumn).toBeInTheDocument();
  });

  it("should render with mocked data", () => {
    renderResult = customRender(mockedData);
    expect(renderResult.container).toBeTruthy();
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

  it("calls handleEditAttribute when edit attribute button is clicked", async () => {
    customRender(mockedData);
    const menuButtons = screen.getAllByTestId("menu-memberAttr");
    await userEvent.click(menuButtons[0]);
    const editOption = await screen.findByText(/Edit attribute/i);
    await userEvent.click(editOption);
    await waitFor(() => {
      expect(mockHandleEditAttribute).toHaveBeenCalled();
    });
  });

  it("calls handleDuplicateAttribute when view team button is clicked", async () => {
    customRender(mockedData);
    const menuButtons = screen.getAllByTestId("menu-team");
    await userEvent.click(menuButtons[0]);
    const viewOption = await screen.findByText(/view team/i);
    await userEvent.click(viewOption);
    await waitFor(() => {
      expect(mockHandleArchiveAttr).toHaveBeenCalled();
    });
  });
  it("calls handleTeamHistory when teamHistory button is clicked", async () => {
    customRender(mockedData);
    const menuButtons = screen.getAllByTestId("menu-team");
    await userEvent.click(menuButtons[0]);
    const teamHistoryOption = await screen.findByText(/team history/i);
    await userEvent.click(teamHistoryOption);
    await waitFor(() => {
      expect(mockHandleRestoreAttr).toHaveBeenCalled();
    });
  });
});
