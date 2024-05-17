import { personalAccountDetailsService } from "api";
import { useApiRequest } from "../useApiRequest";
import { useMemo } from "react";
import { useUserContext } from "context";
import { UserProfileProps } from "types";
import { useLogout } from "hooks";

export const useFetchUser = () => {
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const { handleUpdateUser } = useUserContext();
  const { logout } = useLogout();

  const fetchUserDetails = () => run(personalAccountDetailsService());

  const profile = useMemo<UserProfileProps | null>(() => {
    if (response?.status === 200) {
      const user = response.data.data;
      const profile = {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role ?? "",
        avatar: user.avatar ?? "",
        phoneNumber: user.phone_number ?? "",
        dateFormat: user.date_format ?? "",
        timezone: user.timezone ?? "",
        language: user.language ?? "",
        twoFaStatus: user.two_fa_status ?? false,
        googleStatus: user.google_signup ?? false,
        pendingEmail: user.pending_email ?? null
      };
      handleUpdateUser(profile);
      return profile;
    } else if (error) logout();

    return null;
  }, [response, error]);

  return { fetchUserDetails, profile, loadingUser: requestStatus.isPending };
};
