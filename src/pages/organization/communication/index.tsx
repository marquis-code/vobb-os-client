import { updateOrgSusNotifyService } from "api";
import { toast } from "components";
import { useApiRequest, useFetchOrganisation } from "hooks";
import { OrgCommunicationUI } from "modules";
import { useMemo } from "react";

const OrgCommunication = () => {
  const { fetchOrgDetails } = useFetchOrganisation();
  const {
    run: runSuspend,
    data: suspendResponse,
    error: suspendError,
    requestStatus: suspendStatus
  } = useApiRequest({});
  const handleSuspend = (data) => {
    runSuspend(updateOrgSusNotifyService({ suspension_notify: data.suspend }));
  };

  useMemo(() => {
    if (suspendResponse?.status === 200) {
      toast({
        description: suspendResponse?.data?.message
      });
      fetchOrgDetails();
    } else if (suspendError) {
      toast({
        variant: "destructive",
        description: suspendError?.response?.data?.error
      });
    }
  }, [suspendResponse, suspendError]);
  return (
    <>
      <OrgCommunicationUI submitSuspend={handleSuspend} />
    </>
  );
};

export { OrgCommunication };
