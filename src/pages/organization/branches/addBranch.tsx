import { addNewOrgBranchService, organisationBranchRequestBody } from "api";
import { AddBranchData, AddBranchModal, toast } from "components";
import { useUserContext } from "context";
import { useApiRequest, useFetchBranches } from "hooks";
import { useMemo } from "react";
import { ModalProps } from "types";

const AddBranch: React.FC<ModalProps> = ({ show, close }) => {
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const { fetchOrgBranches } = useFetchBranches();
  const { orgBranches } = useUserContext();
  const { currentPage, totalCount } = orgBranches?.branchesMetaData || {
    currentPage: 1,
    totalCount: 15,
    totalPages: 0
  };

  const submit = (data: AddBranchData) => {
    const requestBody: organisationBranchRequestBody = {
      name: data.name,
      country: data.country.value,
      zip_code: data.postalCode,
      state: data.state,
      address_line_1: data.addressLine1,
      city: data.city,
      timezone: data.timeZone.value
    };
    if (data.addressLine2 && data.addressLine2.trim() !== "") {
      requestBody.address_line_2 = data.addressLine2;
    }
    run(
      addNewOrgBranchService({
        branches: [requestBody]
      })
    );
  };

  useMemo(() => {
    if (response?.status === 201) {
      toast({
        description: response?.data?.message
      });
      fetchOrgBranches({ page: currentPage, limit: totalCount });
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);

  return (
    <>
      <AddBranchModal show={show} close={close} submit={submit} loading={requestStatus.isPending} />
    </>
  );
};

export { AddBranch };
