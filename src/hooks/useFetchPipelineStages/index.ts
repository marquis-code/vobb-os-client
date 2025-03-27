import { useApiRequest } from "../useApiRequest";
import { useCallback, useMemo } from "react";
import { toast } from "components";
import { fetchPipelineStagesService } from "api";
import { IPipelineStage } from "types";

export const useFetchPipelineStages = (id: string) => {
  const { run, data: response, error, requestStatus } = useApiRequest({});

  const fetchPipelineStages = useCallback(() => {
    if (id) {
      run(fetchPipelineStagesService(id));
    }
  }, [id, run]);

  const pipelineStages = useMemo<Array<IPipelineStage>>(() => {
    if (response?.status === 200) {
      return response?.data?.data || [];
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
    return [];
  }, [response, error]);

  return {
    fetchPipelineStages,
    pipelineStages,
    loading: requestStatus.isPending
  };
};