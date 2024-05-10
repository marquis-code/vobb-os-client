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
      <section className="border-b border-vobb-neutral-20 mb-8 max-w-[800px]">
        <h1 className="text-lg font-bold mb-4">Account Security</h1>
      </section>
      <ChangePassword submit={console.log} />
      <TwoFactor {...twoFactor} />
      <ConnectedAccounts {...connectedAccts} />
      <LoginHistory />
    </>
  );
};

export { AccountSecurityUI };
