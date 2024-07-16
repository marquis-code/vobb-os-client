import { fetchATeamService } from "api";
import { TeamBranchesModal, toast } from "components";
import { useApiRequest } from "hooks";
import React, { useEffect, useMemo, useState } from "react";
import { MetaDataProps, ModalProps } from "types";

interface TeamBranchesProps extends ModalProps {
  teamId: string;
}

export interface teamBranchDataProps {
  teamBranchData: {
    id: string;
    name: string;
    addressLine1: string;
    state: string;
    country: string;
    date: string;
  }[];
  metaData: MetaDataProps;
}

const initTeamsBranchData = {
  teamBranchData: [],
  metaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0
  }
};

const TeamBranches: React.FC<TeamBranchesProps> = (props) => {
  const { teamId: id } = props;
  const { run, data: response, requestStatus } = useApiRequest({});
  const [page, setPage] = useState(1);
  const handlePagination = (val: number) => setPage(val);
  const fetchTeam = () => {
    run(fetchATeamService({ id, page }));
  };

  const teamBranches = useMemo<teamBranchDataProps>(() => {
    if (response?.status === 200) {
      const teamBranchData = response?.data?.data?.branches.map((item) => ({
        id: item._id,
        name: item.name ?? "Unnamed",
        addressLine1: item.address_line_1,
        zipcode: item.zip_code,
        state: item.state,
        country: item.country,
        date: item.createdAt ? item.createdAt.slice(0, 10) : "15/07/2024"
      }));
      const metaData = {
        currentPage: response?.data?.data?.page ?? page,
        totalPages: response?.data?.data?.total_pages,
        totalCount: response?.data?.data?.total_count
      };
      return { teamBranchData, metaData };
    }
    return initTeamsBranchData;
  }, [response, page]);

  useEffect(() => {
    if (id) fetchTeam();
  }, [page, id]);

  return (
    <TeamBranchesModal
      branchesDetails={{
        loading: requestStatus.isPending,
        teamBranches,
        handlePagination
      }}
      {...props}
    />
  );
};

export { TeamBranches };
