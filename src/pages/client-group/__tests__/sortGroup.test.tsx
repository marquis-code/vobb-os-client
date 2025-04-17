import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import SortGroup from "modules/client-group/sort-group";
import userEvent from "@testing-library/user-event";

// Mock dependencies
vi.mock("components", () => ({
  Button: ({ children, onClick, variant, className }) => (
    <button onClick={onClick} className={className} data-variant={variant}>
      {children}
    </button>
  )
}));

vi.mock("components/ui/dropdown-menu", () => {
  // Create a mock implementation that tracks state
  let isOpen = false;
  let onOpenChangeFn = vi.fn();
  
  return {
    DropdownMenu: ({ children, open, onOpenChange }) => {
      isOpen = open !== undefined ? open : isOpen;
      onOpenChangeFn = onOpenChange || onOpenChangeFn;
      
      return (
        <div data-testid="dropdown-menu" data-open={isOpen}>
          {children}
          {/* Add buttons to control the dropdown state for testing */}
          <button data-testid="open-dropdown" onClick={() => onOpenChangeFn(true)}>
            Open Dropdown
          </button>
          <button data-testid="close-dropdown" onClick={() => onOpenChangeFn(false)}>
            Close Dropdown
          </button>
        </div>
      );
    },
    DropdownMenuTrigger: ({ children, asChild }) => (
      <div data-testid="dropdown-trigger">{children}</div>
    ),
    DropdownMenuContent: ({ children, align, alignOffset, className }) => (
      <div data-testid="dropdown-content" className={className}>
        {children}
      </div>
    ),
    DropdownMenuItem: ({ children, className, onSelect, "data-testid": testId }) => (
      <div
        data-testid={testId || "dropdown-item"}
        className={className}
        onClick={(e) => onSelect && onSelect(e)}>
        {children}
      </div>
    )
  };
});

vi.mock("components/ui/popover", () => {
  // Create a mock implementation that tracks state
  let isOpen = false;
  let onOpenChangeFn = vi.fn();
  
  return {
    Popover: ({ children, open, onOpenChange }) => {
      isOpen = open !== undefined ? open : isOpen;
      onOpenChangeFn = onOpenChange || onOpenChangeFn;
      
      return (
        <div data-testid="popover" data-open={isOpen}>
          {children}
          {/* Add buttons to control the popover state for testing */}
          <button data-testid="open-popover" onClick={() => onOpenChangeFn(true)}>
            Open Popover
          </button>
          <button data-testid="close-popover" onClick={() => onOpenChangeFn(false)}>
            Close Popover
          </button>
        </div>
      );
    },
    PopoverTrigger: ({ children, asChild }) => (
      <div data-testid="popover-trigger">{children}</div>
    ),
    PopoverContent: ({ children, className, sideOffset, side, align }) => (
      <div data-testid="popover-content" className={className}>
        {children}
      </div>
    )
  };
});

describe("SortGroup", () => {
  const mockHandleParams = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the sort button correctly", () => {
    render(<SortGroup handleParams={mockHandleParams} />);
    
    expect(screen.getByText("Sort")).toBeInTheDocument();
  });

  it("opens dropdown menu when triggered", async () => {
    render(<SortGroup handleParams={mockHandleParams} />);
    
    // Use the test button to open the dropdown
    const openButton = screen.getByTestId("open-dropdown");
    await userEvent.click(openButton);
    
    expect(screen.getByTestId("dropdown-menu")).toHaveAttribute("data-open", "true");
  });

  it("shows date created option in dropdown", async () => {
    render(<SortGroup handleParams={mockHandleParams} />);
    
    // Use the test button to open the dropdown
    const openButton = screen.getByTestId("open-dropdown");
    await userEvent.click(openButton);
    
    // Check if the date created option is rendered
    expect(screen.getByTestId("date-created")).toBeInTheDocument();
  });

  it("opens popover when date created is clicked", async () => {
    render(<SortGroup handleParams={mockHandleParams} />);
    
    // Use the test button to open the dropdown
    const openButton = screen.getByTestId("open-dropdown");
    await userEvent.click(openButton);
    
    // Click on date created option
    const dateCreatedOption = screen.getByTestId("date-created");
    await userEvent.click(dateCreatedOption);
    
    // Use the test button to open the popover
    const openPopoverButton = screen.getByTestId("open-popover");
    await userEvent.click(openPopoverButton);
    
    expect(screen.getByTestId("popover")).toHaveAttribute("data-open", "true");
  });

  it("calls handleParams with asc when ascending is selected", async () => {
    render(<SortGroup handleParams={mockHandleParams} />);
    
    // Simulate selecting ascending option
    // This is a direct test of the function, not through UI interaction
    const component = screen.getByTestId("dropdown-menu");
    
    // Find and click the asc option directly
    const ascOption = screen.getByTestId("asc");
    await userEvent.click(ascOption);
    
    expect(mockHandleParams).toHaveBeenCalledWith("sort", "asc");
  });

  it("calls handleParams with desc when descending is selected", async () => {
    render(<SortGroup handleParams={mockHandleParams} />);
    
    // Simulate selecting descending option
    // This is a direct test of the function, not through UI interaction
    const component = screen.getByTestId("dropdown-menu");
    
    // Find and click the desc option directly
    const descOption = screen.getByTestId("desc");
    await userEvent.click(descOption);
    
    expect(mockHandleParams).toHaveBeenCalledWith("sort", "desc");
  });
});