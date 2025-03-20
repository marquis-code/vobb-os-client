import { PackageFolderIcon } from "assets";
import { IconDotsVertical } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";

import { Button } from "components";
import { FolderCardProps } from "types";
import { Link } from "react-router-dom";

const PackageCard = ({
  name,
  fileCount,
  folderSize,
  id,
  path
}: Omit<FolderCardProps, "handleFolderRename" | "renameLoading">) => {
  return (
    <Link
      to={`/drive/${path}/offering/${id}`}
      className="flex w-[176px] h-[118px] items-center justify-start gap-2 rounded-[12px] border border-vobb-neutral-30">
      <div className="flex flex-col p-3 items-center justify-start gap-4 w-full">
        <div className="flex items-center justify-center bg-success-0 w-full rounded-[8px] py-3">
          <PackageFolderIcon />
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="flex flex-col justify-center items-start gap-2 text-xs">
                <span className="text-vobb-neutral-100 font-medium capitalize">{name}</span>
                <div className="flex items-center gap-2 text-vobb-neutral-60">
                  <span>{fileCount} files</span>
                  <div className="w-1 h-1 rounded-full bg-vobb-neutral-30"></div>
                  <span>{folderSize}</span>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger role="data-test-dropdown-trigger" asChild>
                <Button variant="ghost" className="p-1 outline-none">
                  <span className="sr-only">Open menu</span>
                  <IconDotsVertical className="cursor-pointer" size={16} color="#494949" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 mr-64">
                <DropdownMenuItem className="text-xs">
                  Access control and permissions
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { PackageCard };
