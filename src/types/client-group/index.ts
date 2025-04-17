import { MetaDataProps } from "types/interfaces";

export interface fetchClientGroupQueryParams {
  page: number;
  limit: number;
  search: string;
  sort: string;
}

export interface ClientGroupTableData {
  id: string;
  pipeline: {
    id: string;
    name: string;
  };
  name: string;
  clients: number;
  date: string;
  time: string;
  assignedTo?: {
    id: string;
    avatar: string;
    name: string;
  };
}

export interface ClientGroupTableDataProps {
  data: ClientGroupTableData[] | null | undefined;
  metaData: MetaDataProps;
}

export interface GroupData {
  _id: string;
  pipeline: {
    _id: string;
    name: string;
  };
  name: string;
  assigned_to: {
    _id: string;
    avatar: string;
    name: string;
  };
  clients: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  }[];
  date: string;
  time: string;
}

export interface GroupDetailsTabLengthProps {
  activity: number;
  email: number;
  tasks: number;
  files: number;
  notes: number;
  comments: number;
}
