import { EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";
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
import { IconPickerItem } from 'react-icons-picker'

// This type is used to define the shape of our data.
export type TeamTableData = {
  id: string;
  icon: string;
  name: string;
  teamLeads: string[];
  teamManagers: string[];
  date: string;
  numberOfMembers: number;
  numberOfBranches: number;
};

export interface TeamTableActions {
  handleEditTeam: (id: string) => void;
  handleViewBranches: (id: string) => void;
  handleTeamHistory: (id: string) => void;
  handleViewTeam: (id: string) => void;
}

export const getTeamTableColumns = ({
  handleEditTeam,
  handleViewBranches,
  handleTeamHistory,
  handleViewTeam
}: TeamTableActions): ColumnDef<TeamTableData>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { name, icon } = row.original;
      return (
        <div className="flex gap-2 items-center text-left font-medium">
          <IconPickerItem value={icon} size={20} color="#101323" />
          {name}
        </div>
      );
    }
  },
  {
    accessorKey: "team-manager",
    header: "Team Manager(s)",
    cell: ({ row }) => {
      const { teamManagers } = row.original;
      return <div className="flex gap-2 text-left font-medium">{teamManagers.join(", ")}</div>;
    }
  },
  {
    accessorKey: "team-lead",
    header: "Team Lead(s)",
    cell: ({ row }) => {
      const { teamLeads } = row.original;
      return <div className="flex gap-2 text-left font-medium">{teamLeads.join(", ")}</div>;
    }
  },
  {
    accessorKey: "branches",
    header: () => <span className="text-left w-full inline-block">Branches</span>,
    cell: ({ row }) => {
      const { numberOfBranches, id } = row.original;
      return (
        <div
          role="button"
          onClick={() => handleViewBranches(id)}
          className="flex items-center gap-2 justify-start">
          <span className="text-left">{numberOfBranches}</span>
          <EyeOpenIcon width={12} />
        </div>
      );
    }
  },
  {
    accessorKey: "members",
    header: () => <span className="text-left w-full inline-block">Members</span>,
    cell: ({ row }) => {
      const { numberOfMembers } = row.original;
      return <div className="flex items-center gap-2 justify-start">{numberOfMembers}</div>;
    }
  },
  {
    accessorKey: "date",
    header: () => <span className="text-left w-full inline-block">Date added</span>,
    cell: ({ row }) => {
      const { date } = row.original;
      return <div className="text-left">{date}</div>;
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      const editTeam = () => {
        handleEditTeam(id);
      };

      const viewHistory = () => {
        handleTeamHistory(id);
      };
      const viewTeam = () => {
        handleViewTeam(id);
      };

      return <ActionColumn editTeam={editTeam} viewHistory={viewHistory} viewTeam={viewTeam} />;
    }
  }
];

const ActionColumn = ({ editTeam, viewHistory, viewTeam }) => {
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
        <DropdownMenuItem onClick={editTeam} className="gap-2 cursor-pointer">
          <Pencil1Icon /> Edit team
        </DropdownMenuItem>
        <DropdownMenuItem onClick={viewTeam} className="gap-2 cursor-pointer">
          <EyeOpenIcon /> View team
        </DropdownMenuItem>
        <DropdownMenuItem onClick={viewHistory} className="gap-2 cursor-pointer">
          <EyeOpenIcon /> View team history
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
