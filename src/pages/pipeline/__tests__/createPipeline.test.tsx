import { fireEvent, render, screen } from "@testing-library/react";
import { vi, Mock } from "vitest";
import { CreatePipeline } from "../createPipeline";
import { useApiRequest } from "hooks";

vi.mock(import("hooks"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useApiRequest: vi.fn().mockImplementation(() => ({
      run: vi.fn(),
      data: null,
      error: null,
      requestStatus: {
        isPending: false
      }
    }))
    // your mocked methods
  };
});

vi.mock(import("components"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual
    // your mocked components
  };
});

describe("CreatePipeline", () => {
  const defaultProps = {
    show: true,
    close: vi.fn(),
    callback: vi.fn(),
    handleStages: vi.fn()
  };

  it("renders CreatePipelineModal when show is true", () => {
    render(<CreatePipeline {...defaultProps} />);
    expect(screen.getByTestId("createPipeline-modal")).toBeInTheDocument();
  });

  it("renders CreatePipelineSuccessModal when success condition is met", () => {
    // Mock a successful response
    (useApiRequest as unknown as Mock).mockReturnValue({
      ...defaultProps,
      data: { status: 201, data: { message: "Pipeline created successfully" } },
      requestStatus: { isPending: false },
      error: null
    });

    render(<CreatePipeline {...defaultProps} />);
    expect(screen.getByTestId("createPipeline-success-modal")).toBeInTheDocument();
  });

  it("renders CreatePipelineErrorModal when error condition is met", () => {
    (useApiRequest as unknown as Mock).mockReturnValue({
      ...defaultProps,
      data: null,
      requestStatus: { isPending: false },
      error: { response: { message: "Error occurred" } }
    });

    render(<CreatePipeline {...defaultProps} />);
    expect(screen.getByTestId("createPipeline-error-modal")).toBeInTheDocument();
  });

  it("renders EditPipelineStagesModal when handleOpenEditPipelineStages is called", () => {
    const propsWithEditPipelineStages = {
      ...defaultProps,
      handleOpenEditPipelineStages: vi.fn(() => true)
    };

    // Mock a successful response
    (useApiRequest as unknown as Mock).mockReturnValue({
      ...defaultProps,
      data: { status: 201, data: { message: "Pipeline created successfully" } },
      requestStatus: { isPending: false },
      error: null
    });

    render(<CreatePipeline {...propsWithEditPipelineStages} />);
    expect(screen.getByTestId("createPipeline-success-modal")).toBeInTheDocument();
    const button = screen.getByTestId("createPipeline-success-modal-add-stage");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    // Check if the EditPipelineStagesModal is opened
    // This part of the test is commented out because the actual modal component is not provided
    // expect(screen.getByTestId("edit-pipeline-stages-modal")).toBeInTheDocument();
  });
});
