import { DirectoryIcon } from "assets";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "components/ui/dropdown-menu";
import { Button } from "components/ui";
import { IconDotsVertical } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { FolderCardProps } from "types";

const DirectoryCard = ({
  name,
  fileCount,
  folderSize,
  path
}: Omit<FolderCardProps, "handleFetchFolders" | "handleFolderRename" | "renameLoading">) => {
  return (
    <Link
      to={`/drive/${path}`}
      data-testid="drive-folder"
      className="flex w-[272px] items-center justify-start gap-2 rounded-[12px] border border-vobb-neutral-30">
      <div className="flex flex-col p-3 items-center justify-start gap-4 w-full">
        <div
          className={`flex items-center justify-center ${name === "Users Directory"
              ? "bg-vobb-primary-10"
              : name === "Clients Directory"
                ? "bg-vobb-sec-10"
                : name === "Packages Directory"
                  ? "bg-success-0"
                  : name === "General Directory" && "bg-vobb-neutral-20"
            } w-full rounded-[8px] py-7`}>
          <DirectoryIcon
            stroke={`${name === "Users Directory"
                ? "#4a22eb"
                : name === "Clients Directory"
                  ? "#088fff"
                  : name === "Packages Directory"
                    ? "#069952"
                    : name === "General Directory" && "#1d2939"
              } `}
          />
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
                  Access Control and permissions
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { DirectoryCard };
