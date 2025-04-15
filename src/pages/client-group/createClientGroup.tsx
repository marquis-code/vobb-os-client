import { CreateClientGroupModal } from "components/modalVariants/createClientGroupModal";
import { createClientGroupService } from "api/services/client-group";
import { useApiRequest } from "hooks";
import { FC, useCallback, useMemo, useState } from "react";
import { ModalProps } from "types";
import { toast } from "components";

interface CreateClientGroupProps extends ModalProps {
  handleRefreshTable: () => void;
  pipelinesData:
    | {
        _id: string;
        name: string;
      }[]
    | null;
  isFetchingPipelineData: boolean;
}

export const CreateClientGroup: FC<CreateClientGroupProps> = ({
  show,
  close,
  handleRefreshTable,
  pipelinesData,
  isFetchingPipelineData
}) => {
  const [groupName, setGroupName] = useState("");

  const {
    run: runCreateClientGroup,
    error: createClientGroupError,
    requestStatus: createClientGroupStatus,
    data: createClientGroupResponse
  } = useApiRequest({});

  const handleCreateClientGroup = useCallback(
    (
      pipelineId: string,
      data: {
        name: string;
        clients: string[];
      }
    ) => {
      if (!pipelineId || !data) {
        toast({ description: "incomplete fields", variant: "destructive" });
        return;
      }
      runCreateClientGroup(createClientGroupService(pipelineId, data));
    },
    [runCreateClientGroup]
  );

  useMemo(() => {
    if (createClientGroupStatus.isRejected) {
      toast({ description: createClientGroupError.response.data.error, variant: "destructive" });
    } else if (createClientGroupStatus.isResolved) {
      toast({ description: createClientGroupResponse?.data?.message });
      close();
      handleRefreshTable();
    }
  }, [createClientGroupError, createClientGroupResponse]);

  return (
    <>
      <CreateClientGroupModal
        isSubmitting={createClientGroupStatus.isPending}
        groupName={groupName}
        setGroupName={setGroupName}
        submit={handleCreateClientGroup}
        pipelinesData={pipelinesData}
        show={show}
        isFetchingPiplines={isFetchingPipelineData}
        close={close}
      />
    </>
  );
};
