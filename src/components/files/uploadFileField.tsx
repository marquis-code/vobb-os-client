import { UploadIcon } from "@radix-ui/react-icons";
import { IconTrash } from "@tabler/icons-react";
import { FileIcon } from "assets";
import { Button } from "components/ui";
import { ACCEPTED_FILE_TYPES, cn, formatFileSize, getFileTypeDisplay, MAX_FILE_SIZE } from "lib";
import { useRef, useState } from "react";

export interface CustomFileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  validatorMessage?: string;
  parentClassName?: string;
  id: string;
  files: File[];
  onFileChange: (files: File[]) => void;
}

interface FileWithError extends File {
  error?: string;
}

const UploadFileField: React.FC<CustomFileInputProps> = (props) => {
  const { parentClassName, files, onFileChange } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [dragOver, setDragOver] = useState(false);
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  const validateFile = (file: File): FileWithError => {
    const fileWithError = file as FileWithError;

    if (file.size > MAX_FILE_SIZE) {
      fileWithError.error = "File exceeds 5MB limit";
      return fileWithError;
    }
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      fileWithError.error = "Invalid file format";
      return fileWithError;
    }

    return fileWithError;
  };

  const processFiles = (newFiles: File[]) => {
    const validatedFiles = newFiles.map(validateFile);
    const newFileErrors: Record<string, string> = {};
    validatedFiles.forEach((file, index) => {
      if (file.error) {
        newFileErrors[`${file.name}-${index}`] = file.error;
      }
    });
    setFileErrors((prevErrors) => ({ ...prevErrors, ...newFileErrors }));
    const validFiles = validatedFiles.filter((file) => !file.error);
    onFileChange([...files, ...validFiles]);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files) as File[];
    processFiles(droppedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    onFileChange(updatedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files) as File[];
      processFiles(selectedFiles);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 w-full p-4 relative",
        parentClassName
      )}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={cn(
          "flex w-full flex-col gap-6 items-center justify-center border rounded-lg border-dashed p-4 py-8",
          dragOver && "border-blue-500 bg-blue-50"
        )}>
        <div className="relative flex items-center justify-center">
          <div className="bg-circle-pattern w-40 h-40 bg-no-repeat bg-[center_center] bg-[length:250px_250px] absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/3"></div>
          <FileIcon width={20} />
        </div>
        <div className="flex flex-col items-center gap-3 w-full text-center text-xs">
          <p className="font-bold text-black">Choose a file or drag & drop it here</p>
          <p className="font-normal text-vobb-neutral-70">
            JPEG, JPG, PNG, WEBP, PDF, and DOC formats up to 5MB
          </p>
        </div>
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="text-xs rounded-sm w-full"
          size={"default"}
          variant={"outline"}>
          Browse files
        </Button>
        <input
          ref={fileInputRef}
          data-testid="file-input"
          {...props}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          accept=".jpeg,.jpg,.png, .pdf,.doc,.docx,.webp"
        />
      </div>

      <div className="w-full py-2 flex flex-col items-center gap-2">
        {Object.keys(fileErrors).length > 0 && (
          <div className="w-full mt-2">
            {Object.entries(fileErrors).map(([fileKey, errorMessage], index) => (
              <div
                key={index}
                className="text-error-10 text-xs mb-1 p-2 py-4 border border-dashed border-error-10 rounded">
                <span className="font-medium">{fileKey.split("-")[0]}</span>: {errorMessage}
              </div>

            ))}
          </div>
        )}
        {files &&
          files.length > 0 &&
          files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full border border-vobb-neutral-40 rounded-lg p-3">
              <div className="flex justify-start items-center gap-3">
                <UploadIcon width={16} />
                <div className="flex flex-col justify-center items-start gap-1 text-xs">
                  <span className="text-vobb-neutral-100 font-medium">{file.name}</span>
                  <div className="flex items-center gap-2 text-vobb-neutral-60">
                    <span>{getFileTypeDisplay(file)}</span>
                    <div className="w-1 h-1 rounded-full bg-vobb-neutral-30"></div>
                    <span>{formatFileSize(file.size)}</span>
                  </div>
                </div>
              </div>
              <Button
                variant={"ghost"}
                onClick={() => removeFile(index)}
                size={"icon"}
                data-testid="close-btn"
                className="border p-2 shadow-sm">
                <IconTrash size={16} />
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export { UploadFileField };
