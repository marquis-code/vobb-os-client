import {
  assignMemberToGroupService,
  fetchClientGroupDetailService,
  fetchOrgMembersListService
} from "api/services/client-group";
import { LoadingSpinner, toast, Button, Popover, PopoverContent, PopoverTrigger } from "components";
import { useApiRequest } from "hooks";
import { GroupDetailsTabs } from "modules/client-group/components/GroupDetailsTabs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "router";
import { GroupData } from "types/client-group";
import { GroupActivity } from "./GroupActivity";
import { GroupEmails } from "./GroupEmails";
import { GroupFiles } from "./GroupFiles";
import { GroupTasks } from "./GroupTasks";
import { GroupNotes } from "./GroupNotes";
import { GroupMembers } from "./GroupMembers";
import { GroupComments } from "./GroupComments";
import { GroupSales } from "./GroupSales";
import { GroupInvoice } from "./GroupInvoice";
import { SelectionPanel } from "modules/client-group/selection-panel";

const ClientGroupDetail = () => {
  const navigate = useNavigate();
  const params = useParams();

  // View client group details
  const {
    run: runFetchClientGroupDetail,
    data: fetchClientGroupDetailResponse,
    error: fetchClientGroupDetailError,
    requestStatus: fetchClientGroupDetailStatus
  } = useApiRequest({});

  // Fetch org members
  const {
    run: runFetchOrgMembersList,
    error: fetchOrgMembersListError,
    data: fetchOrgMembersListResponse,
    requestStatus: fetchOrgMembersListStatus
  } = useApiRequest({});

  // Assign member to group
  const {
    run: runAssignMember,
    data: assignMemberResponse,
    error: assignMemberError,
    requestStatus: assignMemberStatus
  } = useApiRequest({});

  const [groupDetails, setGroupDetails] = useState<GroupData | null>(null);
  const [subTab, setSubTab] = useState<string>("members");
  const [isAssignMembersModalOpen, setIsAssignMembersModalOpen] = useState(false);
  const [membersList, setMembersList] = useState<
    {
      _id: string;
      name: string;
    }[]
  >([]);

  const handleSubTabChange = (tab: string) => {
    setSubTab(tab);
  };

  const handleMainTabChange = (route) => {
    navigate(Routes.client_group(params.id, route));
  };

  const [groupDetailsTabLengths] = useState({
    activity: 0,
    email: 0,
    tasks: 0,
    files: 0,
    notes: 0,
    comments: 0
  });

  const handleViewGroup = useCallback(
    (groupId: string) => {
      runFetchClientGroupDetail(fetchClientGroupDetailService(groupId));
    },
    [runFetchClientGroupDetail]
  );

  const handleFetchOrgMembersList = useCallback(
    () => runFetchOrgMembersList(fetchOrgMembersListService()),
    [runFetchOrgMembersList]
  );

  const handleAssignMembersToGroup = useCallback(
    (member: string | string, id: string) => {
      runAssignMember(assignMemberToGroupService(id, { member }));
    },
    [runAssignMember]
  );

  useMemo(() => {
    if (fetchClientGroupDetailResponse?.status === 200) {
      setGroupDetails(fetchClientGroupDetailResponse.data.data);
    } else if (fetchClientGroupDetailError) {
      toast({
        variant: "destructive",
        description: fetchClientGroupDetailError?.response?.data.error
      });
    }
  }, [fetchClientGroupDetailResponse, fetchClientGroupDetailError]);

  useMemo(() => {
    if (fetchOrgMembersListResponse?.status === 200) {
      console.log(fetchOrgMembersListResponse?.data?.data?.members);
      setMembersList(fetchOrgMembersListResponse?.data?.data?.members || []);
    } else if (fetchOrgMembersListError) {
      toast({
        variant: "destructive",
        description: fetchOrgMembersListError?.response?.data.error
      });
    }
  }, [fetchOrgMembersListResponse, fetchOrgMembersListError]);

  useMemo(() => {
    if (assignMemberResponse?.status === 200) {
      toast({ description: assignMemberResponse?.data?.message });
      handleViewGroup(params.id as string);
    } else if (assignMemberError) {
      toast({
        variant: "destructive",
        description: assignMemberError?.response?.data.error
      });
    }
  }, [assignMemberResponse, assignMemberError, handleViewGroup, params.id]);

  useEffect(() => {
    if (params.id) handleViewGroup(params.id);
  }, [params.id, handleViewGroup]);

  useEffect(() => {
    if (isAssignMembersModalOpen) handleFetchOrgMembersList();
  }, [isAssignMembersModalOpen, handleFetchOrgMembersList]);

  if (fetchClientGroupDetailStatus.isPending)
    return (
      <div className="h-[60vh] grid place-items-center">
        <LoadingSpinner size={60} />
      </div>
    );

  if (!groupDetails) return null;

  return (
    <>
      <div data-testid="client-group-details-ui">
        <section className="px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-full bg-[#4a22eb] grid place-items-center text-sm text-white uppercase">
              {groupDetails.name.slice(0, 2)}
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-[#101323] font-semibold">{groupDetails.name}</p>
              <p className="text-xs text-[#98a2b3]">
                {groupDetails.clients[0].name} and {groupDetails.clients.length} others
              </p>
            </div>
          </div>
        </section>
        <section className="border-y-[0.5px] border-[#ebecf0] px-4 py-3">
          {groupDetails.assigned_to ? (
            <div className="bg-white p-1 rounded w-fit border-[0.5px] shadow-[0px_1px_2px_0px_#1018280D] flex gap-1.5 text-xs font-medium text-[#344054]">
              <p>Assigned to</p>
              {groupDetails.assigned_to.avatar ? (
                <img
                  src={groupDetails.assigned_to.avatar}
                  alt={`${groupDetails.assigned_to.name} avatar`}
                  className="size-5 rounded-full"
                />
              ) : (
                <div className="bg-[#4a22eb] grid place-items-center size-5 rounded-full text-[10px] text-white uppercase">
                  {groupDetails.assigned_to.name.slice(0, 2)}
                </div>
              )}
            </div>
          ) : (
            <Popover modal={true} open={isAssignMembersModalOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  onClick={(e) => {
                    setIsAssignMembersModalOpen(true);
                  }}
                  className="text-xs text-vobb-neutral-60"
                  data-testid="member-btn">
                  <p>Assign member</p>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                alignOffset={-200}
                className="w-[280px] bg-transparent border-0 !shadow-none">
                <SelectionPanel
                  loading={assignMemberStatus.isPending}
                  type="member"
                  isFetching={fetchOrgMembersListStatus.isPending}
                  close={() => setIsAssignMembersModalOpen(false)}
                  items={membersList.map((item) => {
                    const [first_name, last_name] = item.name.split(" ");
                    return {
                      _id: item._id,
                      first_name,
                      last_name
                    };
                  })}
                  buttonText="Assign Member To Group"
                  onSubmit={(selectedId) =>
                    handleAssignMembersToGroup(selectedId[0], params.id as string)
                  }
                  searchPlaceholder="Search Member"
                  singleSelect
                />
              </PopoverContent>
            </Popover>
          )}
        </section>
        <GroupDetailsTabs
          handleSubTabChange={handleSubTabChange}
          subTab={subTab}
          mainTab={params.route ?? "activity"}
          handleMainTabChange={handleMainTabChange}
          groupDetailsTabLength={groupDetailsTabLengths}
        />
        <section className="grid grid-cols-[2fr,1.25fr] divide-x -ml-4 w-[calc(100%+2rem)] min-h-screen">
          <section>
            {params.route === "activity" ? (
              <GroupActivity groupId={params.id as string} groupName={groupDetails.name} />
            ) : params.route === "emails" ? (
              <GroupEmails />
            ) : params.route === "files" ? (
              <GroupFiles />
            ) : params.route === "tasks" ? (
              <GroupTasks />
            ) : params.route === "notes" ? (
              <GroupNotes />
            ) : params.route === "invoice" ? (
              <GroupInvoice />
            ) : (
              ""
            )}
          </section>
          <div className="p-4">
            {subTab === "members" ? (
              <GroupMembers groupDetails={groupDetails} />
            ) : subTab === "comments" ? (
              <GroupComments />
            ) : (
              <GroupSales pipeline={groupDetails.pipeline} />
            )}
          </div>
        </section>
      </div>
    </>
  );
};
export default ClientGroupDetail;
