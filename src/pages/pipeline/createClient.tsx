import { ModalProps } from "types";
import { AddPipelineClientData, CreateClientModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo, useState } from "react";

import { createPipelineClientService } from "api";
import { useModalContext } from "context";

interface CreateClientProps extends ModalProps {
  callback?: () => void;
}

const CreateClient: React.FC<CreateClientProps> = (props) => {
  const { callback, close } = props;
  const { addClient } = useModalContext();
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (data: AddPipelineClientData, id?: string) => {
    const formData = new FormData();

    const avatarFile = data.avatar instanceof File ? data.avatar : null;
    const _data = {
      branch: data.branch.value,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      nationality: data.nationality.value,
      country: data.country.value,
      province: data.province,
      street: data.street,
      primary_language: data.primary_language.value,
      gender: data.gender.value
    };

    Object.entries(_data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }
    run(createPipelineClientService(formData, addClient.pipeline ?? id ?? ""));
  };

  useMemo(() => {
    if (response?.status === 201) {
      toast({
        description: response?.data?.message
      });
      setIsSuccess(true);
      close();
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
      <CreateClientModal
        submit={handleSubmit}
        loading={requestStatus.isPending}
        isSuccess={isSuccess}
        {...props}
      />
    </>
  );
};

export { CreateClient };
