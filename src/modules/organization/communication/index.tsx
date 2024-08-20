import { Button, SettingsPageTitle } from "components";
import { Switch } from "components/ui/switch";
import { useUserContext } from "context";
import { ReactNode, useState } from "react";
import { TemporarySuspensionPreview } from "./previews/TemporarySuspensionPreview";
import { IndefiniteSuspensionPreview } from "./previews/IndefiniteSuspensionPreview";

interface NoticeData {
  title: string;
  isEnabled: boolean;
  key: string;
  preview: ReactNode;
  loading: boolean;
  onCheckedChange: () => void;
}

interface OrgCommProps {
  submitTempSuspend: {
    loadingTemp: boolean;
    handleTempSuspend: ({ suspend }) => void;
  };
  submitIndefiniteSuspend: {
    loadingIndef: boolean;
    handleIndefSuspend: ({ suspend }) => void;
  };
}

const OrgCommunicationUI: React.FC<OrgCommProps> = ({
  submitTempSuspend,
  submitIndefiniteSuspend
}) => {
  const { loadingTemp, handleTempSuspend } = submitTempSuspend;
  const { loadingIndef, handleIndefSuspend } = submitIndefiniteSuspend;

  const { orgDetails } = useUserContext();
  const [preview, setPreview] = useState<string | undefined>();

  const notices: NoticeData[] = [
    {
      title: "Temporary suspension notice",
      isEnabled: orgDetails?.tempSuspensionNotice ?? false,
      key: "temporary-suspension",
      preview: <TemporarySuspensionPreview />,
      loading: loadingTemp,
      onCheckedChange: () => handleTempSuspend({ suspend: !orgDetails?.tempSuspensionNotice })
    },
    {
      title: "Deactivation notice",
      isEnabled: orgDetails?.indefiniteSuspensionNotice ?? false,
      key: "deactivation",
      preview: <IndefiniteSuspensionPreview />,
      loading: loadingIndef,

      onCheckedChange: () =>
        handleIndefSuspend({ suspend: !orgDetails?.indefiniteSuspensionNotice })
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
          {notices.map(({ title, isEnabled, onCheckedChange, key, loading }) => (
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
                <Switch checked={isEnabled} onCheckedChange={onCheckedChange} disabled={loading} />
              </span>
            </div>
          ))}
        </div>
        <div className="rounded-md min-h-[400px] p-4 bg-vobb-neutral-20" data-cy="preview">
          {notices.find((notice) => notice.key === preview)?.preview ||
            "No notice selected for preview"}
        </div>
      </section>
    </>
  );
};

export { OrgCommunicationUI };
