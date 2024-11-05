import { MembersUI } from "modules";
import { InviteMember } from "./inviteMember";
import { useEffect, useMemo, useState } from "react";
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
import { toast } from "components";

const initMembersData: MemberDataProps = {
  membersArray: [],
  metaData: {
    currentPage: 1,
    pageLimit: 0,
    totalCount: 0,
    totalPages: 0
  }
};

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
    run: runFetchMembers,
    data: fetchResponse,
    error: fetchError,
    requestStatus: fetchStatus
  } = useApiRequest({});
  const [changeRole, setChangeRole] = useState({ show: false, name: "", id: "", currentRole: "" });

  const fetchOrgMembers = () => {
    runFetchMembers(fetchOrgMembersService(membersQueryParams));
  };
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

  const orgMembersData = useMemo<MemberDataProps>(() => {
    if (fetchResponse?.status === 200) {
      const membersArray = fetchResponse?.data?.data?.members.map((item) => ({
        id: item._id,
        avatar: item.avatar,
        name: item.status === "pending" || item.status === "expired" ? "--" : item.full_name,
        branch:
          Array.isArray(item?.branches) && item.branches.length > 0
            ? item.branches.map((branch) => branch.name)
            : ["Admin"],
        teams:
          Array.isArray(item?.teams) && item.teams.length > 0
            ? item.teams.map((team) => team.name)
            : ["Admin"],
        role: item.role.name,
        email: item.email,
        date: item.date_added ?? "--",
        lastActive: item.last_active ?? "--",
        initial:
          item.status === "pending" || item.status === "expired"
            ? getInitials(item.email)
            : getInitials(item.full_name),
        status: item.status === "pending" ? "invited" : item.status
      }));
      const metaData = {
        currentPage: fetchResponse?.data?.data?.page ?? 1,
        totalPages: fetchResponse?.data?.data?.total_pages,
        totalCount: fetchResponse?.data?.data?.total_count,
        pageLimit: membersQueryParams.limit
      };
      return { membersArray, metaData };
    } else if (fetchError) {
      toast({
        variant: "destructive",
        description: fetchError?.response?.data?.error
      });
    }
    return initMembersData;
  }, [fetchResponse, membersQueryParams, fetchError]);

  useEffect(() => {
    fetchOrgMembers();
  }, [membersQueryParams]);

  const handleChangeRole = ({ id, name, role }) => {
    setChangeRole({ show: true, id, name, currentRole: role });
  };

  const handleCloseChangeRole = () => {
    setChangeRole({ show: false, id: "", name: "", currentRole: "" });
  };

  useEffect(() => {
    fetchOrgMembers();
  }, [membersQueryParams]);

  return (
    <>
      <SuspendMember
        {...suspension}
        show={suspension.show && suspension.suspend}
        close={handleCloseSuspend}
        fetchMembers={fetchOrgMembers}
      />

      <UndoSuspension
        {...undoSuspension}
        show={undoSuspension.show && !suspension.suspend}
        close={handleCloseUnsuspend}
        fetchMembers={fetchOrgMembers}
      />
      <ChangeRole {...changeRole} close={handleCloseChangeRole} handleFetch={fetchOrgMembers} />
      <CancelInvitation
        {...cancelInvite}
        close={handleCloseCancellation}
        callback={() => {
          fetchOrgMembers();
          handleCloseCancellation();
        }}
      />
      <ResendInvitation
        {...resendInvite}
        close={handleCloseResend}
        callback={() => {
          fetchOrgMembers();
          handleCloseResend();
        }}
      />
      <MembersUI
        handleViewMembers={{
          loading: fetchStatus.isPending,
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
