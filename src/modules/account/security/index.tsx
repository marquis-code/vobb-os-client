import { SettingsPageTitle } from "components";
import { ChangePassword } from "./changePassword";
import { ConnectedAccounts, ConnectedAccountsProps } from "./connectedAccounts";
import { LoginHistory } from "./loginHistory";
import { TwoFactor, TwoFactorProps } from "./twoFactor";

interface AccountSecurityUIProps {
  twoFactor: TwoFactorProps;
  connectedAccts: ConnectedAccountsProps;
}

const AccountSecurityUI: React.FC<AccountSecurityUIProps> = ({ twoFactor, connectedAccts }) => {
  return (
    <>
      <SettingsPageTitle title="Account Security" />
      <ChangePassword submit={console.log} />
      <TwoFactor {...twoFactor} />
      <ConnectedAccounts {...connectedAccts} />
      <LoginHistory />
    </>
  );
};

export { AccountSecurityUI };
