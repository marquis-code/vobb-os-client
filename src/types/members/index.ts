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
  title: string;
  description: string;
  object?: string;
  creator: {
    id: string;
    avatar: string | any;
    name: string;
  };
  status: string;
  priority: string;
  assignedTo: {
    _id: string;
    avatar?: any;
    name: string;
  }[];
  dueDate: string;
  date: string;
}

export interface MemberTasksProps {
  data: MemberTasksData[];
  metaData: MetaDataProps;
}
