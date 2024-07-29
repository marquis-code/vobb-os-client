import { unsuspendMemberService } from "api";
import { ConfirmationModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps } from "types";

interface UnsuspendMemberProps extends ModalProps {
  id: string;
  name: string;
  fetchMembers: () => void;
}

const UnsuspendMember = ({ show, close, id, name, fetchMembers }: UnsuspendMemberProps) => {
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
      fetchMembers();
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
            Are you sure you want to unsuspend <b>{name}</b>?
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

export { UnsuspendMember };
