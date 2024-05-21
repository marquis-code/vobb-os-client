import { LoginHistoryDataProps } from "pages";
import { SettingsPageTitle } from "components";
import { ChangePassword } from "./changePassword";
import { ConnectedAccounts } from "./connectedAccounts";
import { LoginHistory } from "./loginHistory";
import { TwoFactor } from "./twoFactor";
import { BlacklistProps, ChangePasswordData } from "types";

interface AccountSecurityUIProps {
  handle2FA: (enable: boolean) => void;
  connectedAccts: (enable: boolean) => void;
  submitPasswordChange: (data: ChangePasswordData) => void;
  loadingPasswordChange: boolean;
  loginHistoryData: LoginHistoryDataProps;
  handleFetchLoginHistory: (page: number) => void;
  handleBlacklistAdress: (data: BlacklistProps) => void;
}

const AccountSecurityUI: React.FC<AccountSecurityUIProps> = ({
  handle2FA,
  connectedAccts,
  submitPasswordChange,
  loadingPasswordChange,
  loginHistoryData,
  handleFetchLoginHistory,
  handleBlacklistAdress
}) => {
  return (
    <>
      <section className="border-b border-vobb-neutral-20 mb-8 max-w-[800px]">
        <h1 className="text-lg font-bold mb-4">Account Security</h1>
      </section>
      <ChangePassword submit={submitPasswordChange} loadingPasswordChange={loadingPasswordChange} />
      <TwoFactor handle2FA={handle2FA} />
      <ConnectedAccounts handleGoogleAuth={connectedAccts} />
      <LoginHistory
        loginHistoryData={loginHistoryData}
        handleFetchLoginHistory={handleFetchLoginHistory}
        handleBlacklist={handleBlacklistAdress}
      />
    </>
  );
};

export { AccountSecurityUI };
