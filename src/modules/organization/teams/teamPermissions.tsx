import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button, Checkbox } from "components";

type role = "lead" | "manager" | "member";

export interface PermissionItem {
  title: string;
  id: string;
  members: role[];
}

export interface PermissionGroupItem {
  group: string;
  permissions: PermissionItem[];
}

// This list is from the backend
const userPermissions: PermissionItem[] = [
  {
    title: "Invite user",
    id: "123",
    members: []
  },
  {
    title: "Suspend user",
    id: "1234",
    members: []
  },
  {
    title: "View members",
    id: "1235",
    members: []
  }
];
const clientPermissions: PermissionItem[] = [
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
    title: "Delete client",
    id: "1235",
    members: []
  }
];

const permissionGroup: PermissionGroupItem[] = [
  {
    group: "User Management",
    permissions: userPermissions
  },
  {
    group: "Client Management",
    permissions: clientPermissions
  }
];

interface TeamPermissionsUIProps {}

const TeamPermissionsUI = ({}: TeamPermissionsUIProps) => {
  return (
    <>
      <div className="rounded-md mt-2">
        <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-2 text-center p-2 font-medium font-semibold font-workSans">
          <span className="text-left">Actions</span>
          <span>Team lead</span>
          <span>Team manager</span>
          <span>Team member</span>
        </div>
        {permissionGroup.map((group) => (
          <div key={group.group}>
            <div className="bg-vobb-neutral-0 text-vobb-neutral-100 p-2 mb-2 border-y border-vobb-neutral-20">
              <p className="font-semibold font-workSans text-[13px] text-vobb-neutral-70">
                {group.group}
              </p>
            </div>
            {group.permissions.map((permission) => (
              <div
                key={permission.title}
                className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-2 text-center p-2">
                <span className="text-left font-medium">{permission.title}</span>
                <span className="flex justify-center">
                  <Checkbox />
                </span>
                <span className="flex justify-center">
                  <Checkbox />
                </span>
                <span className="flex justify-center">
                  <Checkbox />
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export { TeamPermissionsUI };
