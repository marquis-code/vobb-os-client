import { MetaDataProps } from "pages";
import { ChangePassword } from "./changePassword";
import { ConnectedAccounts, ConnectedAccountsProps } from "./connectedAccounts";
import { LoginHistory } from "./loginHistory";
import { TwoFactor, TwoFactorProps } from "./twoFactor";

interface AccountSecurityUIProps {
  twoFactor: TwoFactorProps;
  connectedAccts: ConnectedAccountsProps;
  submitPasswordChange: (data) => void;
  loadingPasswordChange: boolean;
  loginHistory: any;
  historyMetaData: MetaDataProps;
  handleFetchLoginHistory: (page: number) => void;
}

const AccountSecurityUI: React.FC<AccountSecurityUIProps> = ({
  twoFactor,
  connectedAccts,
  submitPasswordChange,
  loadingPasswordChange,
  loginHistory,
  historyMetaData,
  handleFetchLoginHistory
}) => {
  return (
    <>
      <section className="border-b border-vobb-neutral-20 mb-8 max-w-[800px]">
        <h1 className="text-lg font-bold mb-4">Account Security</h1>
      </section>
      <ChangePassword submit={submitPasswordChange} loadingPasswordChange={loadingPasswordChange} />
      <TwoFactor {...twoFactor} />
      <ConnectedAccounts {...connectedAccts} />
      <LoginHistory
        loginHistory={loginHistory}
        historyMetaData={historyMetaData}
        handleFetchLoginHistory={handleFetchLoginHistory}
      />
    </>
  );
};

export { AccountSecurityUI };
