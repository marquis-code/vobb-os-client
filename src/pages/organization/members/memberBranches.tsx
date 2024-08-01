import { MemberBranchesModal, toast } from "components";
import { useEffect, useMemo, useState } from "react";
import { MetaDataProps, ModalProps } from "types";
import { RemoveMemberBranch } from "./removeMemberBranch";
import { useApiRequest } from "hooks";
import { fetchMemberBranchesService } from "api";
import { useCountriesContext } from "context";

interface MemberBranchesProps extends ModalProps {
  id: string;
  name: string;
  handleAddBranch: () => void;
}

interface MemberBranchesData {
  id: string;
  name: string;
  city: string;
  country: string;
  province: string;
  dateAdded: string;
}

export interface MemberBranchesDataProps {
  branches: MemberBranchesData[];
  metaData: MetaDataProps;
}

const initMemberBranches: MemberBranchesDataProps = {
  branches: [],
  metaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0
  }
};

const MemberBranches = (props: MemberBranchesProps) => {
  const [confirm, setConfirm] = useState({ show: false, id: "", branch: "" });
  const { countries } = useCountriesContext();
  const {
    run: runFetchMemberBranches,
    data: memberBranchesResponse,
    error: memberBranchesError,
    requestStatus: memberBranchesStatus
  } = useApiRequest({});

  const confirmRemoval = ({ id, name }) => {
    setConfirm({ show: true, id, branch: name });
    props.close();
  };

  const closeConfirmRemoval = () => {
    setConfirm({ show: false, id: "", branch: "" });
  };

  const [page, setPage] = useState(1);
  const handlePagination = (page: number) => {
    setPage(page);
  };

  const fetchMemberBranches = () =>
    runFetchMemberBranches(fetchMemberBranchesService(props.id, { page }));

  const memberBranches = useMemo<MemberBranchesDataProps>(() => {
    if (memberBranchesResponse?.status === 200) {
      const branches = memberBranchesResponse.data.data.branches.map((item) => ({
        id: item._id,
        name: item.branch,
        country: countries.find((country) => country.value === item.country)?.label,
        province: item.state,
        city: item.city,
        dateAdded: item.time.slice(0, -8)
      }));
      const metaData = {
        currentPage: memberBranchesResponse?.data?.data?.page ?? 1,
        totalPages: memberBranchesResponse?.data?.data?.total_pages,
        totalCount: memberBranchesResponse?.data?.data?.total_count
      };
      return { branches, metaData };
    } else if (memberBranchesError) {
      toast({ description: memberBranchesError?.response?.data.error });
    }

    return initMemberBranches;
  }, [memberBranchesResponse, memberBranchesError]);

  useEffect(() => {
    fetchMemberBranches();
  }, [page]);

  return (
    <>
      <RemoveMemberBranch
        id={confirm.id}
        branch={confirm.branch}
        name={props.name}
        close={closeConfirmRemoval}
        show={confirm.show}
        fetchMemberBranches={fetchMemberBranches}
      />
      <MemberBranchesModal
        handleRemoveBranch={confirmRemoval}
        {...props}
        handleViewBranches={{
          memberBranches,
          loading: memberBranchesStatus.isPending,
          handlePagination
        }}
      />
    </>
  );
};

export { MemberBranches };
