import { updateOrgBrandingService } from "api";
import { toast } from "components";
import { useApiRequest } from "hooks";
import { OrgBrandingData, OrgBrandingUI } from "modules";
import { useMemo } from "react";

const OrgBranding = () => {
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const handleSubmit = (data: OrgBrandingData) => {
    run(updateOrgBrandingService({ primary_color: data.primary, secondary_color: data.secondary }));
  };

  useMemo(() => {
    if (response?.status === 200) {
      toast({
        description: response?.data?.message
      });
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);
  return (
    <>
      <OrgBrandingUI submit={handleSubmit} loading={requestStatus.isPending} />
    </>
  );
};

export { OrgBranding };
