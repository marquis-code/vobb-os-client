import { ClientGroupTableData } from "types/client-group";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "components/ui/dropdown-menu";
import ConfirmUngroupModal from "modules/client-group/confirmDangerousActionModal";
import { SelectionPanel } from "modules/client-group/selection-panel";
import { Button, Popover, PopoverContent, PopoverTrigger, toast } from "components/ui";
import { IconChevronRight, IconDotsVertical } from "@tabler/icons-react";
import { InputActionModal } from "components";
import { useApiRequest } from "hooks";
import {
  editGroupNameService,
  assignMemberToGroupService,
  ungroupClientGroupService,
  updateClientGroupStageService
} from "api/services/client-group";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchPipelineStagesService } from "api";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const ActionColumn = ({
  rowData,
  handleRefreshTable
}: {
  rowData: ClientGroupTableData;
  handleRefreshTable: () => void;
}) => {
  // #region Api Requests
  //  Fetch pipeline stages
  const {
    run: runFetchPipelineStages,
    error: fetchPipelineStagesError,
    data: fetchPipelineStagesResponse,
    requestStatus: fetchPipelineStagesStatus
  } = useApiRequest({});
  // Edit group name
  const {
    run: runEditGroupName,
    data: editGroupNameResponse,
    error: editGroupNameError,
    requestStatus: editGroupNameStatus
  } = useApiRequest({});

  // Assign member to group
  const {
    run: runAssignMember,
    data: assignMemberResponse,
    error: assignMemberError,
    requestStatus: assignMemberStatus
  } = useApiRequest({});

  // Ungroup client group
  const {
    run: runUngroupClientGroup,
    data: ungroupClientGroupResponse,
    error: ungroupClientGroupError,
    requestStatus: ungroupClientGroupStatus
  } = useApiRequest({});

  // Update group stage
  const {
    run: runUpdateGroupStage,
    data: updateGroupStageResponse,
    error: updateGroupStageError,
    requestStatus: updateGroupStageStatus
  } = useApiRequest({});
  //   #endregion

  //   #region Handle run Fns
  // fetch pipelines
  const handleFetchPipelineStages = useCallback(
    (pipelineId: string) => {
      runFetchPipelineStages(fetchPipelineStagesService(pipelineId));
    },
    [runFetchPipelineStages]
  );

  // edit
  const handleChangeClientGroupName = useCallback(
    (id: string, name: string) => {
      runEditGroupName(editGroupNameService(id, { name }));
    },
    [runEditGroupName]
  );
  // assign
  const handleAssignMembersToGroup = useCallback(
    (members: string[] | string, id: string) => {
      runAssignMember(assignMemberToGroupService(id, { member: members }));
    },
    [runAssignMember]
  );
  // ungroup
  const handleUngroupClientGroup = useCallback(
    (groupId: string) => {
      runUngroupClientGroup(ungroupClientGroupService(groupId));
    },
    [runUngroupClientGroup]
  );

  // update
  const handleSubmitUpdateGroupStage = useCallback(
    (stageId: string, groupId: string) => {
      runUpdateGroupStage(updateClientGroupStageService(groupId, { stage: stageId }));
    },
    [runUpdateGroupStage]
  );

  // #endregion

  const navigate = useNavigate();
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isEditNameOpen, setIsEditNameOpen] = useState(false);
  const [isShowingUngroupModal, setIsShowingUngroupModal] = useState(false);

  const [isPipelineStagesModalOpen, setIsPipelneStagesModalOpen] = useState(false);
  const [piplelineStages, setPipelineStages] = useState<
    {
      _id: string;
      color: string;
      title: string;
    }[]
  >([]);

  // 1. Ungroup client group toast handler
  useMemo(() => {
    if (ungroupClientGroupResponse?.status === 200) {
      toast({ description: ungroupClientGroupResponse?.data?.message });
      setIsShowingUngroupModal(false);
      handleRefreshTable();
    } else if (ungroupClientGroupError) {
      toast({
        variant: "destructive",
        description: ungroupClientGroupError?.response?.data.error
      });
    }
  }, [ungroupClientGroupResponse, ungroupClientGroupError, handleRefreshTable]);

  // 2. Edit group name toast handler
  useMemo(() => {
    if (editGroupNameResponse?.status === 200) {
      toast({ description: editGroupNameResponse?.data?.message });
      setIsEditNameOpen(false);
      handleRefreshTable();
    } else if (editGroupNameError) {
      console.log(editGroupNameError?.response);
      toast({
        variant: "destructive",
        description: editGroupNameError?.response?.data.error
      });
    }
  }, [editGroupNameResponse, editGroupNameError, handleRefreshTable]);

  // 3. Assign member toast handler
  useMemo(() => {
    if (assignMemberResponse?.status === 200) {
      toast({ description: assignMemberResponse?.data?.message });
      handleRefreshTable();
    } else if (assignMemberError) {
      toast({
        variant: "destructive",
        description: assignMemberError?.response?.data.error
      });
    }
  }, [assignMemberResponse, assignMemberError, handleRefreshTable]);

  // 5. Update group stage toast handler
  useMemo(() => {
    if (updateGroupStageResponse?.status === 200) {
      toast({ description: updateGroupStageResponse?.data?.message });
      handleRefreshTable();
      setIsPipelneStagesModalOpen(false);
    } else if (updateGroupStageError) {
      toast({
        variant: "destructive",
        description: updateGroupStageError?.response?.data.error
      });
    }
  }, [updateGroupStageResponse, updateGroupStageError, handleRefreshTable]);

  // 6. Fetch pipeline stages toast handler
  useMemo(() => {
    if (fetchPipelineStagesResponse?.status === 200) {
      setPipelineStages(fetchPipelineStagesResponse?.data?.data || []);
    } else if (fetchPipelineStagesError) {
      toast({
        variant: "destructive",
        description: fetchPipelineStagesError?.response?.data.error
      });
    }
  }, [fetchPipelineStagesResponse, fetchPipelineStagesError]);

  useEffect(() => {
    if (isPipelineStagesModalOpen) handleFetchPipelineStages(rowData.id);
  }, [isPipelineStagesModalOpen, handleFetchPipelineStages, rowData.id]);

  const viewGroupDetails = () => {
    navigate(Routes.client_group(rowData.id, "activity"));
  };

  return (
    <>
      <DropdownMenu open={isActionsOpen} onOpenChange={setIsActionsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-6 w-6 p-0" data-testid="client-group-actions">
            <span className="sr-only">Open menu</span>
            <IconDotsVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[200px]">
          <DropdownMenuItem
            onClick={viewGroupDetails}
            className="cursor-pointer"
            data-testid="view-group">
            View Group
          </DropdownMenuItem>
          <Popover
            modal={true}
            open={isEditNameOpen}
            onOpenChange={(open) => {
              setIsEditNameOpen(open);
              if (open) setIsActionsOpen(true);
            }}>
            <PopoverTrigger asChild>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditNameOpen(true);
                }}
                className="cursor-pointer"
                data-testid="edit-name-btn">
                Edit Group Name
              </DropdownMenuItem>
            </PopoverTrigger>
            <PopoverContent className="w-[260px] p-0 bg-transparent border-0" align="end">
              <InputActionModal
                modalView={isEditNameOpen}
                handleClose={() => setIsEditNameOpen(false)}
                prefilledValue={rowData.name}
                placeholder="Enter new name"
                onConfirm={(value) => handleChangeClientGroupName(rowData.id, value)}
              />
            </PopoverContent>
          </Popover>
          <Popover modal={true} open={isPipelineStagesModalOpen}>
            <PopoverTrigger asChild>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  setIsPipelneStagesModalOpen(true);
                }}
                className="cursor-pointer w-full flex justify-between items-center"
                data-testid="stages-btn">
                <p>Update Group Stage</p>
                <IconChevronRight height={12} width={12} />
              </DropdownMenuItem>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[280px] bg-transparent border-0 !shadow-none">
              <SelectionPanel
                loading={updateGroupStageStatus.isPending}
                type="stage"
                close={() => setIsPipelneStagesModalOpen(false)}
                items={piplelineStages}
                buttonText="Update Group Stage"
                onSubmit={(selectedId) => handleSubmitUpdateGroupStage(rowData.id, selectedId[0])}
                searchPlaceholder="Search stages"
                singleSelect
              />
            </PopoverContent>
          </Popover>
          <DropdownMenuItem
            onClick={() => {
              setIsShowingUngroupModal(true);
            }}
            className="cursor-pointer rounded text-[#912018] hover:!text-[#912018] hover:!bg-[#fef3f2]"
            data-testid="ungroup-client">
            Ungroup Clients
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmUngroupModal
        title="Are you sure?"
        description="Are you sure you want to ungroup these client(s)?"
        show={isShowingUngroupModal}
        close={() => setIsShowingUngroupModal(false)}
        loading={ungroupClientGroupStatus.isPending}
        action={() => handleUngroupClientGroup(rowData.id)}
      />
    </>
  );
};
export default ActionColumn;
