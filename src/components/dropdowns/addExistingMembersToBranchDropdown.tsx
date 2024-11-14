import { ExistingUserTypes, optionType } from "types";
import { Button, LoadingSpinner } from "../ui";
import { CustomInput } from "../form";
import { useState } from "react";
import { Switch } from "components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { ModalEmptyState } from "components";
import { IconPlus, IconX } from "@tabler/icons-react";

interface AddExistingMembersToBranchProps {
  submit: (data: string[]) => void;
  memberSearchQuery: string;
  members: ExistingUserTypes[];
  loadingSubmit: boolean;
  loadingMembers: boolean;
  handleSearch: (filter: string, value: string | number) => void;
}

const AddExistingMembersToBranchDropdown: React.FC<AddExistingMembersToBranchProps> = ({
  submit,
  members,
  loadingMembers,
  loadingSubmit,
  memberSearchQuery,
  handleSearch
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectMember = (member: optionType) => {
    if (selectedIds.find((item) => item === member.value)) {
      setSelectedIds((prev) => prev.filter((item) => item !== member.value));
    } else {
      setSelectedIds((prev) => [...prev, member.value]);
    }
  };
  const reset = () => setSelectedIds([]);
  const handleSubmit = () => {
    submit(selectedIds);
    reset();
  };
  return (
    <>
      <div className="p-2 border-b border-vobb-neutral-20 border rounded-lg">
        <CustomInput
          placeholder="Search members"
          value={memberSearchQuery}
          onChange={(e) => handleSearch("search", e.target.value)}
          data-testid="search-members"
          parentClassName="mb-2"
          className="text-xs"
        />
        <div>
          {loadingMembers ? (
            <LoadingSpinner />
          ) : !members?.length ? (
            <ModalEmptyState
              title="No members are available to add"
              description="Please ensure members belong to a team in this branch."
              pageIcon={<IconX size={20} color="#101323" />}
            />
          ) : (
            <div>
              <div className="max-h-60 overflow-scroll border-t border-vobb-neutral-30 pr-1 pt-1 space-y-0.5">
                {members.map((member, index) => (
                  <div
                    key={member.value}
                    className="flex items-center justify-between gap-4 w-full pl-2 py-[6px] text-xs">
                    <div className="flex gap-1 items-center">
                      <Avatar className="w-5 h-5">
                        <AvatarImage
                          src={
                            member.avatar instanceof File
                              ? URL.createObjectURL(member.avatar)
                              : member.avatar || ""
                          }
                          alt="profile picture"
                        />

                        <AvatarFallback className="text-[8px]">
                          {member.label.charAt(0)}
                          {member.label.charAt(1)}
                        </AvatarFallback>
                      </Avatar>

                      <p>{member.label}</p>
                    </div>

                    <span className="flex items-center gap-4">
                      <Switch
                        checked={selectedIds.includes(member.value)}
                        onCheckedChange={() => handleSelectMember(member)}
                        testId={`member-${index}`}
                        className="h-4 w-[26px]"
                        thumbClassname="h-[14px] w-[14px] data-[state=checked]:translate-x-[9px]"
                      />
                    </span>
                  </div>
                ))}
              </div>
              <Button
                onClick={handleSubmit}
                size={"default"}
                variant={"fill"}
                disabled={!selectedIds.length}
                loading={loadingSubmit}
                className="flex gap-1 mt-2 w-full rounded-sm items-end text-xs"
                data-testid="add-btn">
                <IconPlus size={16} />
                Add Selected Members
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { AddExistingMembersToBranchDropdown };
