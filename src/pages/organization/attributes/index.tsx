import { OrgAttributesUI } from "modules";
import { AddMemberAttribute } from "./addMemberAttribute";
import { useEffect, useMemo, useState } from "react";
import { AddClientAttribute } from "./addClientAttribute";
import { useUserContext } from "context";
import { useApiRequest } from "hooks";
import { toast } from "components";
import {
  archiveOrgAttributeService,
  fetchOrgAttributesService,
  restoreOrgAttributeService
} from "api";
import { AttributesDataProps, OrganisationAttributesData } from "types";
import { EditAttribute } from "./editAttribute";

const defaultAttributesData: AttributesDataProps = {
  attributesArray: [],
  attributesMetaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    pageLimit: 0
  }
};

const OrgAttributes = () => {
  const [addMemberAttr, setAddMemberAttr] = useState(false);

  const [addClientAttr, setAddClientAttr] = useState<boolean>(false);
  const [editAttr, setEditAttr] = useState<boolean>(false);

  const { clientAttributes, handleUpdateClientAttributes } = useUserContext();
  const { currentPage: clientPage } = clientAttributes?.attributesMetaData || {
    currentPage: 1
  };
  const [initAttr, setInitAttr] = useState<OrganisationAttributesData>({
    id: "",
    title: "",
    type: "",
    required: false,
    isSystem: false,
    isActive: true
  });

  const [clientQueryParams, setClientQueryParams] = useState({
    page: clientPage,
    limit: 20
  });

  const handleMemberPagination = (param: string, value: number) => {
    setClientQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const {
    run: runFetchClient,
    data: clientResponse,
    requestStatus: clientStatus
  } = useApiRequest({});

  const { run: runArchive, data: archiveResponse, error: archiveError } = useApiRequest({});
  const { run: runRestore, data: restoreResponse, error: restoreError } = useApiRequest({});

  const fetchClientAttributes = () => {
    runFetchClient(
      fetchOrgAttributesService({
        page: clientQueryParams.page,
        limit: clientQueryParams.limit,
        type: "client"
      })
    );
  };

  const archiveAttribute = (id: string) => {
    runArchive(archiveOrgAttributeService({ id }));
  };
  const restoreAttribute = (id: string) => {
    runRestore(restoreOrgAttributeService({ id }));
  };

  useMemo(() => {
    if (archiveResponse?.status === 200) {
      toast({
        description: archiveResponse?.data?.message
      });
      fetchClientAttributes();
    } else if (archiveError) {
      toast({
        variant: "destructive",
        description: archiveError?.response?.data?.error
      });
    }
  }, [archiveResponse, archiveError]);

  useMemo(() => {
    if (restoreResponse?.status === 200) {
      toast({
        description: restoreResponse?.data?.message
      });
      fetchClientAttributes();
    } else if (restoreError) {
      toast({
        variant: "destructive",
        description: restoreError?.response?.data?.error
      });
    }
  }, [restoreResponse, restoreError]);

  useMemo<AttributesDataProps>(() => {
    if (clientResponse?.status === 200) {
      const attributesArray = clientResponse?.data?.data?.attributes.map((item) => ({
        id: item._id,
        title: item.label,
        type: item.type,
        required: item.is_required,
        isSystem: item.is_system_prop ?? false,
        isActive: item.is_active ?? true,
        description: item.description,
        metaData: item.meta
      }));
      const attributesMetaData = {
        currentPage: clientResponse?.data?.data?.page ?? 1,
        totalPages: clientResponse?.data?.data?.total_pages,
        totalCount: clientResponse?.data?.data?.total_count,
        pageLimit: clientQueryParams.limit
      };
      handleUpdateClientAttributes({ attributesArray, attributesMetaData });
      return { attributesArray, attributesMetaData };
    }

    return defaultAttributesData;
  }, [clientResponse]);

  useEffect(() => {
    fetchClientAttributes();
  }, [clientQueryParams]);

  return (
    <>
      <AddMemberAttribute close={() => setAddMemberAttr(false)} show={addMemberAttr} />
      <AddClientAttribute
        close={() => {
          setAddClientAttr(false);
          setInitAttr({
            id: "",
            title: "",
            type: "",
            required: false,
            isSystem: false,
            isActive: true
          });
        }}
        show={addClientAttr}
        fetchAttributes={fetchClientAttributes}
        prefilledAttribute={initAttr}
      />

      <EditAttribute
        close={() => {
          setEditAttr(false);
          setInitAttr({
            id: "",
            title: "",
            type: "",
            required: false,
            isSystem: false,
            isActive: true
          });
        }}
        show={editAttr}
        prefilledAttribute={initAttr}
        fetchAttributes={fetchClientAttributes}
      />

      <OrgAttributesUI
        handleAddMemberAttr={() => setAddMemberAttr(true)}
        handleAddClientAttr={() => setAddClientAttr(true)}
        handleEditAttr={{
          setEditAttr: () => setEditAttr(true),
          handleSetDefaultAttribute: (attr: OrganisationAttributesData) => setInitAttr(attr)
        }}
        handleDuplicateClientAttr={{
          setDuplicateAttr: () => setAddClientAttr(true),
          handleSetDefaultDuplicate: (attr: OrganisationAttributesData) => setInitAttr(attr)
        }}
        handleArchiveAttr={archiveAttribute}
        handleRestoreAttr={restoreAttribute}
        handleClientAttrAction={{
          loading: clientStatus.isPending,
          handlePagination: handleMemberPagination
        }}
      />
    </>
  );
};

export { OrgAttributes };
