import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NotificationsUI } from "modules";

// Mock all notice components to ensure consistent testing

describe("NotificationsUI", () => {
  const mockSubmit = vi.fn();
  const defaultProps = {
    submit: mockSubmit,
    loading: false
  };

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it("renders all notification sections with correct initial states", () => {
    render(<NotificationsUI {...defaultProps} />);

    // Verify header
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("In-app")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Push Notification")).toBeInTheDocument();

    // Verify all sections are rendered
    expect(screen.getByText("Client Management")).toBeInTheDocument();
    expect(screen.getByText("Task Management")).toBeInTheDocument();
    expect(screen.getByText("System Alerts")).toBeInTheDocument();
    expect(screen.getByText("Booking & Payment Notifications")).toBeInTheDocument();
    expect(screen.getByText("Pipeline Stage Process")).toBeInTheDocument();
    expect(screen.getByText("Security Alerts")).toBeInTheDocument();
  });

  it("renders switches with correct initial states", () => {
    render(<NotificationsUI {...defaultProps} />);

    // Client Management switches
    expect(screen.getByTestId("client-mgt-app")).toBeChecked();
    expect(screen.getByTestId("client-mgt-email")).toBeChecked();
    expect(screen.getByTestId("client-mgt-popup")).not.toBeChecked();

    // Task Management switches
    expect(screen.getByTestId("task-mgt-app")).not.toBeChecked();
    expect(screen.getByTestId("task-mgt-email")).not.toBeChecked();
    expect(screen.getByTestId("task-mgt-popup")).not.toBeChecked();
  });

  it("calls submit with correct parameters when switches are toggled", () => {
    render(<NotificationsUI {...defaultProps} />);

    // Toggle Client Management in-app notification
    fireEvent.click(screen.getByTestId("client-mgt-app"));
    expect(mockSubmit).toHaveBeenCalledWith({ enable: false });

    // Toggle Task Management email notification
    fireEvent.click(screen.getByTestId("task-mgt-email"));
    expect(mockSubmit).toHaveBeenCalledWith({ enable: true });

    // Toggle System Alerts popup notification
    fireEvent.click(screen.getByTestId("system-alert-popup"));
    expect(mockSubmit).toHaveBeenCalledWith({ enable: true });
  });

  it("disables all switches when loading is true", () => {
    render(<NotificationsUI {...defaultProps} loading={true} />);

    // Check if all switches are disabled
    const switches = screen.getAllByRole("switch");
    switches.forEach((switchElement) => {
      expect(switchElement).toBeDisabled();
    });
  });

  it("renders switches with correct ARIA attributes", () => {
    render(<NotificationsUI {...defaultProps} />);

    const switches = screen.getAllByRole("switch");
    switches.forEach((switchElement) => {
      expect(switchElement).toHaveAttribute("role", "switch");
      expect(switchElement).toHaveAttribute("aria-checked");
    });
  });
});
