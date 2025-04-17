import { fetchAllPipelinesService } from "api";
import { CreateClientGroupModal } from "components/modalVariants/createClientGroupModal";
import { createClientGroupService } from "api/services/client-group";
import { useApiRequest } from "hooks";
import { FC, useEffect, useMemo, useState } from "react";
import { ModalProps } from "types";
import { toast } from "components";

interface CreateClientGroupProps extends ModalProps {}

export const CreateClientGroup: FC<CreateClientGroupProps> = ({ show, close }) => {
  const [groupName, setGroupName] = useState("");

  const {
    run: runFetchAllPipelines,
    data: AllPipelinesResponse,
    error: AllPipelinesError,
    requestStatus: AllPipelinesStatus
  } = useApiRequest({});

  const {
    run: runCreateClientGroup,
    error: createClientGroupError,
    requestStatus: createClientGroupStatus,
    data: createClientGroupResponse
  } = useApiRequest({});

  useEffect(() => {
    runFetchAllPipelines(fetchAllPipelinesService());
  }, []);

  const handleCreateClientGroup = (
    pipelineId: string,
    data: {
      name: string;
      clients: string[];
    }
  ) => {
    if (!pipelineId || !data) {
      console.log("incomplete value");
      return;
    }
    runCreateClientGroup(createClientGroupService(pipelineId, data));
  };

  useEffect(() => {
    if (createClientGroupStatus.isRejected) {
      toast({ description: createClientGroupError.response.data.error, variant: "destructive" });
    } else if (createClientGroupStatus.isResolved) {
      toast({ description: `Client ${groupName} group has been created successfully!` });
    }
  }, [createClientGroupError, createClientGroupStatus]);

  return (
    <>
      <CreateClientGroupModal
        isSubmitting={createClientGroupStatus.isPending}
        groupName={groupName}
        setGroupName={setGroupName}
        submit={handleCreateClientGroup}
        pipelinesData={AllPipelinesResponse ? AllPipelinesResponse.data.data : []}
        show={show}
        isFetchingPiplines={AllPipelinesStatus.isPending}
        close={close}
      />
    </>
  );
};
