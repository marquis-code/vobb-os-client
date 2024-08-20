import { Button, ColorPicker, SettingsPageTitle } from "components";
import { useUserContext } from "context";
import { useEffect, useState } from "react";

export interface OrgBrandingData {
  primary: string;
  secondary: string;
}
interface OrgBrandingProps {
  submit: (data: OrgBrandingData) => void;
  loading: boolean;
}
const OrgBrandingUI: React.FC<OrgBrandingProps> = ({ submit, loading }) => {
  const { orgDetails } = useUserContext();
  const { primaryBrandColor = "", secondaryBrandColor = "" } = orgDetails || {};
  const [primary, setPrimary] = useState<string>(primaryBrandColor);
  const [secondary, setSecondary] = useState<string>(secondaryBrandColor);

  const handleDefault = () => {
    setPrimary(primaryBrandColor);
    setSecondary(secondaryBrandColor);
  };

  const handleSubmit = () => {
    submit({ primary, secondary });
  };
  useEffect(() => {
    handleDefault();
  }, [orgDetails]);

  return (
    <>
      <SettingsPageTitle title="Branding" className="max-w-none" />
      <section className="grid grid-cols-[1fr,2fr] gap-4 pt-4">
        <div>
          <div className="mb-8" data-cy="primary-color">
            <p className="text-sm font-semibold mb-4">Primary Brand Color</p>
            <ColorPicker value={primary} handleChange={setPrimary} />
          </div>
          <div data-cy="secondary-color">
            <p className="text-sm font-semibold mb-4">Secondary Brand Color</p>
            <ColorPicker value={secondary} handleChange={setSecondary} />{" "}
          </div>
          <div className="flex gap-2 justify-start max-w-[800px] pt-10">
            <Button onClick={handleDefault} variant={"outline"} disabled={loading}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant={"fill"}
              disabled={loading}
              loading={loading}
              data-cy="save-btn">
              Save
            </Button>
          </div>
        </div>
        <div
          style={{ background: primary, border: "4px solid", borderColor: secondary }}
          className="rounded-md min-h-[400px] p-4"
          data-cy="preview">
          Invoice Preview, Agent Login Preview
        </div>
      </section>
    </>
  );
};

export { OrgBrandingUI };
