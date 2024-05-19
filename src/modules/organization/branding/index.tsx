import { Button, ColorPicker, SettingsPageTitle } from "components";
import { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

const OrgBrandingUI = () => {
  const [primary, setPrimary] = useState("#dde6ee");
  const [secondary, setSecondary] = useState("#000000");

  return (
    <>
      <SettingsPageTitle title="Branding" className="max-w-none" />
      <section className="grid grid-cols-[1fr,2fr] gap-4 pt-4">
        <div>
          <div className="mb-8">
            <p className="text-sm font-semibold mb-4">Primary Brand Color</p>
            <ColorPicker value={primary} handleChange={setPrimary} />
          </div>
          <div>
            <p className="text-sm font-semibold mb-4">Secondary Brand Color</p>
            <ColorPicker value={secondary} handleChange={setSecondary} />{" "}
          </div>
          <div className="flex gap-2 justify-start max-w-[800px] pt-10">
            <Button onClick={console.log} variant={"outline"}>
              Cancel
            </Button>
            <Button onClick={console.log} variant={"fill"}>
              Save
            </Button>
          </div>
        </div>
        <div
          style={{ background: primary, border: "4px solid", borderColor: secondary }}
          className="rounded-md min-h-[400px] p-4">
          Invoice Preview, Agent Login Preview
        </div>
      </section>
    </>
  );
};

export { OrgBrandingUI };
