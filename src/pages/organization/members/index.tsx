import { MembersUI } from "modules";
import { InviteMember } from "./inviteMember";
import { useState } from "react";
import { CancelInvitation } from "./cancelInvitation";
import { ResendInvitation } from "./resendInvitation";
import { SuspendMember } from "./suspendMember";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { ChangeRole } from "./changeRole";

const Members = () => {
  const navigate = useNavigate();
  const [inviteMember, setInviteMember] = useState(false);
  const [suspension, setSuspension] = useState({ show: false, id: "", name: "", suspend: false });
  const [resendInvite, setResendInvite] = useState({ show: false, id: "", email: "" });
  const [cancelInvite, setCancelInvite] = useState({ show: false, id: "", email: "" });
  const [changeRole, setChangeRole] = useState({ show: false, name: "", id: "", currentRole: "" });

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

  const handleViewMember = (id) => {
    navigate(Routes.member(id, "activity"));
  };

  const handleChangeRole = ({ id, name, role }) => {
    setChangeRole({ show: true, id, name, currentRole: role });
  };

  const handleCloseChangeRole = () => {
    setChangeRole({ show: false, id: "", name: "", currentRole: "" });
  };

  return (
    <>
      <SuspendMember
        {...suspension}
        show={suspension.show && suspension.suspend}
        close={handleCloseSuspend}
      />
      {/* <UndoSuspension
        id={params.id ?? ""}
        name="Jason Doe"
        show={suspension}
        close={handleCloseSuspension}
      /> */}
      <ChangeRole {...changeRole} close={handleCloseChangeRole} />
      <CancelInvitation {...cancelInvite} close={handleCloseCancellation} />
      <ResendInvitation {...resendInvite} close={handleCloseResend} />
      <InviteMember show={inviteMember} close={closeInviteMember} />
      <MembersUI
        handleCancelInvitation={handleCancelInvite}
        handleChangeRole={handleChangeRole}
        handleResendInvitation={handleResendInvite}
        handleSuspension={handleSuspension}
        handleViewMember={handleViewMember}
        handleInviteMember={handleInviteMember}
      />
    </>
  );
};

export { Members };
export * from "./member";
export * from "./acceptInvite";
export * from "./invitationSuccessful";
export * from "./invitationFailed";
