import { OrgAttributesUI } from "modules";
import { AddMemberAttribute } from "./addMemberAttribute";
import { useEffect, useMemo, useState } from "react";
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
  const { orgAttributes, handleUpdateAttributes } = useUserContext();
  const { currentPage: memberPage } = orgAttributes?.attributesMetaData || {
    currentPage: 1
  };
  const [addMemberAttr, setAddMemberAttr] = useState(false);
  const [editMemberAttr, setEditMemberAttr] = useState(false);
  const [defaultAttr, setDefaultAttr] = useState<OrganisationAttributesData>({
    id: "",
    title: "",
    type: "",
    required: false,
    isSystem: false,
    isActive: true
  });

  const handleSetDefaultMemberAttribute = (attr: OrganisationAttributesData) => {
    setDefaultAttr(attr);
  };

  //paginations
  const [memberQueryParams, setMemberQueryParams] = useState({
    page: memberPage,
    limit: 20
  });

  const handleMemberPagination = (param: string, value: number) => {
    setMemberQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const {
    run: runFetchMember,
    data: memberResponse,
    requestStatus: memberStatus
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
      handleUpdateAttributes({ attributesArray, attributesMetaData });
      return { attributesArray, attributesMetaData };
    }

    return defaultAttributesData;
  }, [memberResponse]);

  useEffect(() => {
    fetchMemberAttributes();
  }, [memberQueryParams]);

  return (
    <>
      <AddMemberAttribute
        close={() => setAddMemberAttr(false)}
        show={addMemberAttr}
        fetchAttributes={fetchMemberAttributes}
        prefilledAttribute={defaultAttr}
      />
      <EditMemberAttribute
        close={() => setEditMemberAttr(false)}
        show={editMemberAttr}
        prefilledAttribute={defaultAttr}
        fetchAttributes={fetchMemberAttributes}
      />
      <OrgAttributesUI
        handleAddMemberAttr={() => setAddMemberAttr(true)}
        handleEditMemberAttr={{
          setEditAttr: () => setEditMemberAttr(true),
          handleSetDefaultAttribute: (attr: OrganisationAttributesData) =>
            handleSetDefaultMemberAttribute(attr)
        }}
        handleDuplicateMemberAttr={{
          setDuplicateAttr: () => setAddMemberAttr(true),
          handleSetDefaultDuplicate: (attr: OrganisationAttributesData) =>
            handleSetDefaultMemberAttribute(attr)
        }}
        handleArchiveAttr={archiveAttribute}
        handleRestoreAttr={restoreAttribute}
        handleMemberAction={{
          loading: memberStatus.isPending,
          handlePagination: handleMemberPagination
        }}
      />
    </>
  );
};

export { OrgAttributes };
