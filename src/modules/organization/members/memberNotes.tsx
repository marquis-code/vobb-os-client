import { IconArrowsSort, IconClipboardText, IconDotsVertical, IconPlus } from "@tabler/icons-react";
import { Button, TableEmptyState } from "components";
import { MemberFilters } from "./components/memberFilters";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "components/ui/dropdown-menu";
import { HandlerActionProps, MemberNotesProps } from "types";
import { MemberNote } from "./notesComponents/memberNote";
import { MemberNoteSkeleton } from "./notesComponents/memberNoteSkeleton";
import { useInfiniteScroll } from "hooks";

interface MemberProfileNotesProps {
  memberProfile: { avatar: string; fullName: string };
  handleOpenAddNote: () => void;
  handleOpenEditNote: (id: string) => void;
  allNotesFetch: {
    data: MemberNotesProps;
    loading: boolean;
    params: {
      page: number;
      limit: number;
      sort: "desc" | "asc" | undefined;
      visibility: "public" | "private" | undefined;
      start: string;
      end: string;
    };
    handleUpdateParams: (param: string, value: string | number) => void;
  };
  deleteNote: HandlerActionProps;
  updateVisibility: {
    submit: (id: string, isPublic: boolean, allowedMembers: string[]) => void;
    loading: boolean;
  };
  // deleteNotes: {
  //   submit: (id: string) => void;
  //   loading: boolean;
  // };
}

const MemberProfileNotesUI: React.FC<MemberProfileNotesProps> = ({
  handleOpenAddNote,
  allNotesFetch,
  deleteNote,
  updateVisibility,
  memberProfile,
  handleOpenEditNote
}) => {
  const { handleUpdateParams, params, loading: loadingNotes } = allNotesFetch;
  const { data: memberNotes, metaData } = allNotesFetch.data;
  const { visibility: activeTab } = params;
  const { loadMoreRef } = useInfiniteScroll(metaData, handleUpdateParams);
  return (
    <>
      <MemberFilters title={"Notes"}>
        <div className="flex items-center gap-3">
          <div className="relative h-8 flex bg-vobb-neutral-20 rounded-sm py-2 text-xs">
            <div
              className={`absolute top-0 left-0 h-full w-1/2 bg-white rounded-sm transition-all duration-300 ease-in-out border ${
                activeTab === "public" ? "translate-x-0" : "translate-x-full"
              }`}></div>
            <p
              onClick={() => handleUpdateParams("visibility", "public")}
              className={`flex-1 text-center cursor-pointer transition-colors relative z-10 px-3 ${
                activeTab === "public" ? "text-vobb-neutral-100" : "text-vobb-neutral-70"
              }`}
              data-testid="public-notes">
              Public
            </p>
            <p
              onClick={() => handleUpdateParams("visibility", "private")}
              className={`flex-1 text-center cursor-pointer transition-colors relative z-10 px-3 ${
                activeTab === "private" ? "text-vobb-neutral-100" : "text-vobb-neutral-70"
              }`}
              data-testid="private-notes">
              Private
            </p>
          </div>

          <SortColumn handleSetSort={handleUpdateParams} />
          <Button
            onClick={handleOpenAddNote}
            variant={"outline"}
            data-testid="add-note-button"
            className={
              "w-full justify-start text-left items-center font-normal text-xs h-8 py-1 px-2 gap-1 rounded-sm"
            }>
            <IconPlus size={16} color="#667085" /> Add Note
          </Button>

          <Menu handleDeleteNotes={console.log} />
        </div>
      </MemberFilters>
      <div>
        {!memberNotes?.length && !loadingNotes ? (
          <TableEmptyState
            pageIcon={<IconClipboardText size={25} color="#101323" />}
            title="No notes have been added."
            description="Keep track of important internal information and feedback related to this member by adding notes."
            ctaFunction={handleOpenAddNote}
            btnText="Add Note"
          />
        ) : (
          <div className="max-h-[610px] overflow-scroll">
            <div className="grid xl:grid-cols-2 gap-4 px-4 py-6 ">
              {memberNotes?.map((note) => (
                <MemberNote
                  key={note.id}
                  {...note}
                  memberProfile={memberProfile}
                  noteActions={{
                    deleteNote,
                    updateVisibility
                  }}
                  handleOpenEditNote={handleOpenEditNote}
                />
              ))}
              {loadingNotes &&
                Array(2)
                  .fill(null)
                  .map((_, index) => <MemberNoteSkeleton key={index} />)}
            </div>
            <div ref={loadMoreRef} className="h-4"></div>
          </div>
        )}
      </div>
    </>
  );
};

export { MemberProfileNotesUI };

const SortColumn = ({ handleSetSort }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className={
            "w-full justify-start text-left items-center font-normal text-xs h-8 py-1 px-3 gap-1 rounded-sm"
          }
          data-testid="sort-btn">
          <IconArrowsSort size={16} /> Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-lg px-1 space-y-1.5 w-[184px]">
        <DropdownMenuItem
          onClick={() => handleSetSort("desc")}
          className="gap-2 cursor-pointer text-vobb-neutral-70 text-xs"
          testId="sort-desc">
          Newest to Oldest
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleSetSort("asc")}
          className="gap-2 cursor-pointer text-vobb-neutral-70 text-xs"
          testId="sort-asc">
          Oldest to Newest
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface MenuProps {
  handleDeleteNotes: () => void;
}

const Menu = ({ handleDeleteNotes }: MenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 px-2 rounded-sm" data-testid="menu-notes">
          <span className="sr-only">Open menu</span>
          <IconDotsVertical size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-lg px-1 space-y-1.5 w-[184px]">
        <DropdownMenuItem
          onClick={handleDeleteNotes}
          className="gap-2 cursor-pointer text-xs text-error-30"
          data-testid="delete-notes">
          Delete Notes
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
