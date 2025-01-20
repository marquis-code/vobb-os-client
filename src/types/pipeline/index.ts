import { MetaDataProps } from "types/interfaces";

export interface fetchPipelinesQueryParams {
  page: number;
  limit: number;
  search: string;
  sector: string;
  sort_order: string;
  sort_property: string;
}

export type PipelineTableData = {
  id: string;
  name: string;
  description: string;
  sector: string;
  creator: {
    id: string;
    avatar: string | any;
    name: string;
  };
  clients: number;
  stages: number;
  pipelinePackage: {
    id: string;
    name: string;
  };
  date: string;
  time: string;
};

export interface PipelineTableDataProps {
  data: PipelineTableData[];
  metaData: MetaDataProps;
}
