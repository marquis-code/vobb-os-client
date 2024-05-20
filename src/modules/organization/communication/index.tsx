import { Button, SettingsPageTitle } from "components";
import { Switch } from "components/ui/switch";
import { useState } from "react";

interface NoticeData {
  title: string;
  isEnabled: boolean;
  key: string;
}

const OrgCommunicationUI = () => {
  const [preview, setPreview] = useState<string | undefined>();

  const notices: NoticeData[] = [
    {
      title: "Temporary suspension notice",
      isEnabled: true,
      key: "temporary-suspension"
    },
    {
      title: "Deactivation notice",
      isEnabled: false,
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
                <Switch checked={isEnabled} onCheckedChange={console.log} />
              </span>
            </div>
          ))}
        </div>
        <div
          //   style={{ background: "#fff", border: "4px solid", borderColor: "#000" }}
          className="rounded-md min-h-[400px] p-4 bg-vobb-neutral-20">
          {preview ?? "No notice selected for preview"}
        </div>
      </section>
    </>
  );
};

export { OrgCommunicationUI };
