import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "components/ui/dropdown-menu";
import { IconChevronUp, IconPlus, IconDotsVertical } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Button, toast } from "components";
import { useCallback, useMemo, useState } from "react";
import ConfirmDangerousActionModal from "modules/client-group/confirmDangerousActionModal";
import { SelectionPanel } from "modules/client-group/selection-panel";
import { useApiRequest } from "hooks";
import { addClientsToGroupService, removeClientFromGroupService } from "api/services/client-group";

const ClientActions = ({
  client,
  groupName,
  groupId
}: {
  client: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  groupName: string;
  groupId: string;
}) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isShowingRemoveClientModal, setIsShowingRemoveClientModal] = useState(false);

  const {
    run: runRemoveClient,
    data: removeClientResponse,
    requestStatus: removeClientStatus,
    error: removeClientErrors
  } = useApiRequest({});

  const handleRemoveClient = useCallback(
    (id: string) => runRemoveClient(removeClientFromGroupService(groupId, { client: id })),
    [runRemoveClient]
  );

  useMemo(() => {
    if (removeClientResponse?.status === 200) {
      toast({ description: removeClientResponse?.data?.messsage });
      setIsShowingRemoveClientModal(false);
    } else if (removeClientErrors) {
      toast({
        variant: "destructive",
        description: removeClientErrors?.response?.data.error
      });
    }
  }, [removeClientResponse, removeClientErrors]);

  return (
    <>
      <DropdownMenu open={isActionsOpen} onOpenChange={setIsActionsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-6 w-6 p-0 !border-none"
            data-testid="client-actions">
            <span className="sr-only">Open menu</span>
            <IconDotsVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[200px]">
          <DropdownMenuItem
            onClick={console.log}
            className="cursor-pointer"
            data-testid="view-profile">
            View profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsShowingRemoveClientModal(true)}
            className="cursor-pointer !text-[#b42318] hover:!bg-[#fef3f2]"
            data-testid="remove-client">
            Remove Client
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDangerousActionModal
        title="Remove client from group"
        loading={removeClientStatus.isPending}
        description={`Are you sure you want to Remove client from this ${groupName}? This action cannot be undone.`}
        show={isShowingRemoveClientModal}
        close={() => setIsShowingRemoveClientModal(false)}
        width={372}
        action={() => handleRemoveClient(client._id)}
      />
    </>
  );
};

export const GroupMembers = ({
  groupClients,
  groupName,
  groupId
}: {
  groupClients: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  }[];
  groupName: string;
  groupId: string;
}) => {
  const [isAddingClient, setIsAddingClient] = useState(false);
  const {
    run: runAddClients,
    data: addClientsResponse,
    requestStatus: addClientsStatus,
    error: addClientsErrors
  } = useApiRequest({});

  const handleAddClients = useCallback(
    (clients: string[]) => runAddClients(addClientsToGroupService(groupId, { clients })),
    [runAddClients]
  );

  useMemo(() => {
    if (addClientsResponse?.status === 200) {
      toast({ description: addClientsResponse?.data?.messsage });
      setIsAddingClient(false);
    } else if (addClientsErrors) {
      toast({
        variant: "destructive",
        description: addClientsErrors?.response?.data.error
      });
    }
  }, [addClientsResponse, addClientsErrors]);

  return (
    <section className="bg-white pb-6">
      <div className="w-full rounded-lg p-1 flex flex-col bg-[#fbfbfb] border-[0.5px] border-[#eaecf0] gap-1 *:rounded *:bg-white *:border-[0.5px] *:border-[#eaecf0]">
        <div className="px-4 py-1.5 flex justify-between items-center">
          <p className="text-xs text-[#101323] font-medium">Client List</p>
          <button className="size-[26px] rounded border-[0.5px] border-[#dddfe5] grid place-items-center">
            <IconChevronUp size={14} />
          </button>
        </div>
        <div className="px-4 py-1.5">
          <div className="relative">
            <button
              className="flex shadow-[0px_1px_2px_0px_#1018280D] bg-white border-[0.5px] border-[#dddfe5] py-1.5 px-2 rounded items-center gap-1"
              onClick={() => setIsAddingClient(true)}>
              <IconPlus size={12} />
              <p className="text-[#344054] font-medium text-xs">New Client</p>
            </button>
            {isAddingClient && (
              <div className="absolute z-10 left-0 top-[calc(100%+7px)]">
                <SelectionPanel
                  type="member"
                  close={() => setIsAddingClient(false)}
                  items={[]}
                  buttonText="Add Client"
                  loading={addClientsStatus.isPending}
                  onSubmit={(selectedIds) => handleAddClients(selectedIds)}
                  searchPlaceholder="Search clients"
                />
              </div>
            )}
          </div>
        </div>
        <div className="p-3 flex gap-3 flex-col">
          {groupClients.map((client) => (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 rounded border-[0.5px] border-[#dddfe5] p-1">
                <Avatar className="w-5 h-5">
                  <AvatarImage src={client?.avatar} alt="profile picture" />

                  <AvatarFallback className="text-[10px]">
                    {client?.name.charAt(0)}
                    {client?.name.charAt(1)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-xs text-[#344054] font-medium">{client.name}</p>
              </div>
              <ClientActions groupId={groupId} client={client} groupName={groupName} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
