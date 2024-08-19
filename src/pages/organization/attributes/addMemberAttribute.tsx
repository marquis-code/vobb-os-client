import { createAttributeRequestBody, createOrgAttributeService } from "api";
import { AddAttributeModal, AddAttributesData, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { AttributesDataProps, ModalProps, OrganisationAttributesData } from "types";

interface CreateAttributesProps extends ModalProps {
  callback: () => void;
  prefilledAttribute: OrganisationAttributesData;
}

const AddMemberAttribute = ({
  show,
  close,
  prefilledAttribute,
  callback
}: CreateAttributesProps) => {
  const { run, data: response, requestStatus, error } = useApiRequest({});

  const submit = (data: AddAttributesData) => {
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

    run(createOrgAttributeService(requestBody));
  };

  useMemo(() => {
    if (response?.status === 201) {
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
      <AddAttributeModal
        submit={submit}
        close={close}
        show={show}
        loading={requestStatus.isPending}
        initData={prefilledAttribute}
      />
    </>
  );
};

export { AddMemberAttribute };
