import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ClientGroupTable } from "components/tables/clientGroupTable";

// Import the types we need from @tanstack/react-table
import { useReactTable, Table } from "@tanstack/react-table";

// Mock dependencies
vi.mock("components/ui/table", () => ({
  Table: ({ children }) => <table>{children}</table>,
  TableHeader: ({ children }) => <thead>{children}</thead>,
  TableBody: ({ children }) => <tbody>{children}</tbody>,
  TableHead: ({ children, className }) => <th className={className}>{children}</th>,
  TableRow: ({ children, "data-state": dataState }) => (
    <tr data-state={dataState}>{children}</tr>
  ),
  TableCell: ({ children, className, testId }) => (
    <td className={className} data-testid={testId}>
      {children}
    </td>
  )
}));

// Create a mock table instance with only the methods we need
// Use type assertion to tell TypeScript this is sufficient for our tests
const mockTableInstance = {
  getHeaderGroups: () => [
    {
      id: "headerGroup1",
      headers: [
        { id: "header1", isPlaceholder: false, column: { columnDef: { header: "Header 1" } }, getContext: () => ({}) },
        { id: "header2", isPlaceholder: false, column: { columnDef: { header: "Header 2" } }, getContext: () => ({}) }
      ]
    }
  ],
  getRowModel: () => ({
    rows: [
      {
        id: "row1",
        getIsSelected: () => false,
        getVisibleCells: () => [
          { id: "cell1", getValue: () => "Value 1", column: { columnDef: { cell: "Cell 1" } }, getContext: () => ({}) },
          { id: "cell2", getValue: () => "Value 2", column: { columnDef: { cell: "Cell 2" } }, getContext: () => ({}) }
        ]
      },
      {
        id: "row2",
        getIsSelected: () => false,
        getVisibleCells: () => [
          { id: "cell3", getValue: () => "Value 3", column: { columnDef: { cell: "Cell 3" } }, getContext: () => ({}) },
          { id: "cell4", getValue: () => "Value 4", column: { columnDef: { cell: "Cell 4" } }, getContext: () => ({}) }
        ]
      }
    ]
  })
} as unknown as Table<any>;

// Create an empty table instance for the empty test
const emptyTableInstance = {
  getHeaderGroups: () => [
    {
      id: "headerGroup1",
      headers: [
        { id: "header1", isPlaceholder: false, column: { columnDef: { header: "Header 1" } }, getContext: () => ({}) },
        { id: "header2", isPlaceholder: false, column: { columnDef: { header: "Header 2" } }, getContext: () => ({}) }
      ]
    }
  ],
  getRowModel: () => ({
    rows: []
  })
} as unknown as Table<any>;

// Mock the entire @tanstack/react-table module
vi.mock("@tanstack/react-table", () => {
  return {
    flexRender: (component) => component,
    getCoreRowModel: () => ({}),
    useReactTable: vi.fn().mockImplementation(() => mockTableInstance)
  };
});

describe("ClientGroupTable", () => {
  const mockColumns = [
    {
      accessorKey: "name",
      header: "Group name",
      cell: ({ row }) => <span>{row.original.name}</span>
    },
    {
      accessorKey: "clients",
      header: "No. of clients",
      cell: ({ row }) => <span>{row.original.clients}</span>
    }
  ];

  const mockData = [
    { id: "1", name: "Family Summer Vacation", clients: 12 },
    { id: "2", name: "Health Check-up Group", clients: 8 }
  ];

  it("renders the table with correct structure", () => {
    render(<ClientGroupTable columns={mockColumns} data={mockData} />);
    
    // Check if table elements are rendered
    expect(document.querySelector("table")).toBeInTheDocument();
    expect(document.querySelector("thead")).toBeInTheDocument();
    expect(document.querySelector("tbody")).toBeInTheDocument();
    
    // Check if headers are rendered
    expect(screen.getByText("Header 1")).toBeInTheDocument();
    expect(screen.getByText("Header 2")).toBeInTheDocument();
    
    // Check if cells are rendered
    expect(screen.getByText("Cell 1")).toBeInTheDocument();
    expect(screen.getByText("Cell 2")).toBeInTheDocument();
    expect(screen.getByText("Cell 3")).toBeInTheDocument();
    expect(screen.getByText("Cell 4")).toBeInTheDocument();
  });

  it("renders empty message when no rows", () => {
    // Override the implementation for this test only
    vi.mocked(useReactTable).mockImplementationOnce(() => emptyTableInstance);
    
    render(<ClientGroupTable columns={mockColumns} data={[]} />);
    
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });
});