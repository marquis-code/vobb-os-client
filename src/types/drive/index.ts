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
