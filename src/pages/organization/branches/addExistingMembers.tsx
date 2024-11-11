import { addExistingMembersToBranchService, fetchEligibleMembersForBranchService } from "api";
import { AddExistingMembersToBranchModal, toast } from "components";
import { useApiRequest, useDebounce } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ModalProps } from "types";

interface AddExistingMemberProps extends ModalProps {
  callback?: () => void;
}

const AddExistingMembers: React.FC<AddExistingMemberProps> = (props) => {
  const { id: branchId = "" } = useParams() || {};
  const { close, callback } = props;
  const {
    run: runFetchEligibleMembers,
    data: eligibleMembersResponse,
    error: eligibleMembersError,
    requestStatus: eligibleMembersStatus
  } = useApiRequest({});
  const {
    run: runAddExisting,
    data: existingResponse,
    error: existingError,
    requestStatus: existingStatus
  } = useApiRequest({});

  const [eligibleMembersQueryParams, setEligibleMembersQueryParams] = useState({
    limit: 4,
    search: ""
  });
  const handleUpdateMembersQueryParams = (filter: string, value: string | number) => {
    setEligibleMembersQueryParams((prev) => ({ ...prev, [filter]: value }));
  };
  const { search } = eligibleMembersQueryParams;
  const debouncedSearchTerm = useDebounce(search, 1000);

  const handleFetchEligibleMembers = ({ search = "" }) => {
    runFetchEligibleMembers(
      fetchEligibleMembersForBranchService(branchId, { ...eligibleMembersQueryParams, search })
    );
  };

  const eligibleMembersData = useMemo(() => {
    if (eligibleMembersResponse?.status === 200) {
      const data = eligibleMembersResponse?.data?.data?.users.map((item) => ({
        value: item._id,
        avatar: item.avatar,
        label: item.full_name
      }));
      const metaData = {
        currentPage: eligibleMembersResponse?.data?.data?.page ?? 1,
        totalPages: eligibleMembersResponse?.data?.data?.total_pages,
        totalCount: eligibleMembersResponse?.data?.data?.total_count,
        pageLimit: eligibleMembersQueryParams.limit
      };
      return { data, metaData };
    } else if (eligibleMembersError) {
      toast({
        variant: "destructive",
        description: eligibleMembersError?.response?.data?.error
      });
    }
    return {};
  }, [eligibleMembersResponse, eligibleMembersQueryParams.limit, eligibleMembersError]);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      handleFetchEligibleMembers({ search: debouncedSearchTerm });
    } else {
      handleFetchEligibleMembers({});
    }
  }, [debouncedSearchTerm]);

  const formattedMembers = eligibleMembersData.data;

  //add existing member
  const handleAddMembers = (data: string[]) => {
    runAddExisting(addExistingMembersToBranchService(branchId, { members: data }));
  };
  useMemo(() => {
    if (existingResponse?.status === 200) {
      toast({
        description: existingResponse?.data?.message
      });
      close();
      callback?.();
    } else if (existingError) {
      toast({
        variant: "destructive",
        description: existingError?.response?.data?.error
      });
    }
  }, [existingResponse, existingError]);

  return (
    <AddExistingMembersToBranchModal
      submit={handleAddMembers}
      loadingSubmit={existingStatus.isPending}
      loadingMembers={eligibleMembersStatus.isPending}
      {...props}
      handleSearch={handleUpdateMembersQueryParams}
      members={formattedMembers}
      memberSearchQuery={eligibleMembersQueryParams.search}
    />
  );
};

export { AddExistingMembers };
