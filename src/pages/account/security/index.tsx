import { AccountSecurityUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { Setup2FA } from "./setup2fa";
import { useApiRequest, useFetchUser } from "hooks";
import { toast } from "components";
import {
  blacklistIpAddressService,
  changePasswordProfileService,
  fetchLoginHistoryService,
  send2faCodeService,
  toggleGoogleAuthService
} from "api";
import { BlacklistProps, ChangePasswordData } from "types";

export interface LoginHistoryDeviceProps {
  device: string;
  ipAddress: string;
  location: string;
  time: string;
  user: string;
  isBlacklisted: boolean;
}

interface MetaDataProps {
  currentPage: number;
  totalCount: number;
  totalPages: number;
}

export interface LoginHistoryDataProps {
  loginHistory: LoginHistoryDeviceProps[];
  historyMetaData: MetaDataProps;
}

const defaultLoginHistoryData: LoginHistoryDataProps = {
  loginHistory: [],
  historyMetaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0
  }
};

const AccountSecurity = () => {
  const [twoFactor, setTwoFactor] = useState({
    show: false
  });
  const { fetchUserDetails } = useFetchUser();
  const {
    run: runPassword,
    data: passwordResponse,
    error: passwordError,
    requestStatus: passwordStatus
  } = useApiRequest({});

  const {
    run: runSend2faCode,
    data: send2faCodeResponse,
    error: send2faCodeError
  } = useApiRequest({});

  const {
    run: runFetchLoginHistory,
    data: historyResponse,
    error: historyError
  } = useApiRequest({});

  const {
    run: runGoogleToggle,
    data: googleToggleResponse,
    error: googleToggleError
  } = useApiRequest({});

  const { run: runBlacklist, data: blacklistResponse, error: blacklistError } = useApiRequest({});

  const handlePasswordChange = (data: ChangePasswordData) => {
    runPassword(
      changePasswordProfileService({
        oldPassword: data.currentPassword,
        newPassword: data.password,
        confirmPassword: data.confirmPassword
      })
    );
  };

  const handleSend2faCode = (enable2FA: boolean) => {
    runSend2faCode(send2faCodeService({ enable2FA }));
  };

  const handleGoogleAuthToggle = (data: boolean) => {
    runGoogleToggle(toggleGoogleAuthService({ login_with_google: data }));
  };

  const handleFetchLoginHistory = (page: number) => {
    runFetchLoginHistory(fetchLoginHistoryService({ page, limit: 8 }));
  };

  const handleBlacklistAdress = (data: BlacklistProps) => {
    runBlacklist(blacklistIpAddressService({ ip: data.ipAddress, blacklist_status: data.status }));
  };

  useMemo(() => {
    if (passwordResponse?.status === 201) {
      toast({
        description: passwordResponse?.data?.message
      });
    } else if (passwordError) {
      toast({
        variant: "destructive",
        description: passwordError?.response?.data?.error
      });
    }
  }, [passwordResponse, passwordError]);

  useMemo(() => {
    if (send2faCodeResponse?.status === 200) {
      toast({
        description: send2faCodeResponse?.data?.message
      });
      setTwoFactor({ show: true });
    } else if (send2faCodeError) {
      toast({
        variant: "destructive",
        description: send2faCodeError?.response?.data?.error
      });
    }
  }, [send2faCodeResponse, send2faCodeError]);

  const loginHistoryData = useMemo<LoginHistoryDataProps>(() => {
    if (historyResponse?.status === 200) {
      const loginHistory = historyResponse?.data?.data?.history.map((item) => ({
        device: item.device,
        ipAddress: item.ip,
        location: item.location,
        time: item.time,
        user: item.user,
        isBlacklisted: item.blacklist_status ?? false
      }));
      const historyMetaData = {
        currentPage: historyResponse?.data?.data?.page ?? 1,
        totalPages: historyResponse?.data?.data?.total_pages,
        totalCount: historyResponse?.data?.data?.total_count
      };
      return { loginHistory, historyMetaData };
    }
    return defaultLoginHistoryData;
  }, [historyResponse, historyError]);

  useMemo(() => {
    if (googleToggleResponse?.status === 200) {
      toast({
        description: googleToggleResponse?.data?.message
      });
      fetchUserDetails();
    } else if (googleToggleError) {
      toast({
        variant: "destructive",
        description: googleToggleError?.response?.data?.error
      });
    }
  }, [googleToggleResponse, googleToggleError]);

  useMemo(() => {
    if (blacklistResponse?.status === 200) {
      toast({
        description: blacklistResponse?.data?.message
      });
      handleFetchLoginHistory(loginHistoryData.historyMetaData.currentPage);
    } else if (blacklistError) {
      toast({
        variant: "destructive",
        description: blacklistError?.response?.data?.error
      });
    }
  }, [blacklistResponse, blacklistError]);

  useEffect(() => {
    handleFetchLoginHistory(1);
  }, []);
  return (
    <>
      <Setup2FA {...twoFactor} close={() => setTwoFactor({ show: false })} />
      <AccountSecurityUI
        handle2FA={handleSend2faCode}
        connectedAccts={handleGoogleAuthToggle}
        submitPasswordChange={handlePasswordChange}
        loadingPasswordChange={passwordStatus.isPending}
        loginHistoryData={loginHistoryData}
        handleFetchLoginHistory={handleFetchLoginHistory}
        handleBlacklistAdress={handleBlacklistAdress}
      />
    </>
  );
};

export { AccountSecurity };
