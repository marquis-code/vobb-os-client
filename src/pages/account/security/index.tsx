import { AccountSecurityUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { Setup2FA } from "./setup2fa";
import { useApiRequest } from "hooks";
import { toast } from "components";
import { changePasswordProfileService, fetchLoginHistoryService, send2faCodeService } from "api";
import { ChangePasswordData } from "modules/account/security/changePassword";

export interface MetaDataProps {
  currentPage: number;
  totalCount: number;
  totalPages: number;
}
const AccountSecurity = () => {
  const [twoFactor, setTwoFactor] = useState({
    show: false
  });
  const [loginHistory, setLoginHistory] = useState(null);
  const [historyMetaData, setHistoryMetaData] = useState<MetaDataProps>({
    currentPage: 1,
    totalCount: 0,
    totalPages: 0
  });

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

  const handleFetchLoginHistory = (page: number) => {
    runFetchLoginHistory(fetchLoginHistoryService({ page, limit: 3 }));
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

  useMemo(() => {
    if (historyResponse?.status === 200) {
      setLoginHistory(historyResponse?.data?.data?.history);
      setHistoryMetaData({
        currentPage: historyResponse?.data?.data?.page,
        totalPages: historyResponse?.data?.data?.total_pages,
        totalCount: historyResponse?.data?.data?.total_count
      });
    } else if (historyError) {
      toast({
        variant: "destructive",
        description: historyError?.response?.data?.error
      });
    }
  }, [historyResponse, historyError]);

  useEffect(() => {
    handleFetchLoginHistory(1);
  }, []);
  return (
    <>
      <Setup2FA {...twoFactor} close={() => setTwoFactor({ show: false })} />
      <AccountSecurityUI
        twoFactor={{
          handle2FA: handleSend2faCode,
          enable2FA: false
        }}
        connectedAccts={{
          handleGoogleAuth: console.log,
          enableGoogle: false
        }}
        submitPasswordChange={handlePasswordChange}
        loadingPasswordChange={passwordStatus.isPending}
        loginHistory={loginHistory}
        historyMetaData={historyMetaData}
        handleFetchLoginHistory={handleFetchLoginHistory}
      />
    </>
  );
};

export { AccountSecurity };
