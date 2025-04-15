import { ColumnDef } from "@tanstack/react-table";
import { Button, Checkbox } from "components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { cn } from "lib";
import { Row } from "layout";
import { ClientGroupTableData } from "types/client-group";
import ActionColumn from "modules/client-group/ActionColumn";

export const getClientGroupTableColumns = ({
  handleRefreshTable
}: {
  handleRefreshTable: () => void;
}): ColumnDef<ClientGroupTableData>[] => [
  {
    accessorKey: "name",
    header: ({ table }) => (
      <Row className="items-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <p> Group name</p>
      </Row>
    ),
    cell: ({ row }) => {
      const { name } = row.original;
      return <span>{name}</span>;
    }
  },
  {
    accessorKey: "noOfclients",
    header: "No. of clients",
    cell: ({ row }) => {
      const { clients } = row.original;
      return <span>{clients}</span>;
    }
  },
  {
    accessorKey: "pipeline",
    header: "Pipeline(s)",
    cell: ({ row }) => {
      const { pipeline } = row.original;
      return (
        <button className="p-1 rounded border border-[#dddfe5] bg-white capitalize">
          {pipeline.name}
        </button>
      );
    }
  },
  {
    accessorKey: "date",
    header: "Date Created",
    cell: ({ row }) => {
      const { date } = row.original;
      return <span>{date}</span>;
    }
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned Member",
    cell: ({ row }) => {
      const { assignedTo } = row.original;
      if (!assignedTo) return <span>-</span>;

      return (
        <Button
          variant={"outline"}
          className={cn(
            "w-fit justify-start text-left items-center font-normal text-xs h-8 py-0 p-2 gap-1"
          )}>
          {" "}
          <Avatar className="w-5 h-5">
            <AvatarImage src={assignedTo?.avatar} alt="profile picture" />

            <AvatarFallback className="text-[10px]">
              {assignedTo?.name.charAt(0)}
              {assignedTo?.name.charAt(1)}
            </AvatarFallback>
          </Avatar>
          <p>{assignedTo?.name}</p>
        </Button>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionColumn rowData={rowData} handleRefreshTable={handleRefreshTable} />;
    }
  }
];
