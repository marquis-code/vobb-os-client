import { MembersUI } from "modules";
import { InviteMember } from "./inviteMember";
import { useState } from "react";

const Members = () => {
  const [inviteMember, setInviteMember] = useState(false);

  const handleInviteMember = () => setInviteMember(true);
  const closeInviteMember = () => setInviteMember(false);
  return (
    <>
      <InviteMember show={inviteMember} close={closeInviteMember} />
      <MembersUI
        handleSuspendMember={console.log}
        handleViewMember={console.log}
        handleInviteMember={handleInviteMember}
      />
    </>
  );
};

export { Members };
