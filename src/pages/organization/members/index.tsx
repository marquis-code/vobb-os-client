import { MembersUI } from "modules";
import { InviteMember } from "./inviteMember";
import { useState } from "react";
import { CancelInvitation } from "./cancelInvitation";
import { ResendInvitation } from "./resendInvitation";
import { SuspendMember } from "./suspendMember";

const Members = () => {
  const [inviteMember, setInviteMember] = useState(false);
  const [suspension, setSuspension] = useState({ show: false, id: "", name: "", suspend: false });
  const [resendInvite, setResendInvite] = useState({ show: false, id: "", email: "" });
  const [cancelInvite, setCancelInvite] = useState({ show: false, id: "", email: "" });

  const handleInviteMember = () => setInviteMember(true);
  const closeInviteMember = () => setInviteMember(false);

  const handleSuspension = (props: { id: string; suspend: boolean; name: string }) => {
    setSuspension({
      ...props,
      show: true
    });
  };

  const handleResendInvite = (props: { id: string; email: string }) => {
    setResendInvite({
      ...props,
      show: true
    });
  };

  const handleCancelInvite = (props: { id: string; email: string }) => {
    setCancelInvite({
      ...props,
      show: true
    });
  };

  const handleCloseResend = () => {
    setResendInvite({
      show: false,
      id: "",
      email: ""
    });
  };

  const handleCloseCancellation = () => {
    setCancelInvite({
      show: false,
      id: "",
      email: ""
    });
  };

  const handleCloseSuspend = () => {
    setSuspension({ show: false, id: "", name: "", suspend: false });
  };

  return (
    <>
      <SuspendMember
        {...suspension}
        show={suspension.show && suspension.suspend}
        close={handleCloseSuspend}
      />
      <CancelInvitation {...cancelInvite} close={handleCloseCancellation} />
      <ResendInvitation {...resendInvite} close={handleCloseResend} />
      <InviteMember show={inviteMember} close={closeInviteMember} />
      <MembersUI
        handleCancelInvitation={handleCancelInvite}
        handleChangeRole={console.log}
        handleResendInvitation={handleResendInvite}
        handleSuspension={handleSuspension}
        handleViewMember={console.log}
        handleInviteMember={handleInviteMember}
      />
    </>
  );
};

export { Members };
