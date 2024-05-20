import { SettingsPageTitle } from "components";
import { CustomAttributes } from "./customAttributes";
import { DateFormat } from "./dateFormat";
import { SystemLanguage } from "./systemLanguage";
import { TimeZone } from "./timeZone";
import { YourLanguages } from "./yourLanguages";

const AccountPersonalizationsUI = () => {
  return (
    <>
      <SettingsPageTitle title="Your Personalizations" />
      <SystemLanguage submit={console.log} />
      <YourLanguages submit={console.log} />
      <DateFormat submit={console.log} />
      <TimeZone submit={console.log} />
      <CustomAttributes submit={console.log} />
    </>
  );
};

export { AccountPersonalizationsUI };
