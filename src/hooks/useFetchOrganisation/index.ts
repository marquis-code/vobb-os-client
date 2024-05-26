import { fetchOrgDetailsService } from "api";
import { useApiRequest } from "../useApiRequest";
import { useMemo } from "react";
import { useUserContext } from "context";
import { useLogout } from "hooks";
import { OrganisationProfileProps } from "types";

export const useFetchOrganisation = () => {
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const { handleUpdateOrg } = useUserContext();
  const { logout } = useLogout();

  const fetchOrgDetails = () => run(fetchOrgDetailsService());

  const organisation = useMemo<OrganisationProfileProps | null>(() => {
    if (response?.status === 200) {
      const org = response.data.data;
      const organisation = {
        organisation: org.name,
        sector: org.sector,
        logo: org.logo ?? "",
        website: org.website ?? "",
        primaryEmail: org.primary_email ?? null,
        secondaryEmail: org.support_email ?? null,
        pendingPrimaryEmail: org.pending_primary_email ?? null,
        pendingSecondaryEmail: org.pending_support_email ?? null,
        primaryPhoneNumber: org.primary_phone_number ?? null,
        secondaryPhoneNumber: org.support_phone_number ?? null,
        tempSuspensionNotice: org.temporary_suspension_notify ?? false,
        indefiniteSuspensionNotice: org.indefinite_suspension_notify ?? false,
        primaryBrandColor: org.primary_color ?? "#dde6ee",
        secondaryBrandColor: org.secondary_color ?? "#000000"
      };
      handleUpdateOrg(organisation);
      return organisation;
    } else if (error) logout();

    return null;
  }, [response, error]);

  return { fetchOrgDetails, organisation, loadingOrg: requestStatus.isPending };
};
