import { ColumnDef } from "@tanstack/react-table";
import { Button, Checkbox, Popover, PopoverContent, PopoverTrigger } from "components/ui";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { cn } from "lib";
import { PipelineTableData } from "types";
import { IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";
import { EditPipelineTitleModal } from "components/modalVariants";
import { Row } from "layout";

export interface PipelineTableActions {
  handleViewPipeline: (id: string) => void;
  handleEditTitle: ({ id, data }: { id: string; data: { name: string } }) => void;
  editPipelineTitleStatus: {
    isResolved: boolean;
    isPending: boolean;
    isRejected: boolean;
    isIdle: boolean;
  };
  handleEditStages: (data: PipelineTableData) => void;
  handleViewForms: (id: string) => void;
  handleDeletePipeline: (id: string) => void;
}

export const getPipelinesTableColumns = ({
  handleViewPipeline,
  handleEditTitle,
  editPipelineTitleStatus,
  handleEditStages,
  handleViewForms,
  handleDeletePipeline
}: PipelineTableActions): ColumnDef<PipelineTableData>[] => [
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
        <p> Name</p>
      </Row>
    ),
    cell: ({ row }) => {
      const { name } = row.original;
      return <span>{name}</span>;
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
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;

      const viewPipeline = () => {
        handleViewPipeline(rowData.id);
      };
      const editTitle = (data: { name: string }) => {
        handleEditTitle({ id: rowData.id, data });
      };

      const editStages = (data) => {
        handleEditStages(data);
      };

      const viewForms = () => {
        handleViewForms(rowData.id);
      };

      const deletePipeline = () => {
        handleDeletePipeline(rowData.id);
      };

      return (
        <ActionColumn
          rowData={rowData}
          viewPipeline={viewPipeline}
          editTitle={(data) => editTitle(data)}
          editStages={editStages}
          viewForms={viewForms}
          deletePipeline={deletePipeline}
          editPipelineTitleStatus={editPipelineTitleStatus}
        />
      );
    }
  }
];

interface ActionColumnProps {
  viewPipeline: () => void;
  editTitle: (data: { name: string }) => void;
  editPipelineTitleStatus: {
    isResolved: boolean;
    isPending: boolean;
    isRejected: boolean;
    isIdle: boolean;
  };
  editStages: (data: any) => void;
  viewForms: () => void;
  deletePipeline: () => void;
  rowData: any;
}

const ActionColumn = ({
  viewPipeline,
  editStages,
  viewForms,
  deletePipeline,
  rowData,
  editTitle,
  editPipelineTitleStatus
}: ActionColumnProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isEditTitleOpen, setIsEditTitleOpen] = useState(false);

  return (
    <DropdownMenu open={isActionsOpen} onOpenChange={setIsActionsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-6 w-6 p-0" data-testid="pipeline-actions">
          <span className="sr-only">Open menu</span>
          <IconDotsVertical size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px]">
        <DropdownMenuItem
          onClick={viewPipeline}
          className="cursor-pointer"
          data-testid="view-pipeline">
          View Pipeline
        </DropdownMenuItem>

        <Popover
          modal={true}
          open={isEditTitleOpen}
          onOpenChange={(open) => {
            setIsEditTitleOpen(open);
            if (open) setIsActionsOpen(true);
          }}>
          <PopoverTrigger asChild>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                setIsEditTitleOpen(true);
              }}
              className="cursor-pointer"
              data-testid="edit-title-btn">
              Edit Title
            </DropdownMenuItem>
          </PopoverTrigger>
          <PopoverContent className="w-[260px] p-0 bg-transparent border-0" align="end">
            <EditPipelineTitleModal
              isOpen={isEditTitleOpen}
              handleClose={() => setIsEditTitleOpen(false)}
              data={rowData}
              editTitle={editTitle}
              editPipelineTitleStatus={editPipelineTitleStatus}
            />
          </PopoverContent>
        </Popover>

        <DropdownMenuItem
          onClick={() => {
            editStages(rowData);
            setIsActionsOpen(false);
          }}
          className="cursor-pointer"
          data-testid="edit-stages">
          Edit stages
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            viewForms();
            setIsActionsOpen(false);
          }}
          className="cursor-pointer"
          data-testid="view-forms">
          View forms
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            deletePipeline();
            setIsActionsOpen(false);
          }}
          className="gap-2 cursor-pointer text-error-10"
          data-testid="delete-pipeline">
          Delete pipeline
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
