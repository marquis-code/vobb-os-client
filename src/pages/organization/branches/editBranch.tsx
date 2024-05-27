import { organisationBranchRequestBody, updateOrgBranchService } from "api";
import { AddBranchData, EditBranchModal, toast } from "components";
import { useUserContext } from "context";
import { useApiRequest, useFetchBranches } from "hooks";
import { useMemo } from "react";
import { ModalProps, OrganisationBranchesData } from "types";

interface Props extends ModalProps {
  branchData: OrganisationBranchesData;
}

const EditBranch: React.FC<Props> = ({ show, close, branchData }) => {
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
    run(updateOrgBranchService(branchData.id, requestBody));
  };

  useMemo(() => {
    if (response?.status === 200) {
      toast({
        description: response?.data?.message
      });
      close();
      fetchOrgBranches({ page: currentPage, limit: totalCount });
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
