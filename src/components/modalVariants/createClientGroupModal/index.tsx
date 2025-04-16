import { Modal } from "components/modal";
import React, { Dispatch, FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { ModalProps } from "types";
import { Button, toast } from "components/ui";
import { IconX } from "@tabler/icons-react";
import { CustomInput, SelectInput } from "components/form";
import SelectClients, { ClientType } from "modules/client-group/select-clients";
import { useApiRequest } from "hooks";
import { fetchAllClientsPerPipelinesService } from "api";

interface CreateClientGroupModalProps extends ModalProps {
  pipelinesData:
    | {
        _id: string;
        name: string;
      }[]
    | null;
  isFetchingPiplines: boolean;
  submit: (
    piplineId: string,
    data: {
      name: string;
      clients: string[];
    }
  ) => void;
  isSubmitting: boolean;
  groupName: string;
  setGroupName: Dispatch<string>;
}

export const CreateClientGroupModal: React.FC<CreateClientGroupModalProps> = ({
  show,
  close,
  pipelinesData,
  isFetchingPiplines,
  submit,
  isSubmitting,
  groupName,
  setGroupName
}) => {
  const {
    run: runFetchClientsForPipeline,
    // requestStatus: FetchClientForPipelineStatus,
    data: FetchClientsForPipelineResponse,
    error: FetchClientsForPipelineError
  } = useApiRequest({});

  const [selectedPipline, setSelectedPipline] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedClients, setSelectedClients] = useState<ClientType[]>([]);
  const [clients, setClients] = useState([]);

  const handleFetchClientsForPipeline = useCallback(
    (id: string) => {
      runFetchClientsForPipeline(fetchAllClientsPerPipelinesService(id));
    },
    [runFetchClientsForPipeline]
  );

  useEffect(() => {
    if (selectedPipline) handleFetchClientsForPipeline(selectedPipline.value);
  }, [selectedPipline, handleFetchClientsForPipeline]);

  useMemo(() => {
    if (FetchClientsForPipelineResponse?.status === 200) {
      setClients(FetchClientsForPipelineResponse.data.data.clients);
    } else if (FetchClientsForPipelineError) {
      toast({
        variant: "destructive",
        description: FetchClientsForPipelineError?.response?.data.error
      });
    }
  }, [FetchClientsForPipelineError, FetchClientsForPipelineResponse]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!groupName || !selectedPipline) return;

    const requestBody = {
      name: groupName,
      clients: selectedClients.map((client) => client._id)
    };

    submit(selectedPipline.value, requestBody);
  };

  return (
    <Modal
      contentClassName="max-w-[944px] p-0"
      show={show}
      close={close}
      testId="createClientGroup-modal">
      <div className="flex items-center justify-between px-4 py-2 border-b border-vobb-neutral-20">
        <h2 className="text-xs font-semibold font-inter text-vobb-neutral-95">New group</h2>
        <Button
          onClick={close}
          variant={"ghost"}
          size={"icon"}
          data-testid="close-btn"
          className="border p-1.5 size-fit shadow-sm">
          <IconX size={14} />
        </Button>
      </div>
      <form className="" onSubmit={handleSubmit}>
        <div className="p-4 flex flex-col *:mb-0 gap-3 border-y-[0.5px] border-[#e0e0e0]">
          <CustomInput
            label="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="mb-0"
            placeholder={`Enter Group Name`}
            name="name"
            required
          />
          <SelectInput
            onChange={(value) => setSelectedPipline(value)}
            label="Pipeline"
            className="mb-0"
            loading={isFetchingPiplines}
            placeholder="Select Pipeline"
            options={
              pipelinesData?.map<{ label: string; value: string }>((item) => ({
                label: item.name,
                value: item._id
              })) ?? []
            }
          />
          <SelectClients
            label="Clients"
            selectedOptions={selectedClients}
            setSelectedOptions={setSelectedClients}
            options={clients}
          />
        </div>
        <div className="px-4 bg-[#fafafa] flex justify-between py-2">
          <Button
            onClick={() => close()}
            className="text-xs rounded-sm"
            size={"default"}
            variant={"outline"}
            disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedPipline || !selectedClients || !groupName}
            loading={isSubmitting}
            size={"default"}
            variant={"fill"}
            className="text-xs rounded-sm">
            Create Pipeline
          </Button>
        </div>
      </form>
    </Modal>
  );
};
