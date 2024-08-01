import { fetchMemberProsBranchesService } from "api";
import { ChangeBranchModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useEffect, useMemo } from "react";
import { ModalProps, optionType } from "types";

interface ChangeBranchProps extends ModalProps {
  name: string;
  id: string;
}

const ChangeBranch = (props: ChangeBranchProps) => {
  const { id } = props;
  const {
    run: runFetch,
    data: fetchResponse,
    error: fetchError,
    requestStatus: fetchStatus
  } = useApiRequest({});
  const {
    run: runChange,
    data: changeResponse,
    error: changeError,
    requestStatus: changeStatus
  } = useApiRequest({});

  const fetchMemberProspectiveBranches = () => runFetch(fetchMemberProsBranchesService(id, {}));
  // const fetchMemberProspectiveBranches = () => runFetch(fetchMemberProsBranchesService(id, {}));

  const options = useMemo<optionType[]>(() => {
    if (fetchResponse?.status === 200) {
      const options = fetchResponse.data.data.branches.map((item) => ({
        label: item.branch,
        value: item._id,
        isDisabled: item.status === "inactive" ? true : false
      }));

      return options;
    } else if (fetchError) {
      toast({ description: fetchError?.response?.data.error });
    }

    return [];
  }, [fetchResponse, fetchError]);

  useEffect(() => {
    fetchMemberProspectiveBranches();
  }, []);

  return (
    <ChangeBranchModal
      submit={console.log}
      {...props}
      handleViewBranches={{
        options,
        loading: fetchStatus.isPending
      }}
    />
  );
};

export { ChangeBranch };
