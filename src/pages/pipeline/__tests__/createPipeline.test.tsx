import { render, screen } from "@testing-library/react";
import { CreatePipeline } from "../createPipeline";
import { vi } from "vitest";
import * as hooks from "hooks";

// Mock the hooks
vi.mock("hooks", () => ({
  useApiRequest: vi.fn(() => ({
    run: vi.fn(),
    data: null,
    requestStatus: { isPending: false },
    error: null
  }))
}));

// Mock the components
vi.mock("components", () => ({
  CreatePipelineModal: ({ show }) => (show ? <div data-testid="createPipeline-modal" /> : null),
  CreatePipelineSuccessModal: ({ show }) => (show ? <div data-testid="createPipeline-success-modal" /> : null),
  CreatePipelineErrorModal: ({ show }) => (show ? <div data-testid="createPipeline-error-modal" /> : null),
  EditPipelineStagesModal: ({ show }) => (show ? <div data-testid="edit-pipeline-stages-modal" /> : null)
}));

describe("CreatePipeline", () => {
  const defaultProps = {
    show: true,
    close: vi.fn(),
    showFailureModal: false,
    showSuccessModal: false,
    setShowFailureModal: vi.fn(),
    setShowSuccessModal: vi.fn(),
    onPipelineUpdate: vi.fn()
  };

  it("renders CreatePipelineModal when show is true", () => {
    render(<CreatePipeline {...defaultProps} />);
    expect(screen.getByTestId("createPipeline-modal")).toBeInTheDocument();
  });

  it("renders CreatePipelineSuccessModal when showSuccessModal is true", () => {
    render(<CreatePipeline {...defaultProps} showSuccessModal />);
    expect(screen.getByTestId("createPipeline-success-modal")).toBeInTheDocument();
  });

  it("renders CreatePipelineErrorModal when showFailureModal is true", () => {
    render(<CreatePipeline {...defaultProps} showFailureModal />);
    expect(screen.getByTestId("createPipeline-error-modal")).toBeInTheDocument();
  });
});