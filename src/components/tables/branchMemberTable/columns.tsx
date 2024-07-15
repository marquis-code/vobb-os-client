import { ColumnDef, RowData } from "@tanstack/react-table";
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

// This type is used to define the shape of our data.
export type BranchMemberTableData = {
  id: string;
  name: string;
  email: string;
  teams: string[];
  role: string;
  date: string;
};

export interface BranchMemberTableActions {
  handleViewMember: (id: string) => void;
  handleTransferMember: (id: string) => void;
}

export const getBranchMemberTableColumns = ({
  handleViewMember,
  handleTransferMember
}: BranchMemberTableActions): ColumnDef<BranchMemberTableData>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { name } = row.original;
      return <div className="flex gap-2 items-center text-right font-medium">{name}</div>;
    }
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "role",
    header: "Role"
  },
  {
    accessorKey: "teams",
    header: "Teams",
    cell: ({ row }) => {
      const { teams } = row.original;
      return <div className="flex gap-2 text-left font-medium">{teams.join(", ")}</div>;
    }
  },
  {
    accessorKey: "date",
    header: () => <span className="text-right w-full inline-block" >Date added</span>,
    cell: ({ row }) => {
      const { date } = row.original;
      return <div className="text-right">{date}</div>;
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id: branchId } = row.original;

      const viewMember = () => {
        handleViewMember(branchId);
      };
      const transferMemberToBranch = () => {
        handleTransferMember(branchId);
      };

      return (
        <ActionColumn viewMember={viewMember} transferMemberToBranch={transferMemberToBranch} />
      );
    }
  }
];

const ActionColumn = ({ viewMember, transferMemberToBranch }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <BreadcrumbEllipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={viewMember} className="gap-2 cursor-pointer">
          <EyeOpenIcon /> View member
        </DropdownMenuItem>
        <DropdownMenuItem onClick={transferMemberToBranch} className="gap-2 cursor-pointer">
          <ThickArrowRightIcon /> Transfer to new branch
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
