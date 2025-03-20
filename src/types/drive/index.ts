import { SortOrderType } from "components";
import { CSSProperties, ReactNode } from "react";

export type DefaultFolder = {
  id: string;
  name: string;
  is_default: boolean;
  path: string;
  type: string;
  files_count: number;
  total_files_size: string;
};

export type DefaultFile = {
  id: string;
  name: string;
  path: string;
  type: string;
  file_size: string;
  file_url: string;
};

export type DefaultFolderResponse = {
  _id: string;
  name: string;
  is_default: boolean;
  path: string;
  type: string;
  files_count: number;
  total_files_size: string;
};

export type DefaultFileResponse = {
  _id: string;
  name: string;
  path: string;
  type: string;
  file_size: string;
  file_url: string;
};

export interface FolderCardProps {
  id: string;
  name: string;
  fileCount: number;
  folderSize: string;
  path: string;
  handleFetchFolders: () => void;
  handleFolderRename: (id: string, newName: string) => void;
  renameLoading: boolean;
}

export interface FileCardProps {
  id: string;
  name: string;
  size: string;
  file_url: string;
  files: DefaultFile[];
  handleFetchFiles: () => void;
  handleFileRename: (id: string, newName: string) => void;
  renameLoading: boolean;
  // handleDeleteFiles: (ids: string[]) => void;
}

export interface fetchFoldersQueryParams {
  search: string;
  sort: SortOrderType;
  limit: number;
  page: number;
  start_date?: string;
  end_date?: string;
}
export interface ActionsList {
  name: string;
  callback: () => void;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
  btnVariant:
    | "link"
    | "fill"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

export interface MultiCheckActionsProps {
  actions: ActionsList[];
}

interface BaseDirectoryResponse {
  total_count: number;
  total_pages: number;
  page: number;
}
export interface FoldersResponse extends BaseDirectoryResponse {
  folders: DefaultFolder[] | undefined | null;
}

export interface FilesResponse extends BaseDirectoryResponse {
  files: DefaultFile[] | undefined | null;
}
