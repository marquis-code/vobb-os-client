import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Button, SettingsPageTitle } from "components";
import { Switch } from "components/ui/switch";
import { useUserContext } from "context";
import { useState } from "react";

interface NoticeData {
  title: string;
  isEnabled: boolean;
  key: string;
}

interface OrgCommProps {
  submitTempSuspend: ({ suspend }) => void;
  submitIndefiniteSuspend: ({ suspend }) => void;
}

const OrgCommunicationUI: React.FC<OrgCommProps> = ({
  submitTempSuspend,
  submitIndefiniteSuspend
}) => {
  const { orgDetails } = useUserContext();
  const [preview, setPreview] = useState<string | undefined>();

  const notices: NoticeData[] = [
    {
      title: "Temporary suspension notice",
      isEnabled: orgDetails?.tempSuspensionNotice ?? false,
      key: "temporary-suspension"
    },
    {
      title: "Deactivation notice",
      isEnabled: orgDetails?.indefiniteSuspensionNotice ?? false,
      key: "deactivation"
    }
  ];
  return (
    <>
      <SettingsPageTitle
        title="Communication"
        description={"Control the email notices that go out to the members of your organization"}
        className="max-w-none"
      />
      <section className="grid grid-cols-[1.5fr,2fr] gap-8 pt-4">
        <div className="flex flex-col gap-3 items-start ">
          {notices.map(({ title, isEnabled, key }) => (
            <div key={key} className="flex items-center justify-between gap-4 w-full">
              <p>{title}</p>
              <span className="flex items-center gap-4">
                <Button
                  size={"sm"}
                  className="p-0 h-[fit-content] text-vobb-neutral-80"
                  variant={"link"}
                  onClick={() => setPreview(key)}>
                  Preview mail
                </Button>
                <Switch
                  checked={isEnabled}
                  onCheckedChange={() => {
                    key === "temporary-suspension"
                      ? submitTempSuspend({ suspend: !isEnabled })
                      : submitIndefiniteSuspend({ suspend: !isEnabled });
                  }}
                />
              </span>
            </div>
          ))}
        </div>
        <div className="rounded-md min-h-[400px] p-4 bg-vobb-neutral-20">
          {preview ? <PreviewDisplay preview={preview} /> : "No notice selected for preview"}
        </div>
      </section>
    </>
  );
};

export { OrgCommunicationUI };

interface PreviewProps {
  preview: string;
}

const PreviewDisplay = ({ preview }: PreviewProps) => {
  const { orgDetails } = useUserContext();
  const previewType = preview === "temporary-suspension" ? "Temporary" : "Indefinite";

  return (
    <section>
      <Avatar className="w-16 h-16">
        <AvatarImage src={orgDetails?.logo} alt="logo" />

        <AvatarFallback>
          {orgDetails?.organisation.charAt(0)}
          {orgDetails?.organisation.charAt(1)}
        </AvatarFallback>
      </Avatar>
      <div className="py-8">
        <h1 className="text-3xl text-center mb-10 text-gray-900">
          {previewType} on {orgDetails?.organisation}'s Vobb Workspace
        </h1>
        <div className="pb-8">
          <p className="text-xl text-gray-900 mb-6 font-semibold">Hi (your team member's name),</p>
          <p className="text-base text-gray-500 mb-4 leading-7">
            We regret to inform you that your access to {orgDetails?.organisation}'s Vobb workspace
            has been {previewType === "Temporary" ? "temporarily" : "indefinitely"} suspended,
            effective immediately for the following reason:
          </p>
          <p className="text-base text-gray-900 mb-4 leading-7 font-semibold pl-4 py-1 border-l-2 border-vobb-primary-70">
            (the reason for suspension)
          </p>
          <p className="text-base text-gray-500 mb-4 leading-7">
            Your access will remain suspended (expiration date of suspension). During this time, you
            will be unable to log in to the Vobb platform or participate in any activities within
            our workspace.
          </p>
          <p className="text-base text-gray-500 mb-4 leading-7">
            If you have any questions or would like to discuss this matter further, please feel free
            to reach out to your team lead.
          </p>
        </div>
        <div className="leading-8 text-base text-gray-500">
          <p>
            Thanks,
            <br /> The team
          </p>
        </div>
      </div>
      <footer className="border-t border-gray-300 pt-8">
        <p className="text-base text-gray-500 leading-7">
          This email was sent to{" "}
          <span className="text-vobb-primary-70 font-semibold">{orgDetails?.primaryEmail}</span>. If
          this is not you, please ignore this email.
        </p>
        <p className="text-base text-gray-500 leading-7 mt-4">
          © 2024 Vobb
          <br />
          71-75 Shelton Street, London, United Kingdom.
        </p>
      </footer>
    </section>
  );
};
