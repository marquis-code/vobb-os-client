import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AttributesTableMock } from "lib";
import { OrgAttributesUI } from "modules";
import { ClientAttributes } from "modules/organization/attributes/client";
import { MemberAttributes } from "modules/organization/attributes/member";

vi.mock("modules/organization/attributes/member", () => ({
  MemberAttributes: vi.fn(() => <div data-testid="member-attributes" />)
}));
vi.mock("modules/organization/attributes/client", () => ({
  ClientAttributes: vi.fn(() => <div data-testid="client-attributes" />)
}));
vi.mock("components", async () => {
  const actual = await vi.importActual("components");
  return {
    ...actual,
    LoadingSpinner: vi.fn(() => <div data-testid="loading-spinner" />)
  };
});
describe("OrgAttributesUI", () => {
  const defaultProps = {
    handleAddMemberAttr: vi.fn(),
    handleAddClientAttr: vi.fn(),
    setEditMemberAttr: vi.fn(),
    setEditClientAttr: vi.fn(),
    setDuplicateMemberAttr: vi.fn(),
    setDuplicateClientAttr: vi.fn(),
    handleArchiveAttr: vi.fn(),
    handleRestoreAttr: vi.fn(),
    handleMemberAttrAction: {
      loading: false,
      handlePagination: vi.fn()
    },
    handleClientAttrAction: {
      loading: false,
      handlePagination: vi.fn()
    },
    clientAttributes: {
      attributesArray: AttributesTableMock,
      attributesMetaData: { currentPage: 1, pageLimit: 5, totalCount: 10, totalPages: 1 }
    },
    memberAttributes: {
      attributesArray: AttributesTableMock,
      attributesMetaData: { currentPage: 1, pageLimit: 5, totalCount: 10, totalPages: 1 }
    }
  };

  const renderComponent = (props = {}) => render(<OrgAttributesUI {...defaultProps} {...props} />);

  it("should check for heading content", () => {
    renderComponent();

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/attributes/i);
  });

  it("should render the attributes tabs", () => {
    renderComponent();

    const memberTab = screen.getByRole("tab", { name: "Team member attributes" });
    const clientTab = screen.getByRole("tab", { name: "Client attributes" });

    expect(memberTab).toBeInTheDocument();
    expect(clientTab).toBeInTheDocument();
  });

  it("renders the member attributes tab as active by default, while clients tab is inactive", () => {
    renderComponent();

    const memberTab = screen.getByRole("tab", { name: "Team member attributes" });
    const clientTab = screen.getByRole("tab", { name: "Client attributes" });

    expect(memberTab).toHaveAttribute("data-state", "active");
    expect(clientTab).toHaveAttribute("data-state", "inactive");
  });

  it("renders the client attributes tab as active when tab is clicked, while member is inactive", async () => {
    const user = userEvent.setup();
    renderComponent();

    const clientTab = screen.getByRole("tab", { name: "Client attributes" });
    const memberTab = screen.getByRole("tab", { name: "Team member attributes" });

    await user.pointer({ keys: "[MouseLeft]", target: clientTab });

    await waitFor(() => {
      expect(clientTab).toHaveAttribute("data-state", "active");
    });
    expect(memberTab).toHaveAttribute("data-state", "inactive");
  });

  it("shows the loading spinner when member attributes are loading", () => {
    const propsWithLoading = {
      ...defaultProps,
      handleMemberAttrAction: { ...defaultProps.handleMemberAttrAction, loading: true }
    };
    render(<OrgAttributesUI {...propsWithLoading} />);
    const loadingSpinner = screen.getByTestId("loading-spinner");
    expect(loadingSpinner).toBeInTheDocument();
  });

  it("shows the loading spinner when client attributes are loading", async () => {
    const propsWithLoading = {
      ...defaultProps,
      handleClientAttrAction: { ...defaultProps.handleClientAttrAction, loading: true }
    };
    const user = userEvent.setup();
    render(<OrgAttributesUI {...propsWithLoading} />);

    const clientTab = screen.getByRole("tab", { name: "Client attributes" });
    await user.pointer({ keys: "[MouseLeft]", target: clientTab });

    await waitFor(() => {
      const loadingSpinner = screen.getByTestId("loading-spinner");
      expect(loadingSpinner).toBeInTheDocument();
    });
  });

  it("passes the correct props to MemberAttributes component", () => {
    renderComponent();
    expect(MemberAttributes).toHaveBeenCalledWith(
      expect.objectContaining({
        handleAddAttribute: defaultProps.handleAddMemberAttr,
        handleEditAttribute: defaultProps.setEditMemberAttr,
        handleDuplicateAttribute: defaultProps.setDuplicateMemberAttr,
        handleRestoreAttribute: defaultProps.handleRestoreAttr,
        handleArchiveAttribute: defaultProps.handleArchiveAttr,
        handlePagination: defaultProps.handleMemberAttrAction.handlePagination,
        memberAttributes: defaultProps.memberAttributes
      }),
      {}
    );
  });

  it("passes the correct props to ClientAttributes component", async () => {
    renderComponent();
    const clientTab = screen.getByRole("tab", { name: "Client attributes" });
    fireEvent.click(clientTab);

    await waitFor(() => {
      expect(ClientAttributes).toHaveBeenCalledWith(
        expect.objectContaining({
          handleAddAttribute: defaultProps.handleAddClientAttr,
          handleEditAttribute: defaultProps.setEditClientAttr,
          handleDuplicateAttribute: defaultProps.setDuplicateClientAttr,
          handleRestoreAttribute: defaultProps.handleRestoreAttr,
          handleArchiveAttribute: defaultProps.handleArchiveAttr,
          handlePagination: defaultProps.handleClientAttrAction.handlePagination,
          clientAttributes: defaultProps.clientAttributes
        }),
        {}
      );
    });
  });
});
