import { MemberTeamsModal } from "components";
import { useState } from "react";
import { ModalProps } from "types";
import { RemoveMemberBranch } from "./removeMemberBranch";
import { RemoveMemberTeam } from "./removeMemberTeam";

interface MemberTeamsProps extends ModalProps {
  name: string;
  handleAddTeam: () => void;
}

const MemberTeams = (props: MemberTeamsProps) => {
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
      />
      <MemberTeamsModal handleRemoveTeam={confirmRemoval} {...props} />;
    </>
  );
};

export { MemberTeams };
