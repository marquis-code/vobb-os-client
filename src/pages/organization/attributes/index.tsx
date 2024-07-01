import { OrgAttributesUI } from "modules";
import { AddMemberAttribute } from "./addMemberAttribute";
import { useEffect, useMemo, useState } from "react";
import { useApiRequest } from "hooks";
import { fetchOrgAttributesService } from "api";
import { AttributesDataProps } from "types";
import { useUserContext } from "context";

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
  const { currentPage } = orgAttributes?.attributesMetaData || {
    currentPage: 1
  };
  const [addMemberAttr, setAddMemberAttr] = useState(false);
  const [page, setPage] = useState(currentPage);
  const [limit, setLimit] = useState(20);
  const {
    run: runFetchAttr,
    data: fetchResponse,
    error: fetchError,
    requestStatus: fetchStatus
  } = useApiRequest({});

  const fetchAttributes = () => {
    runFetchAttr(fetchOrgAttributesService({ page, limit }));
  };

  useMemo<AttributesDataProps>(() => {
    if (fetchResponse?.status === 200) {
      const attributesArray = fetchResponse?.data?.data?.attributes.map((item) => ({
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
        currentPage: fetchResponse?.data?.data?.page ?? 1,
        totalPages: fetchResponse?.data?.data?.total_pages,
        totalCount: fetchResponse?.data?.data?.total_count,
        pageLimit: limit
      };
      handleUpdateAttributes({ attributesArray, attributesMetaData });
      return { attributesArray, attributesMetaData };
    }

    return defaultAttributesData;
  }, [fetchResponse, limit]);

  useEffect(() => {
    fetchAttributes();
  }, [page, limit]);

  return (
    <>
      <AddMemberAttribute
        close={() => setAddMemberAttr(false)}
        show={addMemberAttr}
        fetchAttributes={fetchAttributes}
      />
      <OrgAttributesUI
        handleAddMemberAttr={() => setAddMemberAttr(true)}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
      />
    </>
  );
};

export { OrgAttributes };
