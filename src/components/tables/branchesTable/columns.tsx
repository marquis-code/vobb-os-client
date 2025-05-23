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
import { OrganisationBranchesData } from "types";
import {
  TrashIcon,
  Pencil1Icon,
  StarIcon,
  StarFilledIcon,
  EyeOpenIcon
} from "@radix-ui/react-icons";
import { IconDotsVertical } from "@tabler/icons-react";

// This type is used to define the shape of our data.

export interface BranchTableActions {
  handleEditBranch: (data: OrganisationBranchesData) => void;
  handlePrimaryBranch: (id: string) => void;
  handleDeleteBranch: (id: string, name: string, hasMembers: boolean) => void;
  handleViewBranch: (id: string) => void;
}

export const getBranchTableColumns = ({
  handleDeleteBranch,
  handleEditBranch,
  handlePrimaryBranch,
  handleViewBranch
}: BranchTableActions): ColumnDef<OrganisationBranchesData>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { isPrimary, name } = row.original;
      return (
        <div className="flex gap-2 items-center text-right font-medium">
          {name} {isPrimary ? <StarFilledIcon color="var(--vobb-primary-70)" /> : ""}
        </div>
      );
    }
  },
  {
    accessorKey: "country",
    header: "Country"
  },
  {
    accessorKey: "province",
    header: "State"
  },
  {
    accessorKey: "city",
    header: "City"
  },
  {
    accessorKey: "timeZone",
    header: "Timezone"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { isPrimary, id: branchId } = row.original;
      const { ...branchData } = row.original;

      const editBranch = () => {
        handleEditBranch(branchData);
      };
      const deleteBranch = () => {
        handleDeleteBranch(branchId, row.original.name, row.original.hasMembers);
      };
      const primaryBranch = () => {
        handlePrimaryBranch(branchId);
      };
      const viewBranch = () => {
        handleViewBranch(branchId);
      };

      return (
        <ActionColumn
          isPrimary={isPrimary}
          primaryBranch={primaryBranch}
          editBranch={editBranch}
          deleteBranch={deleteBranch}
          viewBranch={viewBranch}
        />
      );
    }
  }
];

const ActionColumn = ({ isPrimary, primaryBranch, editBranch, deleteBranch, viewBranch }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-7 w-7 p-0" data-testid="menu-branch">
          <span className="sr-only">Open menu</span>
          <IconDotsVertical size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {!isPrimary ? (
          <DropdownMenuItem
            onClick={primaryBranch}
            className="gap-2 cursor-pointer"
            data-testid="mark-primary">
            <StarIcon /> Mark as primary
          </DropdownMenuItem>
        ) : (
          ""
        )}
        <DropdownMenuItem
          onClick={viewBranch}
          className="gap-2 cursor-pointer"
          data-testid="view-branch">
          <EyeOpenIcon /> View branch
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={editBranch}
          className="gap-2 cursor-pointer"
          data-testid="edit-branch">
          <Pencil1Icon /> Edit branch
        </DropdownMenuItem>
        {!isPrimary ? (
          <DropdownMenuItem
            onClick={deleteBranch}
            className="gap-2 cursor-pointer"
            data-testid="delete-branch">
            <TrashIcon /> Delete branch
          </DropdownMenuItem>
        ) : (
          ""
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
