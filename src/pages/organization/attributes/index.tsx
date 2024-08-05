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
const initAttrFields = {
  id: "",
  title: "",
  type: "",
  required: false,
  isSystem: false,
  isActive: true
};

const OrgAttributes = () => {
  const [addMemberAttr, setAddMemberAttr] = useState(false);
  const [editMemberAttr, setEditMemberAttr] = useState(false);

  const [addClientAttr, setAddClientAttr] = useState<boolean>(false);
  const [editClientAttr, setEditClientAttr] = useState<boolean>(false);

  const [initAttr, setInitAttr] = useState<OrganisationAttributesData>(initAttrFields);

  //paginations
  const [memberQueryParams, setMemberQueryParams] = useState({
    page: 1,
    limit: 20
  });
  const { page: memberPage, limit: memberLimit } = memberQueryParams;

  const [clientQueryParams, setClientQueryParams] = useState({
    page: 1,
    limit: 20
  });
  const { page: clientPage, limit: clientLimit } = clientQueryParams;

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

  const fetchMemberAttributes = (page: number, limit: number) => {
    runFetchMember(
      fetchOrgAttributesService({
        page,
        limit,
        type: "member"
      })
    );
  };
  const fetchClientAttributes = (page: number, limit: number) => {
    runFetchClient(
      fetchOrgAttributesService({
        page,
        limit,
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
      fetchMemberAttributes(memberPage, memberLimit);
      fetchClientAttributes(clientPage, clientLimit);
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
      fetchMemberAttributes(memberPage, memberLimit);
      fetchClientAttributes(clientPage, clientLimit);
    } else if (restoreError) {
      toast({
        variant: "destructive",
        description: restoreError?.response?.data?.error
      });
    }
  }, [restoreResponse, restoreError]);

  const memberAttributes = useMemo<AttributesDataProps>(() => {
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
      return { attributesArray, attributesMetaData };
    }

    return defaultAttributesData;
  }, [memberResponse]);

  const clientAttributes = useMemo<AttributesDataProps>(() => {
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
      return { attributesArray, attributesMetaData };
    }

    return defaultAttributesData;
  }, [clientResponse]);

  useEffect(() => {
    fetchClientAttributes(clientPage, clientLimit);
  }, [clientQueryParams]);

  useEffect(() => {
    fetchMemberAttributes(memberPage, memberLimit);
  }, [memberQueryParams]);

  return (
    <>
      <AddMemberAttribute
        close={() => {
          setAddMemberAttr(false);
          setInitAttr(initAttrFields);
        }}
        show={addMemberAttr}
        callback={() => fetchMemberAttributes(memberPage, memberLimit)}
        prefilledAttribute={initAttr}
      />
      <AddClientAttribute
        close={() => {
          setAddClientAttr(false);
          setInitAttr(initAttrFields);
        }}
        show={addClientAttr}
        callback={() => fetchClientAttributes(clientPage, clientLimit)}
        prefilledAttribute={initAttr}
      />
      <EditMemberAttribute
        close={() => {
          setEditMemberAttr(false);
          setInitAttr(initAttrFields);
        }}
        show={editMemberAttr}
        prefilledAttribute={initAttr}
        callback={() => fetchMemberAttributes(memberPage, memberLimit)}
      />
      <EditClientAttribute
        close={() => {
          setEditClientAttr(false);
          setInitAttr(initAttrFields);
        }}
        show={editClientAttr}
        prefilledAttribute={initAttr}
        callback={() => fetchClientAttributes(clientPage, clientLimit)}
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
        setDuplicateMemberAttr={(attr: OrganisationAttributesData) => {
          setAddMemberAttr(true);
          setInitAttr(attr);
        }}
        setDuplicateClientAttr={(attr: OrganisationAttributesData) => {
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
        memberAttributes={memberAttributes}
        clientAttributes={clientAttributes}
      />
    </>
  );
};

export { OrgAttributes };
