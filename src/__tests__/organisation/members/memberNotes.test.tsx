import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedMemberNotesData } from "lib";
import { MemberProfileNotesUI } from "modules";
import { vi } from "vitest";

const mockHandleOpenAddNote = vi.fn();
const mockHandleOpenEditNote = vi.fn();
const mockHandleUpdateParams = vi.fn();
const mockDeleteNoteSubmit = vi.fn();
const mockUpdateVisibilitySubmit = vi.fn();
const mockLoadMoreRef = { current: null };

vi.mock("hooks", () => ({
  useInfiniteScroll: () => ({ loadMoreRef: mockLoadMoreRef })
}));

describe("MemberProfileNotesUI", () => {
  const defaultProps = {
    handleOpenAddNote: mockHandleOpenAddNote,
    handleOpenEditNote: mockHandleOpenEditNote,
    allNotesFetch: {
      data: {
        data: MockedMemberNotesData,
        metaData: {
          currentPage: 1,
          totalCount: 50,
          totalPages: 5,
          pageLimit: 20
        }
      },
      loading: false,
      params: { page: 1, limit: 10, sort: undefined, visibility: undefined, start: "", end: "" },
      handleUpdateParams: mockHandleUpdateParams
    },
    deleteNote: { submit: mockDeleteNoteSubmit, loading: false },
    updateVisibility: { submit: mockUpdateVisibilitySubmit, loading: false },
    memberProfile: {
      avatar: "profile.png",
      fullName: "Jane Smith"
    }
  };

  it("renders the component with notes", () => {
    render(<MemberProfileNotesUI {...defaultProps} />);
    expect(screen.getByTestId("public-notes")).toBeInTheDocument();
    expect(screen.getByTestId("private-notes")).toBeInTheDocument();
    expect(screen.getByTestId("add-note-button")).toBeInTheDocument();
    expect(screen.getAllByTestId("member-note")).toHaveLength(5);
  });

  it("renders empty state when no notes are present", () => {
    const props = {
      ...defaultProps,
      allNotesFetch: {
        ...defaultProps.allNotesFetch,
        data: {
          data: [],

          metaData: {
            currentPage: 1,
            totalCount: 50,
            totalPages: 5,
            pageLimit: 20
          }
        },
        loading: false
      }
    };
    render(<MemberProfileNotesUI {...props} />);
    expect(screen.getByText("No notes have been added.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Keep track of important internal information and feedback related to this member by adding notes."
      )
    ).toBeInTheDocument();
  });

  it("calls handleOpenAddNote when 'Add Note' button is clicked", () => {
    render(<MemberProfileNotesUI {...defaultProps} />);
    fireEvent.click(screen.getByTestId("add-note-button"));
    expect(mockHandleOpenAddNote).toHaveBeenCalled();
  });

  it("switches visibility tabs", () => {
    render(<MemberProfileNotesUI {...defaultProps} />);
    fireEvent.click(screen.getByTestId("private-notes"));
    expect(mockHandleUpdateParams).toHaveBeenCalledWith("visibility", "private");
    fireEvent.click(screen.getByTestId("public-notes"));
    expect(mockHandleUpdateParams).toHaveBeenCalledWith("visibility", "public");
  });

  it("triggers sorting options", async () => {
    render(<MemberProfileNotesUI {...defaultProps} />);
    await userEvent.click(screen.getByTestId("sort-btn"));

    fireEvent.click(screen.getByTestId("sort-desc"));
    expect(mockHandleUpdateParams).toHaveBeenCalledWith("sort", "desc");
    fireEvent.click(screen.getByTestId("sort-asc"));
    expect(mockHandleUpdateParams).toHaveBeenCalledWith("sort", "asc");
  });

  it("renders a member note with correct data", () => {
    render(<MemberProfileNotesUI {...defaultProps} />);
    const notes = screen.getAllByTestId("member-note");
    const note = notes[0];
    expect(within(note).getByText("Meeting Notes")).toBeInTheDocument();
    expect(
      within(note).getByText("Discussed project milestones and assigned tasks.")
    ).toBeInTheDocument();
    expect(within(note).getByText("Alice Johnson")).toBeInTheDocument();
  });

  it("handles editing a note", () => {
    render(<MemberProfileNotesUI {...defaultProps} />);
    const notes = screen.getAllByTestId("note-body");
    const note = notes[0];
    fireEvent.click(note);
    expect(mockHandleOpenEditNote).toHaveBeenCalledWith("1");
  });

  it("handles deleting a note", async () => {
    render(<MemberProfileNotesUI {...defaultProps} />);
    const notes = screen.getAllByTestId("menu-note");
    const note = notes[0];
    await userEvent.click(note);
    fireEvent.click(screen.getByTestId("delete-note"));
    expect(mockDeleteNoteSubmit).toHaveBeenCalledWith("1");
  });

  it("changes note visibility", async () => {
    render(<MemberProfileNotesUI {...defaultProps} />);
    const notes = screen.getAllByTestId("change-visibility");
    const note = notes[0];
    await userEvent.click(note);
    fireEvent.click(screen.getAllByTestId("change-visibility-private")[0]);
    expect(mockUpdateVisibilitySubmit).toHaveBeenCalledWith("1", false, []);
  });
});
