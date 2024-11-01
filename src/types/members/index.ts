import { MetaDataProps } from "types";

export interface fetchMemberTasksQueryParams {
  page: number;
  limit: number;
  object?: string;
  id?: string;
  sort?: string;
  start?: string;
  end?: string;
  status?: string;
  priority?: string;
}

export interface MemberTasksData {
  id: string;
  message: string;
  creator: {
    id: string;
    avatar: string;
    name: string;
  };
  status: string;
  priority: string;
  assignedTo: [];
  dueDate: string;
  date: string;
}

export interface MemberTasksProps {
  data: MemberTasksData[];
  metaData: MetaDataProps;
}
