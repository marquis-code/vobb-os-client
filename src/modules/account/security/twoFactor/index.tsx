import { Button, LearnMoreModal } from "components";
import { Switch } from "components/ui/switch";
import { useUserContext } from "context";
import { useState } from "react";

export interface TwoFactorProps {
  handle2FA: (enable: boolean) => void;
}

const TwoFactor: React.FC<TwoFactorProps> = ({ handle2FA }) => {
  const { userDetails } = useUserContext();
  const [learn, setLearn] = useState(false);
  const enabled = userDetails?.twoFaStatus;
  const learnMoreText1 = `Two-Factor Authentication (2FA) is an advanced security measure that fortifies your account against unauthorized access. 
  When you log in, 2FA demands two distinct forms of identification: your password and a unique verification code sent to your registered email. 
  This additional security step adds a critical barrier, making it exceedingly difficult for malicious actors to breach your account.`;

  const learnMoreText2 = `To setup 2FA, you will be required to enter a verification code sent to your email. 
  This helps us to know that you're able to receive the necessary verification code when you need to login`;

  return (
    <>
      <LearnMoreModal
        text1={learnMoreText1}
        text2={learnMoreText2}
        show={learn}
        title="About 2FA"
        close={() => setLearn(false)}
      />
      <section className="grid grid-cols-[1fr,2fr] gap-8 border-b border-vobb-neutral-20 pb-8 mb-12 max-w-[800px]">
        <div>
          <h2 className="text-[16px] font-semibold mb-2">Two-Factor Authentication</h2>
          <p className="text-xs">Secure your account by adding an extra layer of protection</p>
        </div>
        <div className="flex items-start justify-between text-sm">
          <p>Enable Two-Factor Authentication</p>
          <span className="flex items-center gap-4">
            <Button
              size={"sm"}
              className="p-0 h-[fit-content]"
              variant={"link"}
              onClick={() => setLearn(true)}>
              Learn more
            </Button>
            <Switch
              checked={enabled}
              onCheckedChange={() => {
                handle2FA(!enabled);
              }}
            />
          </span>
        </div>
      </section>
    </>
  );
};

export { TwoFactor };
