import { MembersUI } from "modules";
import { useEffect, useState } from "react";
import { CancelInvitation } from "./cancelInvitation";
import { ResendInvitation } from "./resendInvitation";
import { SuspendMember } from "./suspendMember";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { ChangeRole } from "./changeRole";
import { UndoSuspension } from "./undoSuspension";
import { useApiRequest } from "hooks";
import { fetchOrgMembersService } from "api";
import { getInitials } from "lib";
import { MemberDataProps } from "types";
import { useModalContext } from "context";
import { useFetchOrgMembers } from "hooks";

const Members = () => {
  const navigate = useNavigate();
  const { setInviteMember } = useModalContext();
  const [suspension, setSuspension] = useState({ show: false, id: "", name: "", suspend: false });
  const [undoSuspension, setUndoSuspension] = useState({
    show: false,
    id: "",
    name: "",
    suspend: false
  });

  const [resendInvite, setResendInvite] = useState({ show: false, id: "", email: "" });
  const [cancelInvite, setCancelInvite] = useState({ show: false, id: "", email: "" });
  const [membersQueryParams, setMembersQueryParams] = useState({
    page: 1,
    limit: 20,
    search: "",
    status: "",
    branch: "",
    team: ""
  });
  const handleUpdateMembersQueryParams = (filter: string, value: string | number) => {
    setMembersQueryParams((prev) => ({ ...prev, [filter]: value }));
  };

  const {
    fetchOrgMembers,
    orgMembersData,
    loading: loadingMembers
  } = useFetchOrgMembers({ limit: membersQueryParams.limit });

  const [changeRole, setChangeRole] = useState({ show: false, name: "", id: "", currentRole: "" });

  const handleInviteMember = () => setInviteMember(true);

  const handleSuspension = (props: { id: string; suspend: boolean; name: string }) => {
    props.suspend
      ? setSuspension({
          ...props,
          show: true
        })
      : setUndoSuspension({
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

  const handleCloseUnsuspend = () => {
    setUndoSuspension({ show: false, id: "", name: "", suspend: false });
  };

  const handleViewMember = (id) => {
    navigate(Routes.member(id, "activity"));
  };

  useEffect(() => {
    fetchOrgMembers({});
  }, [membersQueryParams]);

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
        fetchMembers={() => fetchOrgMembers({})}
      />
      <CancelInvitation
        {...cancelInvite}
        close={handleCloseCancellation}
        callback={() => fetchOrgMembers({})}
      />
      <ResendInvitation
        {...resendInvite}
        close={handleCloseResend}
        callback={() => fetchOrgMembers({})}
      />

      <UndoSuspension
        {...undoSuspension}
        show={undoSuspension.show && !suspension.suspend}
        close={handleCloseUnsuspend}
        fetchMembers={() => fetchOrgMembers({})}
      />
      <ChangeRole {...changeRole} close={handleCloseChangeRole} callback={() =>fetchOrgMembers({})} />
      
      <MembersUI
        handleViewMembers={{
          loading: loadingMembers,
          orgMembersData,
          handleParams: handleUpdateMembersQueryParams
        }}
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
export * from "./memberEmailVerify";
export * from "./inviteMember";
