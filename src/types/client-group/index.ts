import { MetaDataProps } from "types/interfaces";

export interface fetchClientGroupQueryParams {
  page: number;
  limit: number;
  search: string;
  sort: string;
  pipeline: string;
  assigned_members: string;
}

export interface fetchGroupActivitiesQueryParams {
  page: number;
  limit: number;
  start: string;
  end: string;
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

export interface GroupActivityItem {
  action: string;
  initiator: {
    _id: string;
    avatar: string;
    name: string;
  };
  meta: {
    name?: string;
    client?: {
      id: string;
      name: string;
    };
    member?: {
      id: string;
      name?: string;
    };
    stage?: {
      id: string;
      title: string;
      color: string;
    };
  };
  date: string;
  time: string;
}
