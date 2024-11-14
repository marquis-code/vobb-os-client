import { ExistingUserTypes, ModalProps, optionType } from "types";
import { Modal } from "../modal";
import { Button, LoadingSpinner } from "../ui";
import { CustomInput } from "../form";
import { useState } from "react";
import { Switch } from "components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { ModalEmptyState } from "components";
import { IconPlus, IconX } from "@tabler/icons-react";

interface AddExistingMembersToBranchProps extends ModalProps {
  submit: (data: string[]) => void;
  memberSearchQuery: string;
  members: ExistingUserTypes[];
  loadingSubmit: boolean;
  loadingMembers: boolean;
  handleSearch: (filter: string, value: string | number) => void;
}

const AddExistingMembersToBranchModal: React.FC<AddExistingMembersToBranchProps> = ({
  show,
  close,
  submit,
  members,
  loadingMembers,
  loadingSubmit,
  memberSearchQuery,
  handleSearch
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectMember = (member: optionType) => {
    // check if member is seleted
    if (selectedIds.find((item) => item === member.value)) {
      // remove
      setSelectedIds((prev) => prev.filter((item) => item !== member.value));
    } else {
      // add
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
      <div className="p-4 border-b border-vobb-neutral-20">
        <CustomInput
          placeholder="search"
          value={memberSearchQuery}
          onChange={(e) => handleSearch("search", e.target.value)}
          data-testid="search-members"
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
              <div className="max-h-60 overflow-scroll border-t border-vobb-neutral-30 mt-2 pt-2">
                {members.map((member, index) => (
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
                        checked={selectedIds.includes(member.value)}
                        onCheckedChange={() => handleSelectMember(member)}
                        testId={`member-${index}`}
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
                className="flex gap-2 mt-2 w-full"
                data-testid="add-btn">
                <IconPlus size={18} />
                Add Selected Members
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { AddExistingMembersToBranchModal };
