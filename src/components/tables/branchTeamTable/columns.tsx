import { ColumnDef } from "@tanstack/react-table";
import { IconPickerItem } from "react-icons-picker";

// This type is used to define the shape of our data.
export type BranchTeamTableData = {
  id: string;
  icon: string;
  name: string;
  teamLeads: string[];
  teamManagers: string[];
  date: string;
  numberOfMembers: number;
};

export const getBranchTeamTableColumns = (): ColumnDef<BranchTeamTableData>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { name, icon } = row.original;
      return (
        <div className="flex gap-2 items-center text-right font-medium">
          <IconPickerItem value={icon} size={20} color="#101323" /> {name}
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
    accessorKey: "members",
    header: () => <span className="text-right w-full inline-block">Members</span>,
    cell: ({ row }) => {
      const { numberOfMembers } = row.original;
      return <div className="text-right">{numberOfMembers}</div>;
    }
  },
  {
    accessorKey: "date",
    header: () => <span className="text-right w-full inline-block">Date added</span>,
    cell: ({ row }) => {
      const { date } = row.original;
      return <div className="text-right">{date}</div>;
    }
  }
];
