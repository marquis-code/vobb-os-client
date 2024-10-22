import { addExistingMembersToBranchService } from "api";
import { AddExistingMembersToBranchModal, toast } from "components";
import { useApiRequest, useDebounce, useFetchOrgMembers } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { BranchMemberTableData, ModalProps } from "types";

interface AddExistingMemberProps extends ModalProps {
  callback?: () => void;
  branchMembers: BranchMemberTableData[];
}

const AddExistingMembers: React.FC<AddExistingMemberProps> = (props) => {
  const { id: branchId = "" } = useParams() || {};
  const { branchMembers, close, callback } = props;
  const {
    run: runAddExisting,
    data: existingResponse,
    error: existingError,
    requestStatus: existingStatus
  } = useApiRequest({});

  const [allMembersQueryParams, setAllMembersQueryParams] = useState({
    limit: 4,
    search: ""
  });
  const handleUpdateMembersQueryParams = (filter: string, value: string | number) => {
    setAllMembersQueryParams((prev) => ({ ...prev, [filter]: value }));
  };
  const { search } = allMembersQueryParams;
  const debouncedSearchTerm = useDebounce(search, 1000);

  const {
    fetchOrgMembers,
    orgMembersData,
    loading: loadingMembers
  } = useFetchOrgMembers({ limit: 5 });

  const handleAddMembers = (data: string[]) => {
    runAddExisting(addExistingMembersToBranchService(branchId, { members: data }));
  };

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      fetchOrgMembers({ search: debouncedSearchTerm });
    } else {
      fetchOrgMembers({});
    }
  }, [debouncedSearchTerm]);

  const formattedMembers = orgMembersData.membersArray
    .filter(
      (member) =>
        member.status === "active" &&
        branchMembers.some((branchMember) => branchMember.id === member.id)
    )
    .map((member) => ({
      avatar: member.avatar,
      label: member.name,
      value: member.id
    }));

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
      loadingMembers={loadingMembers}
      {...props}
      handleSearch={handleUpdateMembersQueryParams}
      members={formattedMembers}
      memberSearchQuery={allMembersQueryParams.search}
    />
  );
};

export { AddExistingMembers };
