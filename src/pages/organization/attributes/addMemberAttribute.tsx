import { createAttributeRequestBody, createOrgAttributeService } from "api";
import { AddAttributeModal, AddAttributesData, toast } from "components";
import { useUserContext } from "context";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps } from "types";

interface CreateAttributesProps extends ModalProps {
  fetchAttributes: ({ page, limit }) => void;
}

const AddMemberAttribute = ({ show, close, fetchAttributes }: CreateAttributesProps) => {
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const { orgAttributes } = useUserContext();
  const { pageLimit } = orgAttributes?.attributesMetaData || {
    pageLimit: 0
  };
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
    if (data.options) {
      requestBody.meta = data.options;
    }
    run(createOrgAttributeService(requestBody));
  };

  useMemo(() => {
    if (response?.status === 201) {
      toast({
        description: response?.data?.message
      });
      fetchAttributes({ page: 1, limit: pageLimit });
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
      />
    </>
  );
};

export { AddMemberAttribute };
