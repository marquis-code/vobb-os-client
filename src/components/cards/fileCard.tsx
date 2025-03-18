import { JpegIcon, DocIcon, PdfIcon, CsvIcon, XlsIcon, JpgIcon, PngIcon, WebpIcon } from "assets";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "components/ui/dropdown-menu";
import { Button, Checkbox } from "components/ui";
import { IconDotsVertical } from "@tabler/icons-react";
import { FileCardProps } from "types";
import { handleDownloadFile } from "lib";
import { useMultiCheckViewContext } from "context";
import { InputActionModal } from "components/modalVariants";
import { useRef, useState } from "react";

const FileCard = ({
  name,
  size,
  file_url,
  id,
  files,
  handleFileRename,
  renameLoading
}: FileCardProps) => {
  const extension = file_url?.split("/").pop()?.split(".").pop();
  const [renameModalView, setRenameModalView] = useState(false);
  const { multiCheckView, setMultiCheckView, selectedCheckboxes, toggleCheckbox } =
    useMultiCheckViewContext();
  const handleMultiCheckView = (id: string) => {
    setMultiCheckView(true);
    toggleCheckbox(id);
  };
  const handleOpenRenameModalView = () => {
    setRenameModalView(true);
  };
  const handleCloseRenameModalView = () => {
    setRenameModalView(false);
  };
  const handleConfirmRename = (newName: string) => {
    handleFileRename(id, newName);
  };

  return (
    <div className="flex w-[272px] items-center justify-start gap-2 rounded-[12px] border border-vobb-neutral-30">
      <div className="flex flex-col p-3 items-center justify-start gap-4 w-full">
        <div className={`flex items-center justify-between w-full`}>
          <div className="border border-vobb-neutral-20 w-10 h-10 rounded-[4px] flex items-center justify-center">
            {extension === "jpeg" ? (
              <JpegIcon />
            ) : extension === "pdf" ? (
              <PdfIcon />
            ) : extension === "csv" ? (
              <CsvIcon />
            ) : extension === "xls" ? (
              <XlsIcon />
            ) : extension === "jpg" ? (
              <JpgIcon />
            ) : extension === "png" ? (
              <PngIcon />
            ) : extension === "webp" ? (
              <WebpIcon />
            ) : (
              <DocIcon />
            )}
          </div>
          <div className="relative z-[500]">
            <DropdownMenu>
              <DropdownMenuTrigger role="data-test-dropdown-trigger" className="relative">
                <Button variant="ghost" className="p-1 outline-none">
                  <span className="sr-only">Open menu</span>
                  <IconDotsVertical className="cursor-pointer" size={16} color="#494949" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 mr-64 text-xs">
                <DropdownMenuItem className="text-xs" onClick={handleOpenRenameModalView}>
                  Rename file
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs" onClick={() => handleMultiCheckView(id)}>
                  Select file
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-xs"
                  onClick={() => handleDownloadFile(file_url, files)}>
                  Download file
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
        <div className="w-full flex justify-center items-center">
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col justify-center items-start gap-2 text-xs">
              <span className="text-vobb-neutral-100 font-medium w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                {name}
              </span>
              <div className="flex items-center gap-2 text-vobb-neutral-60">
                <span>
                  {extension === "jpeg" ||
                    extension === "png" ||
                    extension === "PNG" ||
                    extension === "webp" ||
                    extension === "jpg"
                    ? "Image"
                    : "Document"}
                </span>
                <div className="w-1 h-1 rounded-full bg-vobb-neutral-30"></div>
                <span>{size}</span>
              </div>
            </div>

            {multiCheckView && (
              <Checkbox
                checked={selectedCheckboxes.has(id)}
                onClick={() => toggleCheckbox(id)}
                className="border border-vobb-neutral-40 shadow-none"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { FileCard };
