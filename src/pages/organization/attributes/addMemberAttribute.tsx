import { createAttributeRequestBody, createOrgAttributeService } from "api";
import { AddAttributeModal, AddAttributesData, toast } from "components";
import { useUserContext } from "context";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps, OrganisationAttributesData } from "types";

interface CreateAttributesProps extends ModalProps {
  fetchAttributes: ({ page, limit }) => void;
  prefilledAttribute: OrganisationAttributesData;
}

const AddMemberAttribute = ({
  show,
  close,
  fetchAttributes,
  prefilledAttribute
}: CreateAttributesProps) => {
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const { orgMemberAttributes } = useUserContext();
  const { pageLimit } = orgMemberAttributes?.attributesMetaData || {
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
      fetchAttributes({ page: 1, limit: pageLimit });
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
