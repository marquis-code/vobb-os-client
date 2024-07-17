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
import { EyeOpenIcon, ThickArrowRightIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { cn } from "lib";

export enum memberStatuses {
  invited = "Invited",
  expired = "Invitation expired",
  active = "Active",
  suspended = "Suspended"
}

// This type is used to define the shape of our data.
export type MemberTableData = {
  id: string;
  avatar: string;
  name: string;
  branch: string;
  teams: string[];
  role: string;
  email: string;
  date: string;
  lastActive: string;
  initial: string;
  status: memberStatuses;
};

export interface MemberTableActions {
  handleViewMember: (id: string) => void;
  handleSuspendMember: (id: string) => void;
}

export const getMemberTableColumns = ({
  handleViewMember,
  handleSuspendMember
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
    header: "Branch"
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
          )}{" "}
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
    // header: "Last Active"
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
            status === memberStatuses.invited
              ? "text-info-30 bg-info-0"
              : status === memberStatuses.expired
              ? "text-warning-30 bg-warning-0"
              : status === memberStatuses.active
              ? "text-success-30 bg-success-0"
              : status === memberStatuses.suspended
              ? "text-error-30 bg-error-0"
              : ""
          )}>
          {status}
        </div>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      const viewMember = () => {
        handleViewMember(id);
      };
      const suspendMember = () => {
        handleSuspendMember(id);
      };

      return <ActionColumn viewMember={viewMember} suspendMember={suspendMember} />;
    }
  }
];

const ActionColumn = ({ viewMember, suspendMember }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-6 w-6 p-0">
          <span className="sr-only">Open menu</span>
          <BreadcrumbEllipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={viewMember} className="gap-2 cursor-pointer">
          <EyeOpenIcon /> View member
        </DropdownMenuItem>
        <DropdownMenuItem onClick={suspendMember} className="gap-2 cursor-pointer">
          <ThickArrowRightIcon /> Suspend member
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
