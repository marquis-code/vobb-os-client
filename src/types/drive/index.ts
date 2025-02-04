import { SortOrderType } from "components";
import { CSSProperties, ReactNode } from "react";

export type DefaultFolder = {
  _id: string;
  name: string;
  is_default: boolean;
  path: string;
  type: string;
  files_count: number;
  total_files_size: string;
};

export interface FolderCardProps {
  name: string;
  fileCount: number;
  folderSize: string;
  path?: string;
}

export interface fetchUsersFoldersQueryParams {
  search: string;
  sort: SortOrderType;
  limit: number;
  page: number;
}
export interface ActionsList {
  name: string;
  callback: () => void;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface MultiCheckActionsProps {
  actions: ActionsList[];
}

export interface UsersFolders {
  folders: DefaultFolder[] | undefined | null;
  total_count: number;
  total_pages: number;
  page: number;
}
