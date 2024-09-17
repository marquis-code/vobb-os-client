import { organisationBranchRequestBody, updateOrgBranchService } from "api";
import { EditBranchModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps, OrganisationBranchesData } from "types";

interface Props extends ModalProps {
  branchData: OrganisationBranchesData;
  callback: () => void;
}

const EditBranch: React.FC<Props> = ({ show, close, branchData, callback }) => {
  const { run, data: response, requestStatus, error } = useApiRequest({});

  const submit = (data: organisationBranchRequestBody) => {
    run(updateOrgBranchService(branchData.id, data));
  };

  useMemo(() => {
    if (response?.status === 200) {
      toast({
        description: response?.data?.message
      });
      callback();
      close();
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);
  const {
    name,
    province,
    city,
    timeZone,
    country,
    zipCode: postalCode,
    addressLine1,
    addressLine2
  } = branchData;
  return (
    <>
      <EditBranchModal
        show={show}
        close={close}
        submit={submit}
        loading={requestStatus.isPending}
        initData={{
          name,
          country: { label: country, value: country },
          addressLine1,
          addressLine2,
          postalCode,
          timeZone: { label: timeZone, value: timeZone },
          state: province,
          city
        }}
      />
    </>
  );
};

export { EditBranch };
