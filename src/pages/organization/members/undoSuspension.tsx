import { unsuspendMemberService } from "api";
import { ConfirmationModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps } from "types";

interface UndoSuspensionProps extends ModalProps {
  id: string;
  name: string;
  fetchMembers?: () => void;
  callback?: () => void;
}

const UndoSuspension = ({ show, close, id, name, fetchMembers, callback }: UndoSuspensionProps) => {
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const handleContinue = () => {
    run(unsuspendMemberService({ member: id }));
  };

  useMemo(() => {
    if (response?.status === 200) {
      toast({
        description: response?.data?.message
      });
      close();
      fetchMembers?.();
      callback?.();
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);

  return (
    <>
      <ConfirmationModal
        text={
          <>
            Are you sure you want to undo the suspension for <b>{name}</b>?
          </>
        }
        handleContinue={handleContinue}
        close={close}
        show={show}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { UndoSuspension };
