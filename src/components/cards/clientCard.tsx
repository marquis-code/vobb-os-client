import { UserFolderIcon } from "assets";
import { IconDotsVertical } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";

import { Button, InputActionModal } from "components";
import { FolderCardProps } from "types";
import { Link } from "react-router-dom";
import { useState } from "react";

const ClientCard = ({
  name,
  fileCount,
  folderSize,
  id,
  path,
  handleFolderRename,
  renameLoading
}: FolderCardProps) => {
  const [renameModalView, setRenameModalView] = useState(false);
  const handleOpenRenameModalView = () => {
    setRenameModalView(true);
  };
  const handleConfirmRename = (newName: string) => {
    handleFolderRename(id, newName);
  };

  const handleCloseRenameModalView = () => {
    setRenameModalView(false);
  };

  return (
    <Link
      to={`/drive/${path}/${id}`}
      data-testid="client-card"
      className="flex w-[176px] h-[118px] items-center justify-start gap-2 rounded-[12px] border border-vobb-neutral-30">
      <div className="flex flex-col p-3 items-center justify-start gap-4 w-full">
        <div className="flex items-center justify-center bg-vobb-sec-10 w-full rounded-[8px] py-3">
          <UserFolderIcon stroke="#088FFF" />
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
            <div onClick={(e) => e.stopPropagation()} className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger role="data-test-dropdown-trigger" asChild>
                  <Button variant="ghost" className="p-1 outline-none">
                    <span className="sr-only">Open menu</span>
                    <IconDotsVertical className="cursor-pointer" size={16} color="#494949" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 mr-64 relative z-[500]">
                  <DropdownMenuItem className="text-xs" onClick={handleOpenRenameModalView}>
                    Rename folder
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <InputActionModal
                modalView={renameModalView}
                handleClose={handleCloseRenameModalView}
                prefilledValue={name}
                placeholder="Rename"
                onConfirm={handleConfirmRename}
                loading={renameLoading}
                parentClassName="top-full mt-1 -left-[240px]"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { ClientCard };
