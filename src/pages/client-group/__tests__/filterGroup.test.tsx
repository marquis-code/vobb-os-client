import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import FilterGroup from "modules/client-group/filter-group";
import userEvent from "@testing-library/user-event";
import { MockPipeline } from  "pages/client-group/__mocks__/types";


vi.mock("components/ui/button", () => ({
  Button: ({ children, onClick, variant, className }) => (
    <button onClick={onClick} className={className} data-variant={variant}>
      {children}
    </button>
  )
}));

vi.mock("components/ui/dropdown-menu", () => {
  let isOpen = false;
  let onOpenChangeFn = vi.fn();
  
  return {
    DropdownMenu: ({ children, open, onOpenChange }) => {
      isOpen = open !== undefined ? open : isOpen;
      onOpenChangeFn = onOpenChange || onOpenChangeFn;
      
      return (
        <div data-testid="dropdown-menu" data-open={isOpen}>
          {children}
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
    DropdownMenuContent: ({ children, align, className }) => (
      <div data-testid="dropdown-content" className={className}>
        {children}
      </div>
    )
  };
});

vi.mock("components/ui/popover", () => {
  let isOpen = false;
  let onOpenChangeFn = vi.fn();
  
  return {
    Popover: ({ children, open, onOpenChange }) => {
      isOpen = open !== undefined ? open : isOpen;
      onOpenChangeFn = onOpenChange || onOpenChangeFn;
      
      return (
        <div data-testid="popover" data-open={isOpen}>
          {children}
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

vi.mock("components/ui/radio-group", () => ({
  RadioGroup: ({ children, value, onValueChange }) => (
    <div data-testid="radio-group" data-value={value}>
      {children}
      <button 
        data-testid="radio-change-button" 
        onClick={() => onValueChange && onValueChange("pipeline1")}>
        Select Pipeline 1
      </button>
    </div>
  ),
  RadioGroupItem: ({ value, id, className }) => (
    <input
      type="radio"
      value={value}
      id={id}
      className={className}
      data-testid={`radio-${value}`}
    />
  )
}));

vi.mock("components/ui/label", () => ({
  Label: ({ children, htmlFor, className }) => (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  )
}));

describe("FilterGroup", () => {
  const mockPipelines = [
    { _id: "pipeline1", name: "Pipeline 1" },
    { _id: "pipeline2", name: "Pipeline 2" }
  ] as MockPipeline[];
  
  const mockHandleParams = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the filter button correctly", () => {
    render(<FilterGroup pipelines={mockPipelines} handleParams={mockHandleParams} />);
    
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  it("opens dropdown menu when filter button is clicked", async () => {
    render(<FilterGroup pipelines={mockPipelines} handleParams={mockHandleParams} />);
    

    const openButton = screen.getByTestId("open-dropdown");
    await userEvent.click(openButton);
    
    expect(screen.getByTestId("dropdown-menu")).toHaveAttribute("data-open", "true");
  });

  it("shows pipeline option in dropdown", async () => {
    render(<FilterGroup pipelines={mockPipelines} handleParams={mockHandleParams} />);
    

    const openButton = screen.getByTestId("open-dropdown");
    await userEvent.click(openButton);
    
    expect(screen.getByTestId("dropdown-content").textContent).toContain("Pipeline");
  });

  it("opens pipeline popover when pipeline option is clicked", async () => {
    render(<FilterGroup pipelines={mockPipelines} handleParams={mockHandleParams} />);
    

    const openButton = screen.getByTestId("open-dropdown");
    await userEvent.click(openButton);
    
    const openPopoverButton = screen.getByTestId("open-popover");
    await userEvent.click(openPopoverButton);
    
    expect(screen.getByTestId("popover")).toHaveAttribute("data-open", "true");
  });

  it("calls handleParams when a pipeline is selected", async () => {
    render(<FilterGroup pipelines={mockPipelines} handleParams={mockHandleParams} />);
    

    const radioChangeButton = screen.getByTestId("radio-change-button");
    await userEvent.click(radioChangeButton);
    
    expect(mockHandleParams).toHaveBeenCalledWith("pipeline", "pipeline1");
  });
});