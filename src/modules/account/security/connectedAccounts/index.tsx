import { GoogleLogoIcon } from "assets";
import { Button, LearnMoreModal } from "components";
import { Switch } from "components/ui/switch";
import { useUserContext } from "context";
import { useState } from "react";

export interface ConnectedAccountsProps {
  handleGoogleAuth: (enable: boolean) => void;
}

const ConnectedAccounts: React.FC<ConnectedAccountsProps> = ({ handleGoogleAuth }) => {
  const { userDetails } = useUserContext();
  const [learn, setLearn] = useState(false);

  const learnMoreText1 = `By connecting your Google account, you'll enjoy a secure and hassle-free login process. No need to remember yet another username and password.`;
  const learnMoreText2 = `With Google's robust security measures, you can trust that your sensitive business data will be protected.`;
  const enableGoogle = userDetails?.googleStatus;
  return (
    <>
      <LearnMoreModal
        text1={learnMoreText1}
        text2={learnMoreText2}
        show={learn}
        title="About Google Authentication"
        close={() => setLearn(false)}
      />
      <section className="grid grid-cols-[1fr,2fr] gap-8 border-b border-vobb-neutral-20 pb-8 mb-12 max-w-[800px]">
        <div>
          <h2 className="text-[16px] font-semibold mb-2">Connected Accounts</h2>
          <p className="text-xs">
            Seamlessly integrate your preferred platforms to login with ease
          </p>
        </div>
        <div className="flex items-start justify-between text-sm">
          <div className="flex gap-4 items-center text-sm" data-cy="google-connection">
            <GoogleLogoIcon />
            <p>Enable Google Authentication</p>
          </div>
          <span className="flex items-center gap-4" data-cy="connect-switch">
            <Button
              size={"sm"}
              className="p-0 h-[fit-content]"
              variant={"link"}
              onClick={() => setLearn(true)}>
              Learn more
            </Button>
            <Switch
              checked={enableGoogle}
              onCheckedChange={() => handleGoogleAuth(!enableGoogle)}
            />
          </span>
        </div>
      </section>
    </>
  );
};

export { ConnectedAccounts };
