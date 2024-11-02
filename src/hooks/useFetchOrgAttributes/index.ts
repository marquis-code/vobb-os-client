import { fetchOrgPropertiesService } from "api";
import { useApiRequest } from "hooks/useApiRequest";
import { useMemo } from "react";
import { OrganisationAttributesData, PaginationProps } from "types";

export const useFetchOrgAttributes = () => {
  const { run, data: response, error, requestStatus } = useApiRequest({});

  const fetchOrgProperties = ({ page, limit }: PaginationProps) =>
    run(fetchOrgPropertiesService({ page, limit }));

  const orgProperties = useMemo<OrganisationAttributesData[]>(() => {
    if (response?.status === 200) {
      const propertiesArray = response?.data?.data?.attributes.map((item) => ({
        id: item._id,
        title: item.label,
        type: item.type,
        required: item.is_required,
        isSystem: item.is_system_prop,
        isActive: item.is_active,
        description: item.description,
        metaData: item.meta
      }));

      return propertiesArray;
    }

    return [];
  }, [response]);

  return { orgProperties, fetchOrgProperties, loading: requestStatus.isPending };
};
