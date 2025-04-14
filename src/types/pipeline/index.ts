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
  package: {
    id: string;
    name: string;
  };
  date: string;
  time: string;
};

export interface PipelineTableDataProps {
  data: PipelineTableData[] | null | undefined;
  metaData: MetaDataProps;
}

export interface EditPipelineStagesDto {
  stages: Array<IPipelineStage>;
}

export type AllowedStages = Array<Partial<IPipelineStage>> | Array<string>;
export interface IPipelineStage {
  _id: string;
  title: string;
  level: number;
  color: string;
  allow_all_stages?: boolean;
  allowed_stages?: AllowedStages | any;
}
