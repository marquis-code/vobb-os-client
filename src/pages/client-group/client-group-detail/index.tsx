import { fetchClientGroupDetailService } from "api/services/client-group";
import { LoadingSpinner, toast } from "components";
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

const testData = {
  _id: "674757e27107439426e2d137",
  pipeline: {
    _id: "6697c407cfa9d757d8e63aff",
    name: "Fifth pipeline"
  },
  name: "First group",
  assigned_to: {
    _id: "663ce09d66b7017f632d6fe0",
    avatar: "https://vobb-os.s3.us-east-2.amazonaws.com/images/1720946465291-Capture.PNG",
    name: "Ekene IkeOkoro"
  },
  clients: [
    {
      _id: "66b278247e57bf108845ebe1",
      name: "Ekene Okoro",
      email: "ekeneanthony84@gmail.com"
    },
    {
      _id: "66c383af2ba9cf4e2627ac31",
      name: "Ekene Okoro",
      email: "ekeneanthony85@gmail.com"
    },
    {
      _id: "672a3b6dd3d7debb9a692d60",
      name: "Ekene Okoro",
      email: "ekeneanthony89090@gmail.com"
    },
    {
      _id: "672bdb8be0510f3bc2fdf2f4",
      name: "Ekene Okoro",
      email: "ekeneanthonyadaqq8@gmail.com"
    },
    {
      _id: "672d1016e958b9d5cb79f43e",
      name: "Ekene Okoro",
      email: "ekeneanthony84f222@gmail.com"
    }
  ],
  date: "27/11/2024",
  time: "2024-11-27T17:33:23.199Z"
};

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

  const [groupDetails, setGroupDetails] = useState<GroupData | null>(null);
  const [subTab, setSubTab] = useState<string>("members");

  const handleSubTabChange = (tab: string) => {
    setSubTab(tab);
  };

  const handleMainTabChange = (route) => {
    navigate(Routes.client_group(params.id, route));
  };

  const [groupDetailsTabLengths, setGroupDetailsTabLengths] = useState({
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

  useMemo(() => {
    if (fetchClientGroupDetailResponse?.status === 200) {
      setGroupDetails(fetchClientGroupDetailResponse.data.data);
    } else if (fetchClientGroupDetailError) {
      toast({
        variant: "destructive",
        description: fetchClientGroupDetailError?.response?.data.error
      });
      setGroupDetails(testData);
    }
  }, [fetchClientGroupDetailResponse, fetchClientGroupDetailError]);

  useEffect(() => {
    if (params.id) handleViewGroup(params.id);
  }, []);

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
          {groupDetails.assigned_to && (
            <div className="bg-white p-1 rounded w-fit border-[0.5px] shadow-[0px_1px_2px_0px_#1018280D] flex gap-1.5 text-xs font-medium text-[#344054]">
              <p>Assigned to</p>
              {groupDetails.assigned_to.avatar ? (
                <img
                  src={groupDetails.assigned_to.avatar}
                  alt={`${groupDetails.assigned_to.name} avatar`}
                  className="size-5 rounded-full"
                />
              ) : (
                <div className="bg-[#4a22eb] grid place-items-center size-5 rounded-full text-xs text-white">
                  {groupDetails.assigned_to.name.slice(0, 2)}
                </div>
              )}
            </div>
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
              <GroupTasks
              //   handleUpdateProfileTabLengths={handleUpdateProfileTabLengths}
              />
            ) : params.route === "notes" ? (
              <GroupNotes
              // handleUpdateProfileTabLengths={handleUpdateProfileTabLengths}
              // memberProfile={memberProfile}
              />
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
              <GroupSales />
            )}
          </div>
        </section>
      </div>
    </>
  );
};
export default ClientGroupDetail;
