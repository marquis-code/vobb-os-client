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
import { IconDotsVertical } from "@tabler/icons-react";

// This type is used to define the shape of our data.
export type TeamMemberTableData = {
  id: string;
  name: string;
  email: string;
  role: string;
  date: string;
};

export interface TeamMemberTableActions {
  handleViewMember: (id: string) => void;
}

export const getTeamMemberTableColumns = ({
  handleViewMember
}: TeamMemberTableActions): ColumnDef<TeamMemberTableData>[] => [
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
    accessorKey: "date",
    header: () => <span className="text-right w-full inline-block">Date added</span>,
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

      return <ActionColumn viewMember={viewMember} />;
    }
  }
];

const ActionColumn = ({ viewMember }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-7 w-7 p-0">
          <span className="sr-only">Open menu</span>
          <IconDotsVertical size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={viewMember} className="gap-2 cursor-pointer">
          <EyeOpenIcon /> View member
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
