import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ClientAttributes } from "modules/organization/attributes/client";

// Mock the imported components and icons
vi.mock("components", () => ({
  AttributesTable: ({ columns, data }) => (
    <div data-testid="attributes-table">
      {data.map((item, index) => (
        <div key={index} data-testid={`row-${index}`}>
          {columns.map((col) => (
            <span key={col.id || col.accessorKey}>
              {col.cell ? col.cell({ row: { original: item } }) : item[col.accessorKey]}
            </span>
          ))}
        </div>
      ))}
    </div>
  ),
  Button: ({ children, onClick, "data-testid": testId }) => (
    <button onClick={onClick} data-testid={testId}>
      {children}
    </button>
  ),
  Pagination: ({ handleChange, handlePageLimit, currentPage, pageLimit, totalPages }) => (
    <div data-testid="pagination">
      <button onClick={() => handleChange(currentPage - 1)} data-testid="prev-page">
        Prev
      </button>
      <span data-testid="current-page">{currentPage}</span>
      <button onClick={() => handleChange(currentPage + 1)} data-testid="next-page">
        Next
      </button>
      <select
        data-testid="page-limit"
        value={pageLimit}
        onChange={(e) => handlePageLimit(Number(e.target.value))}>
        <option value="15">15</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  ),
  getAttributeTableColumns: ({
    handleEditAttribute,
    handleDuplicateAttribute,
    handleRestoreAttribute,
    handleArchiveAttribute
  }) => [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <div data-testid="title-cell">{row.original.title}</div>
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <div data-testid="type-cell">{row.original.type}</div>
    },
    {
      accessorKey: "properties",
      header: "Attribute properties",
      cell: ({ row }) => (
        <div data-testid="properties-cell">
          {row.original.required && <span>Required</span>}
          {row.original.isSystem && <span>System</span>}
        </div>
      )
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div data-testid="actions-cell">
          <button onClick={() => handleEditAttribute(row.original)} data-testid="edit-attr">
            Edit
          </button>
          <button
            onClick={() => handleDuplicateAttribute(row.original)}
            data-testid="duplicate-attr">
            Duplicate
          </button>
          {row.original.isActive ? (
            <button
              onClick={() => handleArchiveAttribute(row.original.id)}
              data-testid="archive-attr">
              Archive
            </button>
          ) : (
            <button
              onClick={() => handleRestoreAttribute(row.original.id)}
              data-testid="restore-attr">
              Restore
            </button>
          )}
        </div>
      )
    }
  ]
}));

vi.mock("@radix-ui/react-icons", () => ({
  MixIcon: () => <span>MixIcon</span>,
  Pencil1Icon: () => <span>Pencil1Icon</span>,
  CopyIcon: () => <span>CopyIcon</span>,
  ThickArrowUpIcon: () => <span>ThickArrowUpIcon</span>,
  ThickArrowDownIcon: () => <span>ThickArrowDownIcon</span>,
  DrawingPinIcon: () => <span>DrawingPinIcon</span>
}));

vi.mock("components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }) => <div data-testid="dropdown-menu">{children}</div>,
  DropdownMenuTrigger: ({ children }) => <div data-testid="dropdown-trigger">{children}</div>,
  DropdownMenuContent: ({ children }) => <div data-testid="dropdown-content">{children}</div>,
  DropdownMenuLabel: ({ children }) => <div data-testid="dropdown-label">{children}</div>,
  DropdownMenuItem: ({ children, onClick, "data-testid": testId }) => (
    <button onClick={onClick} data-testid={testId}>
      {children}
    </button>
  )
}));

vi.mock("lib/constants", () => ({
  attributeTypeIcons: {
    text: { icon: "TextIcon", label: "Text" },
    number: { icon: "NumberIcon", label: "Number" }
  }
}));

