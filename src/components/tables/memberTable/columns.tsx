import { ColumnDef } from "@tanstack/react-table";
import { Button } from "components/ui";
import { BreadcrumbEllipsis } from "components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem
} from "components/ui/dropdown-menu";
import {
  CircleBackslashIcon,
  EyeOpenIcon,
  PaperPlaneIcon,
  ResetIcon,
  ThickArrowRightIcon,
  UpdateIcon
} from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { cn } from "lib";
import { MemberTableData, statuses } from "types";
import { IconDotsVertical } from "@tabler/icons-react";

export enum memberStatuses {
  invited = "Invited",
  expired = "Invitation expired",
  active = "Active",
  suspended = "Suspended"
}

export interface MemberTableActions {
  handleViewMember: (id: string) => void;
  handleSuspension: ({ id, suspend, name }: { id: string; suspend: boolean; name: string }) => void;
  handleCancelInvitation: ({ id, email }: { id: string; email: string }) => void;
  handleChangeRole: ({ id, name, role }: { id: string; name: string; role: string }) => void;
  handleResendInvitation: ({ id, email }: { id: string; email: string }) => void;
}

export const getMemberTableColumns = ({
  handleViewMember,
  handleSuspension,
  handleCancelInvitation,
  handleChangeRole,
  handleResendInvitation
}: MemberTableActions): ColumnDef<MemberTableData>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { name, avatar, initial } = row.original;
      return (
        <div className="flex gap-2 items-center font-medium">
          <Avatar className="w-8 h-8">
            <AvatarImage src={avatar} alt="avatar" />
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const { email } = row.original;
      return <div className="truncate max-w-36">{email}</div>;
    }
  },
  {
    accessorKey: "branch",
    header: "Branches",
    cell: ({ row }) => {
      const { branch } = row.original;
      return (
        <div className="flex items-center gap-2 text-left">
          {branch.slice(0, 2).join(", ")}{" "}
          {branch.length > 2 ? (
            <span className="text-vobb-neutral-50 block text-xs">+{branch.length - 2}</span>
          ) : (
            ""
          )}
        </div>
      );
    }
  },
  {
    accessorKey: "teams",
    header: "Teams",
    cell: ({ row }) => {
      const { teams } = row.original;
      return (
        <div className="flex items-center gap-2 text-left">
          {teams.slice(0, 2).join(", ")}{" "}
          {teams.length > 2 ? (
            <span className="text-vobb-neutral-50 block text-xs">+{teams.length - 2}</span>
          ) : (
            ""
          )}
        </div>
      );
    }
  },
  {
    accessorKey: "role",
    header: "Role"
  },
  {
    accessorKey: "date",
    header: () => <span className="text-right w-full inline-block">Date added</span>,
    cell: ({ row }) => {
      const { date } = row.original;
      return <div className="text-right">{date}</div>;
    }
  },
  {
    accessorKey: "lastActive",
    header: () => <span className="text-right w-full inline-block">Last Active</span>,
    cell: ({ row }) => {
      const { lastActive } = row.original;
      return <div className="text-right">{lastActive}</div>;
    }
  },
  {
    accessorKey: "status",
    header: () => <span className={"w-full inline-block"}>Status</span>,
    cell: ({ row }) => {
      const { status } = row.original;
      return (
        <div
          className={cn(
            "font-medium w-fit py-1 px-2 rounded-2xl text-xs",
            getMemberStatusStyle(status)
          )}>
          {memberStatuses[status]}
        </div>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id, status, name, email, role } = row.original;

      const viewMember = () => {
        handleViewMember(id);
      };
      const suspension = () => {
        handleSuspension({ id, suspend: status === "active" ? true : false, name });
      };

      const resendInvitation = () => {
        handleResendInvitation({ id, email });
      };

      const cancelInvitation = () => {
        handleCancelInvitation({ id, email });
      };

      const changeRole = () => {
        handleChangeRole({ id, name, role });
      };

      return (
        <ActionColumn
          changeRole={changeRole}
          resendInvitation={resendInvitation}
          cancelInvitation={cancelInvitation}
          status={status}
          viewMember={viewMember}
          suspension={suspension}
        />
      );
    }
  }
];

export const getMemberStatusStyle = (status: statuses) =>
  status === "invited"
    ? "text-info-30 bg-info-0"
    : status === "expired"
    ? "text-warning-30 bg-warning-0"
    : status === "active"
    ? "text-success-30 bg-success-0"
    : status === "suspended"
    ? "text-error-30 bg-error-0"
    : "";

const ActionColumn = ({
  status,
  changeRole,
  viewMember,
  suspension,
  cancelInvitation,
  resendInvitation
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-6 w-6 p-0"
          data-testid={
            status === "active"
              ? "menu-activeUser"
              : status === "suspended"
              ? "menu-suspendedUser"
              : "menu-inactiveUser"
          }>
          <span className="sr-only">Open menu</span>
          <IconDotsVertical size={16} />{" "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {status === "active" || status === "suspended" ? (
          <DropdownMenuItem
            onClick={viewMember}
            className="gap-2 cursor-pointer"
            testId="view-member">
            <EyeOpenIcon /> View member
          </DropdownMenuItem>
        ) : (
          ""
        )}
        {status === "active" ? (
          <DropdownMenuItem
            onClick={changeRole}
            className="gap-2 cursor-pointer"
            testId="change-role">
            <UpdateIcon /> Change role
          </DropdownMenuItem>
        ) : (
          ""
        )}
        {status === "invited" || status === "expired" ? (
          <DropdownMenuItem
            onClick={resendInvitation}
            className="gap-2 cursor-pointer"
            testId="resend-invite">
            <PaperPlaneIcon /> Resend invitation
          </DropdownMenuItem>
        ) : (
          ""
        )}
        {status === "invited" ? (
          <DropdownMenuItem
            onClick={cancelInvitation}
            className="gap-2 cursor-pointer"
            testId="cancel-invite">
            <CircleBackslashIcon /> Cancel invitation
          </DropdownMenuItem>
        ) : (
          ""
        )}
        {status === "active" || status === "suspended" ? (
          <DropdownMenuItem
            onClick={suspension}
            className="gap-2 cursor-pointer"
            testId={status === "active" ? "suspend-member" : "undo-suspension"}>
            {status === "active" ? <CircleBackslashIcon /> : <ResetIcon />}{" "}
            {status === "active" ? "Suspend member" : "Undo suspension"}
          </DropdownMenuItem>
        ) : (
          ""
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
