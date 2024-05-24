import { Logo, LogoIcon } from "assets";
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
        <div
          style={{
            background: orgDetails?.primaryBrandColor,
            border: "4px solid",
            borderColor: orgDetails?.secondaryBrandColor
          }}
          className="rounded-md min-h-[400px] p-4 bg-vobb-neutral-20">
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
  const { orgDetails, userDetails } = useUserContext();
  const previewType = preview === "temporary-suspension" ? "Temporary" : "Indefinite";
  const reason = "Non-compliance to rules and guidelines";
  const endDate = "30/12/2024";

  return (
    <section>
      <Logo className="block mb-8" />
      <div className="py-8">
        <h2 className="text-2xl text-center mb-10 font-semibold">
          {previewType} suspension on {orgDetails?.organisation}'s Vobb Workspace
        </h2>
        <div className="pb-4">
          <p className="text-xl mb-6 font-semibold">Hi {userDetails?.firstName},</p>
          <p className="mb-4 ">
            We regret to inform you that your access to {orgDetails?.organisation}'s Vobb workspace
            has been {previewType === "Temporary" ? "temporarily" : "indefinitely"} suspended,
            effective immediately for the following reason:
          </p>
          <p className="mb-4  font-semibold pl-4 py-1 border-l-2 border-indigo-700">{reason}</p>
          <p className="mb-4 ">
            Your access will remain suspended untill {endDate}. During this time, you will be unable
            to log in to the Vobb platform or participate in any activities within our workspace.
          </p>
          <p className="mb-4 ">
            If you have any questions or would like to discuss this matter further, please feel free
            to reach out to your team lead.
          </p>
        </div>
        <p>
          Thanks,
          <br /> The team
        </p>
      </div>
      <div className="border-t border-gray-300">
        <p>
          This email was sent to{" "}
          <span className="text-indigo-700 font-semibold">{userDetails?.email}</span>. If this is
          not you, please ignore this email.
        </p>
        <p className="mt-4">
          © 2024 Vobb
          <br />
          71-75 Shelton Street, London, United Kingdom
        </p>
      </div>
    </section>
  );
};