describe("ClientAttributes", () => {
  const mockProps = {
    handleAddAttribute: vi.fn(),
    handleEditAttribute: vi.fn(),
    handleDuplicateAttribute: vi.fn(),
    handleRestoreAttribute: vi.fn(),
    handleArchiveAttribute: vi.fn(),
    handlePagination: vi.fn(),
    clientAttributes: {
      attributesArray: [
        {
          id: "1",
          title: "Attribute 1",
          type: "text",
          required: true,
          isSystem: false,
          isActive: true
        },
        {
          id: "2",
          title: "Attribute 2",
          type: "number",
          required: false,
          isSystem: true,
          isActive: true
        },
        {
          id: "3",
          title: "Attribute 3",
          type: "text",
          required: false,
          isSystem: false,
          isActive: false
        }
      ],
      attributesMetaData: {
        currentPage: 1,
        pageLimit: 20,
        totalCount: 50,
        totalPages: 3
      }
    }
  };

  it("renders the component with correct data", () => {
    render(<ClientAttributes {...mockProps} />);

    expect(screen.getByText("New client attribute")).toBeInTheDocument();
    expect(screen.getByTestId("attributes-table")).toBeInTheDocument();
    expect(screen.getByTestId("pagination")).toBeInTheDocument();

    const rows = screen.getAllByTestId(/^row-/);
    expect(rows).toHaveLength(3);
    expect(within(rows[0]).getByText("Attribute 1")).toBeInTheDocument();
    expect(within(rows[1]).getByText("Attribute 2")).toBeInTheDocument();
    expect(within(rows[2]).getByText("Attribute 3")).toBeInTheDocument();
  });

  it("calls handleAddAttribute when the add button is clicked", () => {
    render(<ClientAttributes {...mockProps} />);
    fireEvent.click(screen.getByText("New client attribute"));
    expect(mockProps.handleAddAttribute).toHaveBeenCalledTimes(1);
  });

  it("calls handlePagination when pagination controls are used", () => {
    render(<ClientAttributes {...mockProps} />);
    fireEvent.click(screen.getByTestId("next-page"));
    expect(mockProps.handlePagination).toHaveBeenCalledWith("page", 2);

    fireEvent.change(screen.getByTestId("page-limit"), { target: { value: "50" } });
    expect(mockProps.handlePagination).toHaveBeenCalledWith("limit", 50);
  });

  it("renders rows with correct data and action buttons", () => {
    render(<ClientAttributes {...mockProps} />);
    const rows = screen.getAllByTestId(/^row-/);

    // Check first row (active, non-system attribute)
    expect(within(rows[0]).getByText("Attribute 1")).toBeInTheDocument();
    expect(within(rows[0]).getByTestId("type-cell")).toHaveTextContent("text");
    expect(within(rows[0]).getByText("Required")).toBeInTheDocument();
    expect(within(rows[0]).getByTestId("edit-attr")).toBeInTheDocument();
    expect(within(rows[0]).getByTestId("duplicate-attr")).toBeInTheDocument();
    expect(within(rows[0]).getByTestId("archive-attr")).toBeInTheDocument();

    // Check second row (active, system attribute)
    expect(within(rows[1]).getByText("Attribute 2")).toBeInTheDocument();
    expect(within(rows[1]).getByTestId("type-cell")).toHaveTextContent("number");
    expect(within(rows[1]).getByText("System")).toBeInTheDocument();
    expect(within(rows[1]).getByTestId("edit-attr")).toBeInTheDocument();
    expect(within(rows[1]).getByTestId("duplicate-attr")).toBeInTheDocument();
    expect(within(rows[1]).getByTestId("archive-attr")).toBeInTheDocument();

    // Check third row (archived attribute)
    expect(within(rows[2]).getByText("Attribute 3")).toBeInTheDocument();
    expect(within(rows[2]).getByTestId("type-cell")).toHaveTextContent("text");
    expect(within(rows[2]).queryByText("Required")).not.toBeInTheDocument();
    expect(within(rows[2]).queryByText("System")).not.toBeInTheDocument();
    expect(within(rows[2]).getByTestId("restore-attr")).toBeInTheDocument();
  });

  it("calls handleEditAttribute when edit button is clicked", () => {
    render(<ClientAttributes {...mockProps} />);
    const rows = screen.getAllByTestId(/^row-/);
    fireEvent.click(within(rows[0]).getByTestId("edit-attr"));
    expect(mockProps.handleEditAttribute).toHaveBeenCalledWith(
      mockProps.clientAttributes.attributesArray[0]
    );
  });

  it("calls handleDuplicateAttribute when duplicate button is clicked", () => {
    render(<ClientAttributes {...mockProps} />);
    const rows = screen.getAllByTestId(/^row-/);
    fireEvent.click(within(rows[0]).getByTestId("duplicate-attr"));
    expect(mockProps.handleDuplicateAttribute).toHaveBeenCalledWith(
      mockProps.clientAttributes.attributesArray[0]
    );
  });

  it("calls handleArchiveAttribute when archive button is clicked", () => {
    render(<ClientAttributes {...mockProps} />);
    const rows = screen.getAllByTestId(/^row-/);
    fireEvent.click(within(rows[0]).getByTestId("archive-attr"));
    expect(mockProps.handleArchiveAttribute).toHaveBeenCalledWith("1");
  });

  it("calls handleRestoreAttribute when restore button is clicked", () => {
    render(<ClientAttributes {...mockProps} />);
    const rows = screen.getAllByTestId(/^row-/);
    fireEvent.click(within(rows[2]).getByTestId("restore-attr"));
    expect(mockProps.handleRestoreAttribute).toHaveBeenCalledWith("3");
  });
});
