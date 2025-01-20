import { ColumnDef } from "@tanstack/react-table";
import { Button, Checkbox } from "components/ui";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem
} from "components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { cn } from "lib";
import { PipelineTableData } from "types";
import { IconDotsVertical } from "@tabler/icons-react";
import { CustomInput } from "components/form";

export interface PipelineTableActions {
  selectedPipelines: string[];
  handleSelectPipeline: (id: string) => void;
  handleViewPipeline: (id: string) => void;
  handleEditTitle: ({ id, name }: { id: string; name: string }) => void;
  handleEditStages: (id: string) => void;
  handleViewForms: (id: string) => void;
  handleDeletePipeline: (id: string) => void;
}

export const getPipelinesTableColumns = ({
  selectedPipelines,
  handleSelectPipeline,
  handleViewPipeline,
  handleEditTitle,
  handleEditStages,
  handleViewForms,
  handleDeletePipeline
}: PipelineTableActions): ColumnDef<PipelineTableData>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { name, id } = row.original;
      return (
        <div className="flex gap-2 items-end truncate text-xs">
          <Checkbox
            checked={selectedPipelines.find((item) => item === id) ? true : false}
            onCheckedChange={() => handleSelectPipeline(id)}
          />

          <span>{name}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "date",
    header: "Date Created",
    cell: ({ row }) => {
      const { date } = row.original;
      return <div>{date}</div>;
    }
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => {
      const { creator } = row.original;
      return (
        <Button
          variant={"outline"}
          className={cn(
            "w-fit justify-start text-left items-center font-normal text-xs h-8 py-0 p-2 gap-1"
          )}>
          {" "}
          <Avatar className="w-5 h-5">
            <AvatarImage src={creator?.avatar} alt="profile picture" />

            <AvatarFallback className="text-[10px]">
              {creator?.name.charAt(0)}
              {creator?.name.charAt(1)}
            </AvatarFallback>
          </Avatar>
          <p>{creator?.name}</p>
        </Button>
      );
    }
  },
  {
    accessorKey: "noOfStages",
    header: "No. of stages",
    cell: ({ row }) => {
      const { stages } = row.original;
      return <span>{stages}</span>;
    }
  },
  {
    accessorKey: "noOfClients",
    header: "No. of clients",
    cell: ({ row }) => {
      const { clients } = row.original;
      return <span>{clients}</span>;
    }
  },
  {
    accessorKey: "sector",
    header: "Sector",
    cell: ({ row }) => {
      const { sector } = row.original;
      return (
        <Button
          variant={"outline"}
          className={cn(
            "w-fit justify-start text-left items-center font-normal text-xs h-8  py-0 p-2 gap-1"
          )}>
          {sector}
        </Button>
      );
    }
  },
  {
    accessorKey: "package",
    header: "Package",
    cell: ({ row }) => {
      const { pipelinePackage } = row.original;
      return <span>{pipelinePackage?.name}</span>;
    }
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const { id, name } = row.original;

      const viewPipeline = () => {
        handleViewPipeline(id);
      };
      const editTitle = () => {
        handleEditTitle({ id, name });
      };

      const editStages = () => {
        handleEditStages(id);
      };

      const viewForms = () => {
        handleViewForms(id);
      };

      const deletePipeline = () => {
        handleDeletePipeline(id);
      };

      return (
        <ActionColumn
          viewPipeline={viewPipeline}
          editTitle={editTitle}
          editStages={editStages}
          viewForms={viewForms}
          deletePipeline={deletePipeline}
        />
      );
    }
  }
];

const ActionColumn = ({ viewPipeline, editTitle, editStages, viewForms, deletePipeline }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-6 w-6 p-0" data-testid="pipeline-actions">
          <span className="sr-only">Open menu</span>
          <IconDotsVertical size={16} />{" "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={viewPipeline} className="cursor-pointer" testId="view-pipeline">
          View Pipeline
        </DropdownMenuItem>

        <DropdownMenuItem onClick={editTitle} className="gap-2 cursor-pointer" testId="edit-title">
          Edit Title
        </DropdownMenuItem>

        <DropdownMenuItem onClick={editStages} className="cursor-pointer" testId="edit-stages">
          Edit stages
        </DropdownMenuItem>

        <DropdownMenuItem onClick={viewForms} className="cursor-pointer" testId="view-forms">
          View forms
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={deletePipeline}
          className="gap-2 cursor-pointer text-error-10"
          testId="delete-pipeline">
          {" "}
          Delete pipeline
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
