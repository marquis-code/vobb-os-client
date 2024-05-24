import { updateIndefSusNotifyService, updateTempSusNotifyService } from "api";
import { toast } from "components";
import { useApiRequest, useFetchOrganisation } from "hooks";
import { OrgCommunicationUI } from "modules";
import { useMemo } from "react";

const OrgCommunication = () => {
  const { fetchOrgDetails } = useFetchOrganisation();
  const { run: runTempSuspend, data: tempSusResponse, error: tempSusError } = useApiRequest({});
  const { run: runIndefSuspend, data: indefSusResponse, error: indefSusError } = useApiRequest({});

  const handleTempSuspend = (data: { suspend: boolean }) => {
    runTempSuspend(updateTempSusNotifyService({ temporary_suspension_notify: data.suspend }));
  };

  const handleIndefSuspend = (data: { suspend: boolean }) => {
    runIndefSuspend(updateIndefSusNotifyService({ indefinite_suspension_notify: data.suspend }));
  };

  useMemo(() => {
    if (tempSusResponse?.status === 200) {
      toast({
        description: tempSusResponse?.data?.message
      });
      fetchOrgDetails();
    } else if (tempSusError) {
      toast({
        variant: "destructive",
        description: tempSusError?.response?.data?.error
      });
    }
  }, [tempSusResponse, tempSusError]);

  useMemo(() => {
    if (indefSusResponse?.status === 200) {
      toast({
        description: indefSusResponse?.data?.message
      });
      fetchOrgDetails();
    } else if (indefSusError) {
      toast({
        variant: "destructive",
        description: indefSusError?.response?.data?.error
      });
    }
  }, [indefSusResponse, indefSusError]);
  return (
    <>
      <OrgCommunicationUI
        submitTempSuspend={handleTempSuspend}
        submitIndefiniteSuspend={handleIndefSuspend}
      />
    </>
  );
};

export { OrgCommunication };
