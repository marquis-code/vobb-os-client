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
    let metaData: any = [];

    if (data.options) {
      metaData.push({ options: data.options });
    }
    if (data.fileType) {
      metaData.push({ fileType: data.fileType });
    }
    if (data.wordLimit) {
      metaData.push({ wordLimit: data.wordLimit });
    }

    const requestBody: createAttributeRequestBody = {
      type: data.type.value,
      label: data.title,
      is_required: data.required ?? false,
      meta: metaData
    };
    if (data.description) {
      requestBody.description = data.description;
    }
    if (metaData.length) {
      requestBody.meta = metaData;
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
