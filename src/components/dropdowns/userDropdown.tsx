import { ReactNode, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { Button, LoadingSpinner } from "components/ui";
import { ExistingUserTypes } from "types";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { IconPlus, IconUser, IconX } from "@tabler/icons-react";
import { CustomInput } from "components/form";
import { Switch } from "components/ui/switch";
import { ModalEmptyState } from "components/emptyStates";

const MAX_TEXT_LENGTH = 32;

interface UsersDropdownProps {
  handleSetUsers: (user: ExistingUserTypes) => void;
  selectedUsers: ExistingUserTypes[];
  users: ExistingUserTypes[];
  loadingUsers: boolean;
  userSearchQuery: string;
  handleSearch: (filter: string, value: string | number) => void;
  trigger?: ReactNode;
}

const UsersDropdown: React.FC<UsersDropdownProps> = ({
  handleSetUsers,
  selectedUsers,
  users,
  loadingUsers,
  userSearchQuery,
  handleSearch,
  trigger
}) => {
  const [open, setOpen] = useState(false);
  const buttonText = formatAssignedToText(selectedUsers);
  const selectedUserLength = selectedUsers.length - 1;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger && selectedUsers.length <= 1 ? (
          trigger
        ) : trigger && selectedUserLength > 0 ? (
          <Button
            variant={"outline"}
            size={"icon"}
            data-testid="close-btn"
            className="flex items-center shadow-sm p-0 text-xs rounded-sm">
            <IconPlus size={10} /> {selectedUserLength}
          </Button>
        ) : (
          <Button
            variant={"outline"}
            className={
              "w-full justify-start text-left items-center font-normal text-xs h-9 py-1 px-3 gap-1"
            }>
            <>
              <IconUser className="-mt-0.5 text-vobb-neutral-100" size={16} /> {buttonText}
            </>
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-4" align="end" style={{ zIndex: 9999 }}>
        <CustomInput
          placeholder="search"
          value={userSearchQuery}
          onChange={(e) => handleSearch("search", e.target.value)}
          data-testid="search-members"
        />

        <div>
          {loadingUsers ? (
            <LoadingSpinner />
          ) : !users.length ? (
            <ModalEmptyState
              title="No members are available to add"
              description="Please ensure members belong to a team in this branch."
              pageIcon={<IconX size={20} color="#101323" />}
            />
          ) : (
            <div>
              <div className="max-h-60 overflow-scroll border-t border-vobb-neutral-30 mt-2 pt-2">
                {users.map((member, index) => (
                  <div
                    key={member.value}
                    className="flex items-center justify-between gap-4 w-full mb-4 pr-2">
                    <div className="flex gap-4 items-center">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={
                            member.avatar instanceof File
                              ? URL.createObjectURL(member.avatar)
                              : member.avatar || ""
                          }
                          alt="profile picture"
                        />

                        <AvatarFallback>
                          {member.label.charAt(0)}
                          {member.label.charAt(1)}
                        </AvatarFallback>
                      </Avatar>

                      <p>{member.label}</p>
                    </div>

                    <span className="flex items-center gap-4">
                      <Switch
                        checked={selectedUsers.some((item) => item.value === member.value)}
                        onCheckedChange={() => handleSetUsers(member)}
                        testId={`member-${index}`}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
export { UsersDropdown };

function formatAssignedToText(selectedUsers: ExistingUserTypes[]): string {
  const userNames = selectedUsers.map((user) => user.label);

  if (userNames.length === 0) return "Assign To You";

  let text = "Assign To You";

  if (userNames.length === 1) {
    text = `Assign To You`;
  } else if (userNames.length === 2) {
    text = `Assign To You and ${userNames[1]}`;
  } else if (userNames.length === 3) {
    text = `Assign To You, ${userNames[1]}, and ${userNames[2]}`;
  } else if (userNames.length > 3) {
    text = `Assign To You, ${userNames[1]}, and ${userNames.length - 1} others`;
  }

  return text.length > MAX_TEXT_LENGTH ? `${text.slice(0, MAX_TEXT_LENGTH - 3)}...` : text;
}
