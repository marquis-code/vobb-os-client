import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Button, toast } from "components";
import { IconClockHour5, IconDotsVertical, IconLock, IconLockOpen } from "@tabler/icons-react";
import { HandlerActionProps, MemberNotesData } from "types";
import { shortenText } from "lib";

interface MemberNoteProps extends MemberNotesData {
  memberProfile: { avatar: string; fullName: string };
  handleOpenEditNote: (id: string) => void;
  noteActions: {
    deleteNote: HandlerActionProps;
    updateVisibility: {
      submit: (id: string, isPublic: boolean, allowedMembers: string[]) => void;
      loading: boolean;
    };
  };
}
const MemberNote: React.FC<MemberNoteProps> = ({
  id,
  title,
  body,
  creator,
  createdAt,
  isPublic,
  memberProfile,
  noteActions,
  handleOpenEditNote
}) => {
  const { deleteNote, updateVisibility } = noteActions;
  const { submit: handleDeleteNote } = deleteNote;
  const { submit: handleUpdateVisibility } = updateVisibility;

  const handleCopyNote = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({ description: "Text copied to clipboard" });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: "Failed to copy"
        });
      });
  };
  return (
    <div
      className="border rounded-md h-[216px] text-xs  overflow-hidden flex flex-col justify-between"
      data-testid="member-note">
      <div className="flex items-center justify-between p-4 border-b border-vobb-neutral-20 bg-vobb-neutral-10">
        <div className="flex items-center gap-3">
          <Button
            variant={"outline"}
            className={
              "w-fit justify-start text-left items-center font-normal text-xs h-7 p-2 gap-1 rounded-sm"
            }>
            <Avatar className="w-5 h-5">
              <AvatarImage src={memberProfile.avatar} alt="profile picture" />

              <AvatarFallback className="text-[10px]">
                {memberProfile.fullName.charAt(0)}
                {memberProfile.fullName.charAt(1)}
              </AvatarFallback>
            </Avatar>
            <p>{memberProfile.fullName}</p>
          </Button>

          {/* <Button
            variant={"outline"}
            size={"icon"}
            data-testid="close-btn"
            className="flex items-center shadow-sm p-0 text-xs h-7 rounded-sm">
            <IconPlus size={10} /> 1
          </Button> */}
        </div>

        <div className="flex items-center gap-3">
          <VisibilityDropdown
            id={id}
            handleUpdateVisibility={handleUpdateVisibility}
            isPublic={isPublic}
          />
          <Menu
            handleDeleteNote={() => handleDeleteNote(id)}
            handleCopyNote={() => handleCopyNote(body)}
          />
        </div>
      </div>

      <p
        className="max-h-[112px] flex flex-col py-3 px-4 flex-1 cursor-pointer"
        onClick={() => handleOpenEditNote(id)}
        data-testid="note-body">
        <p className="text-sm mb-1">{shortenText(title, 20)}</p>
        <p className="text-xs text-vobb-neutral-50">{shortenText(body, 100)}</p>
      </p>

      <div className="flex items-center justify-between p-4 border-t border-vobb-neutral-20 bg-vobb-neutral-10">
        <Button
          variant={"ghost"}
          className={
            "w-fit justify-start text-left items-center font-normal text-xs h-7 p-2 gap-1 rounded-sm"
          }>
          <Avatar className="w-5 h-5">
            <AvatarImage src={creator.avatar} alt="profile picture" />

            <AvatarFallback className="text-[10px]">
              {creator.name.charAt(0)}
              {creator.name.charAt(1)}
            </AvatarFallback>
          </Avatar>
          <p>{creator.name}</p>
        </Button>

        <Button
          variant={"ghost"}
          className="flex items-center text-vobb-neutral-70 capitalize text-xs h-7 rounded-sm gap-2">
          <IconClockHour5 size={16} />
          <span>{createdAt}</span>
        </Button>
      </div>
    </div>
  );
};

export { MemberNote };

const VisibilityDropdown = ({ id, handleUpdateVisibility, isPublic }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className="text-vobb-neutral-70 capitalize text-xs h-7 rounded-sm "
          data-testid="change-visibility">
          {" "}
          {isPublic ? (
            <span className=" flex gap-1" data-testid="change-visibility-public">
              <IconLockOpen size={14} /> Public
            </span>
          ) : (
            <span className=" flex gap-1 " data-testid="change-visibility-private">
              <IconLock size={14} />
              Private
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-lg px-1 space-y-1.5 w-[184px]">
        <DropdownMenuItem
          onClick={() => handleUpdateVisibility(id, false, [])}
          className="flex gap-2 items-center cursor-pointer text-vobb-neutral-70 text-xs"
          testId="private-note">
          Private
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleUpdateVisibility(id, true, [])}
          className="flex gap-2 items-center cursor-pointer text-vobb-neutral-70 text-xs"
          testId="public-note">
          Public
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface MenuProps {
  handleCopyNote: () => void;
  handleDeleteNote: () => void;
}

const Menu = ({ handleCopyNote, handleDeleteNote }: MenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-7 px-2 rounded-sm" data-testid="menu-note">
          <span className="sr-only">Open menu</span>
          <IconDotsVertical size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-lg px-1 space-y-1.5 w-[184px]">
        <DropdownMenuItem
          onClick={handleCopyNote}
          className="flex gap-2 items-center cursor-pointer text-vobb-neutral-70 text-xs"
          data-testid="copy-note">
          Copy Note
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDeleteNote}
          className="gap-2 cursor-pointer text-xs text-error-30"
          data-testid="delete-note">
          Delete Note
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
