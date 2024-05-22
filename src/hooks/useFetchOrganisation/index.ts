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

  const profile = useMemo<OrganisationProfileProps | null>(() => {
    if (response?.status === 200) {
      const org = response.data.data;
      const profile = {
        organisation: org.name,
        logo: org.logo ?? "",
        sector: org.sector,
        website: org.website,
        primaryEmail: org.primary_email ?? null,
        secondaryEmail: org.support_email ?? null,
        pendingPrimaryEmail: org.pending_primary_email ?? null,
        pendingSecondaryEmail: org.pending_support_email ?? null,
        primaryPhoneNumber: org.primary_phone_number ?? null,
        secondaryPhoneNumber: org.support_phone_number ?? null,
        suspensionNotice: org.suspension_notify ?? false
      };
      handleUpdateOrg(profile);
      return profile;
    } else if (error) logout();

    return null;
  }, [response, error]);

  return { fetchOrgDetails, profile, loadingOrg: requestStatus.isPending };
};
