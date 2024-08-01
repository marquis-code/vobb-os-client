import { MemberTeamsModal, toast } from "components";
import { useEffect, useMemo, useState } from "react";
import { MetaDataProps, ModalProps } from "types";
import { RemoveMemberBranch } from "./removeMemberBranch";
import { RemoveMemberTeam } from "./removeMemberTeam";
import { useApiRequest } from "hooks";
import { fetchMemberTeamsService } from "api";

export interface MemberTeamsDataProps {
  teams: { id: string; name: string; dateAdded: string }[];
  metaData: MetaDataProps;
}
const initMemberTeams: MemberTeamsDataProps = {
  teams: [],
  metaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0
  }
};
interface MemberTeamsProps extends ModalProps {
  id: string;
  name: string;
  handleAddTeam: () => void;
}

const MemberTeams = (props: MemberTeamsProps) => {
  const [confirm, setConfirm] = useState({ show: false, id: "", team: "" });
  const [page, setPage] = useState(1);
  const {
    run: runFetchMemberTeams,
    data: memberTeamsResponse,
    error: memberTeamsError,
    requestStatus: memberTeamsStatus
  } = useApiRequest({});

  const handlePagination = (page: number) => {
    setPage(page);
  };

  const confirmRemoval = ({ id, name }) => {
    setConfirm({ show: true, id, team: name });
    props.close();
  };

  const closeConfirmRemoval = () => {
    setConfirm({ show: false, id: "", team: "" });
  };

  const fetchMemberTeams = () => runFetchMemberTeams(fetchMemberTeamsService(props.id, { page }));

  const memberTeams = useMemo<MemberTeamsDataProps>(() => {
    if (memberTeamsResponse?.status === 200) {
      const teams = memberTeamsResponse.data.data.teams.map((item) => ({
        id: item._id,
        name: item.team,
        dateAdded: item.date_added.slice(0, -8)
      }));
      const metaData = {
        currentPage: memberTeamsResponse?.data?.data?.page ?? 1,
        totalPages: memberTeamsResponse?.data?.data?.total_pages,
        totalCount: memberTeamsResponse?.data?.data?.total_count
      };
      return { teams, metaData };
    } else if (memberTeamsError) {
      toast({ description: memberTeamsError?.response?.data.error });
    }

    return initMemberTeams;
  }, [memberTeamsResponse, memberTeamsError]);

  useEffect(() => {
    fetchMemberTeams();
  }, [page]);

  return (
    <>
      <RemoveMemberTeam
        id={confirm.id}
        team={confirm.team}
        name={props.name}
        close={closeConfirmRemoval}
        show={confirm.show}
        fetchMemberTeams={fetchMemberTeams}
      />
      <MemberTeamsModal
        handleRemoveTeam={confirmRemoval}
        {...props}
        handleViewTeams={{
          memberTeams,
          loading: memberTeamsStatus.isPending,
          handlePagination
        }}
      />
    </>
  );
};

export { MemberTeams };
