import { suspendMemberRequestBody, suspendMemberService } from "api";
import { SuspendMemberModal, toast } from "components";
import { format } from "date-fns";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps } from "types";

interface SuspendMemberProps extends ModalProps {
  id: string;
  name: string;
  fetchMembers: () => void;
}

const SuspendMember = ({ show, close, id, name, fetchMembers }: SuspendMemberProps) => {
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const handleContinue = (data) => {
    let requestBody: suspendMemberRequestBody = {
      member: id
    };

    if (data.reason.trim()) {
      requestBody.reason = data.reason;
    }
    if (!data.isIndefinite) {
      requestBody.duration = {
        start_date: format(data.startDate, "yyyy-MM-dd'T'HH:mm:ss"),
        end_date: format(data.endDate, "yyyy-MM-dd'T'HH:mm:ss")
      };
    }
    run(suspendMemberService(requestBody));
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
      <SuspendMemberModal
        submit={handleContinue}
        close={close}
        show={show}
        name={name}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { SuspendMember };
