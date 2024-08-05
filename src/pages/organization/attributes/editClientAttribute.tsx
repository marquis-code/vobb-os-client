import { createAttributeRequestBody, updateOrgAttributeService } from "api";
import { toast } from "components";
import {
  EditAttributeModal,
  EditAttributesData
} from "components/modalVariants/editAttributeModal";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps, OrganisationAttributesData } from "types";

interface CreateAttributesProps extends ModalProps {
  callback: () => void;
  prefilledAttribute: OrganisationAttributesData;
}

const EditClientAttribute = ({
  show,
  close,

  prefilledAttribute,
  callback
}: CreateAttributesProps) => {
  const { run, data: response, requestStatus, error } = useApiRequest({});

  const { id } = prefilledAttribute;

  const submit = (data: EditAttributesData) => {
    const requestBody: createAttributeRequestBody = {
      type: data.type.value,
      label: data.title,
      is_required: data.required ?? false
    };
    if (data.description) {
      requestBody.description = data.description;
    }
    if (data.wordLimit) {
      requestBody.meta = +data.wordLimit;
    }
    if (data.options?.length) {
      requestBody.meta = data.options;
    }
    run(updateOrgAttributeService(id, requestBody));
  };

  useMemo(() => {
    if (response?.status === 200) {
      toast({
        description: response?.data?.message
      });
      callback();
      close();
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);

  return (
    <>
      <EditAttributeModal
        submit={submit}
        close={close}
        show={show}
        loading={requestStatus.isPending}
        initData={prefilledAttribute}
      />
    </>
  );
};

export { EditClientAttribute };
