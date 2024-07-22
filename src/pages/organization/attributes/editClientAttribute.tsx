import { createAttributeRequestBody, updateOrgAttributeService } from "api";
import { toast } from "components";
import {
  EditAttributeModal,
  EditAttributesData
} from "components/modalVariants/editAttributeModal";
import { useUserContext } from "context";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps, OrganisationAttributesData } from "types";

interface CreateAttributesProps extends ModalProps {
  fetchAttributes: ({ page, limit }) => void;
  prefilledAttribute: OrganisationAttributesData;
}

const EditClientAttribute = ({
  show,
  close,
  fetchAttributes,
  prefilledAttribute
}: CreateAttributesProps) => {
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const { clientAttributes } = useUserContext();
  const { pageLimit } = clientAttributes?.attributesMetaData || {
    pageLimit: 0
  };
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
