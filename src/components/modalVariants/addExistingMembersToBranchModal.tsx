import { ExistingUserTypes, ModalProps, optionType } from "types";
import { Modal } from "../modal";
import { Button, LoadingSpinner } from "../ui";
import { CustomInput } from "../form";
import { useState } from "react";
import { Switch } from "components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { PlusCircledIcon } from "@radix-ui/react-icons";

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
      <Modal show={show} close={close}>
        <CustomInput
          placeholder="search"
          value={memberSearchQuery}
          onChange={(e) => handleSearch("search", e.target.value)}
        />

        <div className="max-h-60 overflow-scroll border-t border-vobb-neutral-30 mt-2 pt-2">
          {loadingMembers ? (
            <LoadingSpinner />
          ) : !members.length ? (
            <p className="my-4">No members found</p>
          ) : (
            members.map((member) => (
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
                    testId={member.label}
                  />
                </span>
              </div>
            ))
          )}
        </div>

        <Button
          onClick={handleSubmit}
          size={"default"}
          variant={"fill"}
          disabled={!selectedIds.length}
          loading={loadingSubmit}
          className="flex gap-2 mt-2 w-full">
          <PlusCircledIcon />
          Add Selected Members
        </Button>
      </Modal>
    </>
  );
};

export { AddExistingMembersToBranchModal };
