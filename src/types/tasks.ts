export interface BaseTaskData {
  id: string;
  title: string;
  description?: string;
  object?: string;
  creator: {
    id: string;
    avatar?: string | any;
    name: string;
  };
  status: string;
  priority: string;
  assignedTo?: {
    _id: string;
    avatar?: any;
    name: string;
  }[];
  dueDate: string;
  date?: string;
}

export interface fetchTasksQueryParams {
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
