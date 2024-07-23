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
  Pencil1Icon,
  DrawingPinIcon,
  CopyIcon,
  ThickArrowUpIcon,
  ThickArrowDownIcon
} from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { attributeTypeIcons } from "lib/constants";

// This type is used to define the shape of our data.
export type AttributeTableData = {
  id: string;
  title: string;
  type: string;
  required: boolean;
  isSystem: boolean;
  isActive: boolean;
};

export interface AttributeTableActions {
  handleEditAttribute: (row: AttributeTableData) => void;
  handleDuplicateAttribute: (row: AttributeTableData) => void;
  handleRestoreAttribute: (id: string) => void;
  handleArchiveAttribute: (id: string) => void;
}

export const getAttributeTableColumns = ({
  handleEditAttribute,
  handleDuplicateAttribute,
  handleRestoreAttribute,
  handleArchiveAttribute
}: AttributeTableActions): ColumnDef<AttributeTableData>[] => [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const { type, title } = row.original;
      return (
        <div className="flex gap-2 items-center text-right font-medium">
          {attributeTypeIcons[type].icon} {title}
        </div>
      );
    }
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const { type } = row.original;
      return <span className="capitalize">{attributeTypeIcons[type].label}</span>;
    }
  },
  {
    accessorKey: "properties",
    header: "Attribute properties",
    cell: ({ row }) => {
      const { required, isSystem } = row.original;
      return (
        <div className="flex gap-2 items-center text-right font-medium">
          {isSystem ? (
            <span className="border border-vobb-neutral-70 text-vobb-neutral-70 text-xs py-[2px] px-[4px] rounded-md">
              System
            </span>
          ) : (
            ""
          )}
          {required ? (
            <span className="flex gap-1 border bg-vobb-sec-10 text-vobb-sec-80 border-vobb-sec-50 text-xs py-[2px] px-[4px] rounded-md">
              <DrawingPinIcon width={14} />
              Required
            </span>
          ) : (
            ""
          )}
        </div>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { isActive, isSystem, id: attrId } = row.original;

      const editAttribute = () => handleEditAttribute(row.original);
      const duplicateAttribute = () => handleDuplicateAttribute(row.original);
      const restoreAttribute = () => {
        handleRestoreAttribute(attrId);
      };
      const archiveAttribute = () => {
        handleArchiveAttribute(attrId);
      };

      return (
        <ActionColumn
          isActive={isActive}
          isSystem={isSystem}
          editAttribute={editAttribute}
          duplicateAttribute={duplicateAttribute}
          restoreAttribute={restoreAttribute}
          archiveAttribute={archiveAttribute}
        />
      );
    }
  }
];

const ActionColumn = ({
  isActive,
  isSystem,
  editAttribute,
  duplicateAttribute,
  archiveAttribute,
  restoreAttribute
}) => {
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
        {!isSystem && isActive ? (
          <DropdownMenuItem onClick={editAttribute} className="gap-2 cursor-pointer">
            <Pencil1Icon /> Edit attribute
          </DropdownMenuItem>
        ) : (
          ""
        )}
        {isActive ? (
          <DropdownMenuItem onClick={duplicateAttribute} className="gap-2 cursor-pointer">
            <CopyIcon /> Duplicate attribute
          </DropdownMenuItem>
        ) : (
          ""
        )}
        {!isSystem ? (
          isActive ? (
            <DropdownMenuItem
              onClick={archiveAttribute}
              className="gap-2 cursor-pointer text-vobb-error-20">
              <ThickArrowDownIcon />
              Archive attribute
            </DropdownMenuItem>
          ) : (
            <>
              <Separator />
              <DropdownMenuItem onClick={restoreAttribute} className="gap-2 cursor-pointer">
                <ThickArrowUpIcon />
                Restore attribute
              </DropdownMenuItem>
            </>
          )
        ) : (
          ""
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
