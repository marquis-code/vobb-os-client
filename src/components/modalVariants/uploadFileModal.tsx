import { IconX } from "@tabler/icons-react";
import { UploadFileField } from "components/files";
import { Modal } from "components/modal";
import { Button } from "components/ui";
import { useEffect, useState } from "react";
import { ModalProps } from "types";

interface UploadFileModalProps extends ModalProps {
  id: string | undefined;
  handleUploadFiles: (files: File[], id: string) => void;
  uploadLoading: boolean;
}
const UploadFileModal: React.FC<UploadFileModalProps> = ({
  show,
  close,
  id,
  handleUploadFiles,
  uploadLoading
}) => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    setFiles([]);
  }, [show]);

  const handleConfirmFileUpload = () => {
    if (id) {
      handleUploadFiles(files, id);
    }
  };

  const handleUpdateFiles = (updatedFiles: File[]) => {
    setFiles(updatedFiles);
  };

  return (
    <>
      <Modal
        contentClassName="max-w-[600px] p-0"
        show={show}
        close={close}
        testId="uploadFile-modal">
        <div className="flex items-center justify-between p-3 border-b border-vobb-neutral-20">
          <h2 className="text-lg font-medium text-vobb-neutral-95">Upload Files</h2>
          <Button
            onClick={close}
            variant={"ghost"}
            size={"icon"}
            data-testid="close-btn"
            className="border p-2 shadow-sm">
            <IconX size={18} />
          </Button>
        </div>
        <UploadFileField
          id="file-upload"
          required
          validatorMessage={files.length > 0 ? "" : "Please upload at least one file"}
          files={files}
          onFileChange={handleUpdateFiles}
        />
        <div className="flex justify-between p-3 border-t border-vobb-neutral-20">
          <Button
            onClick={() => close()}
            className="text-xs rounded-sm"
            size={"default"}
            variant={"outline"}>
            Cancel
          </Button>
          <Button
            disabled={false}
            loading={uploadLoading}
            size={"default"}
            variant={"fill"}
            onClick={handleConfirmFileUpload}
            className="text-xs rounded-sm">
            Attach files
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { UploadFileModal };
