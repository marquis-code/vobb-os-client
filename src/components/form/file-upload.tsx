import { FileIcon, ImageIcon, UploadIcon } from "@radix-ui/react-icons";
import { cn } from "lib";
import { useState } from "react";

export interface CustomFileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  validatorMessage?: string;
  hint?: string;
  parentClassName?: string;
  className?: string;
  id: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const FileUpload: React.FC<CustomFileInputProps> = (props) => {
  const {
    label,
    required,
    validatorMessage,
    parentClassName,
    className,
    id,
    hint,
    file,
    onFileChange
  } = props;

  const [dragOver, setDragOver] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    onFileChange(e.dataTransfer.files[0]);
  };

  return (
    <>
      <div className={cn("mb-4 relative", parentClassName)}>
        {label && (
          <p className={"block font-inter text-xs mb-1"}>
            {label}
            {required ? <span className={"text-error-10"}>*</span> : ""}
          </p>
        )}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className={cn(
            "border border-input flex flex-col gap-2 py-6 px-4 rounded-md text-sm shadow-sm font-medium",
            file ? "justify-start" : "justify-center items-center cursor-pointer",
            validatorMessage ? "border-error-10 focus-visible:ring-error-0" : "",
            dragOver ? "border-dashed border-vobb-primary-40 bg-vobb-primary-20" : ""
          )}>
          {file ? (
            <div className="flex items-center gap-2 text-sm font-medium">
              {file.type.includes("image") ? <ImageIcon /> : <FileIcon />}
              <span className="truncate max-w-[400px]">{file.name}</span>
            </div>
          ) : (
            ""
          )}
          <div className={cn("flex gap-2", file ? "ml-6 text-xs" : "")}>
            <label
              className={
                file
                  ? "text-vobb-primary-70 underline cursor-pointer"
                  : "flex flex-col items-center gap-2 cursor-pointer"
              }
              htmlFor={id}>
              {file ? (
                "Replace"
              ) : (
                <>
                  <UploadIcon />
                  <span>Drop file here or click to upload</span>
                </>
              )}
              <input
                {...props}
                type="file"
                className="hidden"
                onChange={(e) => onFileChange(e.target.files ? e.target.files[0] : null)}
              />
            </label>
            {file ? (
              <button onClick={() => onFileChange(null)} className="text-error-10 underline">
                Remove
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

        {validatorMessage && (
          <small className="block text-[11px] mt-1 text-error-10">{validatorMessage}</small>
        )}
        {hint && <small className="block text-[11px] mt-1 text-vobb-neutral-60">{hint}</small>}
      </div>
    </>
  );
};

export { FileUpload };
