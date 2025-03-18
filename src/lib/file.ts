import { DefaultFile } from "types";

export const isFile = (value: any): value is File => value instanceof File;
export const isValidFileType = (file: File) => {
  const validTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
  return validTypes.includes(file.type);
};
export const handleDownloadFile = (fileUrl?: string, files?: DefaultFile[], fileIds?: string[]) => {
  if (fileUrl) {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (files) {
    const multiDownloadUrls = files
      .filter((file) => fileIds?.includes(file.id))
      .map((file) => file.file_url);

    multiDownloadUrls.forEach((url, index) => {
      setTimeout(() => {
        const multiLink = document.createElement("a");
        multiLink.href = url;
        multiLink.download = "";
        document.body.appendChild(multiLink);
        multiLink.click();
        document.body.removeChild(multiLink);
      }, index * 500);
    });
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " B";
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
  else return (bytes / (1024 * 1024)).toFixed(2) + " MB";
};

export const getFileTypeDisplay = (file: File): string => {
  const typeMap: Record<string, string> = {
    "image/jpeg": "JPEG",
    "image/jpg": "JPEG",
    "image/webp": "WEBP",
    "image/png": "PNG",
    "application/pdf": "PDF",
    "application/msword": "DOC",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX"
  };

  return typeMap[file.type] || file.type;
};
