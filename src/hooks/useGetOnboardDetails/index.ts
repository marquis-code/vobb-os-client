import { getOnboardingDetailsService, onboardQuery } from "api";
import { useApiRequest } from "../useApiRequest";
import { useMemo } from "react";
import { toast } from "components";

export const useGetOnboardDetails = () => {
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const pageUrl = window.location.href.split("/");
  const query = pageUrl[pageUrl.length - 1] as onboardQuery;

  const fetchOnboardDetails = () => run(getOnboardingDetailsService(query));

  const onboardData = useMemo(() => {
    if (response?.status === 200) {
      return response?.data?.data;
    } else if (error) {
      toast({ description: error?.response?.data?.error });
    }
  }, [response, error]);

  return {
    fetchOnboardDetails,
    onboardData,
    loadingOnboard: requestStatus.isPending
  };
};
