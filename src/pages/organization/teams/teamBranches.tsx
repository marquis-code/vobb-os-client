import { fetchATeamBranchesService } from "api";
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
    city: string;
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
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const [page, setPage] = useState(1);
  const handlePagination = (val: number) => setPage(val);
  const fetchTeamBranches = () => {
    run(fetchATeamBranchesService({ id, page }));
  };

  const teamBranches = useMemo<teamBranchDataProps>(() => {
    if (response?.status === 200) {
      const teamBranchData = response?.data?.data?.branches.map((item) => ({
        id: item._id,
        name: item.name,
        city: item.city ?? "",
        addressLine1: item.address_line_1,
        zipcode: item.zip_code,
        state: item.state,
        country: item.country,
        date: item.date_added.slice(0, 10)
      }));
      const metaData = {
        currentPage: response?.data?.data?.page ?? page,
        totalPages: response?.data?.data?.total_pages,
        totalCount: response?.data?.data?.total_count
      };
      return { teamBranchData, metaData };
    }
    if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
    return initTeamsBranchData;
  }, [response, page]);

  useEffect(() => {
    if (id) fetchTeamBranches();
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
