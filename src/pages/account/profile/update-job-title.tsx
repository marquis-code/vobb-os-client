import { updateJobTitleService } from "api";
import { UpdateJobTitleModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps } from "types";

interface UpdateJobTitleProps extends ModalProps {
  callback?: () => void;
}

const UpdateJobTitle: React.FC<UpdateJobTitleProps> = ({ show, close, callback }) => {
  const { run, data: response, error, requestStatus } = useApiRequest({});

  const handleSubmit = ({ jobTitle }) => {
    run(updateJobTitleService({ job_title: jobTitle }));
  };

  useMemo(() => {
    if (response?.status === 200) {
      toast({
        description: response?.data?.message
      });
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
      <UpdateJobTitleModal
        show={show}
        close={close}
        submit={handleSubmit}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { UpdateJobTitle };
