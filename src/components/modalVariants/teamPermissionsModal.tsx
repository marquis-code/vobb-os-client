import { ChevronDownIcon, ChevronUpIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Button, CheckboxWithText } from "components";
import { Modal } from "components/modal";
import { useState } from "react";
import { ModalProps } from "types";

interface TeamPermissionsModalProps extends ModalProps {
  submit: (data) => void;
  loading?: boolean;
  hideSkip?: boolean;
}

const TeamPermissionsModal = ({ show, close, hideSkip }: TeamPermissionsModalProps) => {
  // This list is from the backend
  const permissionList: PermissionItem[] = [
    {
      title: "Create client",
      id: "123",
      members: []
    },
    {
      title: "Edit client",
      id: "1234",
      members: []
    },
    {
      title: "Add member to team",
      id: "1235",
      members: []
    }
  ];

  const [permissions, setPermissions] = useState(permissionList);
  const handleSubmit = () => {
    console.log(permissions);
  };
  return (
    <>
      <Modal contentClassName="max-w-[944px] p-0" show={show} close={close}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-vobb-neutral-15">
          <h2 className="text-lg font-medium text-vobb-neutral-95">Set Team Permissions</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"} className="border p-2 shadow-sm">
            <Cross1Icon stroke="currentColor" strokeWidth={1} className="w-6 h-6" />
          </Button>
        </div>
        <section className="max-h-[calc(100vh-200px)] overflow-auto -mr-4 pr-4">
          {permissions.map((permission) => (
            <PermissionItemComponent
              {...permission}
              handleMembers={({ id, members }) =>
                setPermissions((prev) =>
                  prev.map((item) => (item.id === id ? { ...item, members } : item))
                )
              }
            />
          ))}
        </section>
        <div className="flex justify-end gap-2 mt-4">
          {!hideSkip ? (
            <Button
              onClick={() => close()}
              // className="text-error-10"
              size={"default"}
              variant={"outline"}>
              Skip
            </Button>
          ) : (
            ""
          )}
          <Button onClick={handleSubmit} size={"default"} variant={"fill"}>
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

type role = "lead" | "manager" | "member";

export interface PermissionItem {
  title: string;
  id: string;
  members: role[];
}

interface PermissionProps extends PermissionItem {
  handleMembers: ({ id, members }: { id: string; members: role[] }) => void;
}

export const PermissionItemComponent: React.FC<PermissionProps> = ({
  title,
  id,
  members,
  handleMembers
}) => {
  const [show, setShow] = useState(false);

  const handleCheck = (role: role) => {
    let newList: role[];

    if (members.find((item) => item === role)) {
      newList = members.filter((item) => item !== role);
    } else {
      newList = [...members, role];
    }

    handleMembers({ id, members: newList });
  };

  const handleCheckAll = () => {
    handleMembers({ id, members: members.length !== 3 ? ["lead", "member", "manager"] : [] });
  };

  const handleToggle = () => setShow((prev) => !prev);

  return (
    <div className="mb-3">
      <div role="button" onClick={handleToggle} className="flex items-center justify-between ">
        <p className="font-medium ">
          {title}{" "}
          <span className="text-xs font-normal">
            ({members.length} member{members.length !== 1 ? "s" : ""})
          </span>
        </p>
        {!show ? <ChevronDownIcon /> : <ChevronUpIcon />}
      </div>
      {show && (
        <div className="grid gap-2 mt-2">
          <CheckboxWithText
            labelClassName="text-xs font-normal"
            label={"All"}
            handleChecked={handleCheckAll}
            checked={members.length === 3}
          />
          <CheckboxWithText
            labelClassName="text-xs font-normal"
            label={"Team lead"}
            handleChecked={() => handleCheck("lead")}
            checked={members.find((item) => item === "lead") ? true : false}
          />
          <CheckboxWithText
            labelClassName="text-xs font-normal"
            label={"Team manager"}
            handleChecked={() => handleCheck("manager")}
            checked={members.find((item) => item === "manager") ? true : false}
          />
          <CheckboxWithText
            labelClassName="text-xs font-normal"
            label={"Team member"}
            handleChecked={() => handleCheck("member")}
            checked={members.find((item) => item === "member") ? true : false}
          />
        </div>
      )}
    </div>
  );
};

export { TeamPermissionsModal };
