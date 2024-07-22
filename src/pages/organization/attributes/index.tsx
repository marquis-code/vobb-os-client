import { OrgAttributesUI } from "modules";
import { AddMemberAttribute } from "./addMemberAttribute";
import { useEffect, useMemo, useState } from "react";
import { AddClientAttribute } from "./addClientAttribute";
import { useApiRequest } from "hooks";
import {
  archiveOrgAttributeService,
  fetchOrgAttributesService,
  restoreOrgAttributeService
} from "api";
import { AttributesDataProps, OrganisationAttributesData } from "types";
import { useUserContext } from "context";
import { EditMemberAttribute } from "./editMemberAttribute";
import { toast } from "components";
import { EditClientAttribute } from "./editClientAttribute";

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
  const {
    orgMemberAttributes,
    handleUpdateMemberAttributes,
    clientAttributes,
    handleUpdateClientAttributes
  } = useUserContext();

  const { currentPage: memberPage } = orgMemberAttributes?.attributesMetaData || {
    currentPage: 1
  };
  const { currentPage: clientPage } = clientAttributes?.attributesMetaData || {
    currentPage: 1
  };

  const [addMemberAttr, setAddMemberAttr] = useState(false);
  const [editMemberAttr, setEditMemberAttr] = useState(false);

  const [addClientAttr, setAddClientAttr] = useState<boolean>(false);
  const [editClientAttr, setEditClientAttr] = useState<boolean>(false);

  const [initAttr, setInitAttr] = useState<OrganisationAttributesData>({
    id: "",
    title: "",
    type: "",
    required: false,
    isSystem: false,
    isActive: true
  });

  //paginations
  const [memberQueryParams, setMemberQueryParams] = useState({
    page: memberPage,
    limit: 20
  });
  const [clientQueryParams, setClientQueryParams] = useState({
    page: clientPage,
    limit: 20
  });

  const handleMemberPagination = (param: string, value: number) => {
    setMemberQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const handleClientPagination = (param: string, value: number) => {
    setClientQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const {
    run: runFetchMember,
    data: memberResponse,
    requestStatus: memberStatus
  } = useApiRequest({});

  const {
    run: runFetchClient,
    data: clientResponse,
    requestStatus: clientStatus
  } = useApiRequest({});

  const { run: runArchive, data: archiveResponse, error: archiveError } = useApiRequest({});
  const { run: runRestore, data: restoreResponse, error: restoreError } = useApiRequest({});

  const fetchMemberAttributes = () => {
    runFetchMember(
      fetchOrgAttributesService({
        page: memberQueryParams.page,
        limit: memberQueryParams.limit,
        type: "member"
      })
    );
  };
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
      fetchMemberAttributes();
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
      fetchMemberAttributes();
      fetchClientAttributes();
    } else if (restoreError) {
      toast({
        variant: "destructive",
        description: restoreError?.response?.data?.error
      });
    }
  }, [restoreResponse, restoreError]);

  useMemo<AttributesDataProps>(() => {
    if (memberResponse?.status === 200) {
      const attributesArray = memberResponse?.data?.data?.attributes.map((item) => ({
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
        currentPage: memberResponse?.data?.data?.page ?? 1,
        totalPages: memberResponse?.data?.data?.total_pages,
        totalCount: memberResponse?.data?.data?.total_count,
        pageLimit: memberQueryParams.limit
      };
      handleUpdateMemberAttributes({ attributesArray, attributesMetaData });
      return { attributesArray, attributesMetaData };
    }

    return defaultAttributesData;
  }, [memberResponse]);

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

  useEffect(() => {
    fetchMemberAttributes();
  }, [memberQueryParams]);

  return (
    <>
      <AddMemberAttribute
        close={() => setAddMemberAttr(false)}
        show={addMemberAttr}
        fetchAttributes={fetchMemberAttributes}
        prefilledAttribute={initAttr}
      />
      <AddClientAttribute
        close={() => setAddClientAttr(false)}
        show={addClientAttr}
        fetchAttributes={fetchClientAttributes}
        prefilledAttribute={initAttr}
      />
      <EditMemberAttribute
        close={() => setEditMemberAttr(false)}
        show={editMemberAttr}
        prefilledAttribute={initAttr}
        fetchAttributes={fetchMemberAttributes}
      />
      <EditClientAttribute
        close={() => setEditClientAttr(false)}
        show={editClientAttr}
        prefilledAttribute={initAttr}
        fetchAttributes={fetchClientAttributes}
      />
      <OrgAttributesUI
        handleAddMemberAttr={() => setAddMemberAttr(true)}
        handleAddClientAttr={() => setAddClientAttr(true)}
        setEditMemberAttr={(attr: OrganisationAttributesData) => {
          setEditMemberAttr(true);
          setInitAttr(attr);
        }}
        setEditClientAttr={(attr: OrganisationAttributesData) => {
          setEditClientAttr(true);
          setInitAttr(attr);
        }}
        setDuplicateAttr={(attr: OrganisationAttributesData) => {
          setAddClientAttr(true);
          setInitAttr(attr);
        }}
        handleArchiveAttr={archiveAttribute}
        handleRestoreAttr={restoreAttribute}
        handleMemberAttrAction={{
          loading: memberStatus.isPending,
          handlePagination: handleMemberPagination
        }}
        handleClientAttrAction={{
          loading: clientStatus.isPending,
          handlePagination: handleClientPagination
        }}
      />
    </>
  );
};

export { OrgAttributes };
