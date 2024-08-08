import { MemberTeamsModal } from "components";
import { useState } from "react";
import { ModalProps } from "types";
import { RemoveMemberTeam } from "./removeMemberTeam";
import { MemberTeamsDataProps } from "./member";

interface MemberTeamsProps extends ModalProps {
  name: string;
  handleAddTeam: () => void;
  memberTeams: {
    data: MemberTeamsDataProps;
    handlePagination: (page: number) => void;
    loading: boolean;
    callback: () => void;
  };
}

const MemberTeams = (props: MemberTeamsProps) => {
  const { data: memberTeams, handlePagination, loading, callback } = props.memberTeams;
  const [confirm, setConfirm] = useState({ show: false, id: "", team: "" });

  const confirmRemoval = ({ id, name }) => {
    setConfirm({ show: true, id, team: name });
    props.close();
  };

  const closeConfirmRemoval = () => {
    setConfirm({ show: false, id: "", team: "" });
  };

  return (
    <>
      <RemoveMemberTeam
        id={confirm.id}
        team={confirm.team}
        name={props.name}
        close={closeConfirmRemoval}
        show={confirm.show}
        fetchMemberTeams={callback}
      />
      <MemberTeamsModal
        handleRemoveTeam={confirmRemoval}
        {...props}
        handleViewTeams={{
          memberTeams,
          loading,
          handlePagination
        }}
      />
    </>
  );
};

export { MemberTeams };
