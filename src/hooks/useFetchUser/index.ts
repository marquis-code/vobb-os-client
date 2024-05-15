import { personalAccountDetailsService } from "api";
import { useApiRequest } from "../useApiRequest";
import { useMemo } from "react";
import { useUserContext } from "context";
import { toast } from "components";

export const useFetchUser = () => {
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const { handleUpdateUser } = useUserContext();

  const fetchUserDetails = () => run(personalAccountDetailsService());

  useMemo(() => {
    if (response?.status === 200) {
      handleUpdateUser(response?.data?.data);
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);

  return { fetchUserDetails, loadingUser: requestStatus.isPending };
};
