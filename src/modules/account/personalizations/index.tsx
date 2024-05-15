import { CustomAttributes } from "./customAttributes";
import { DateFormat } from "./dateFormat";
import { SystemLanguage } from "./systemLanguage";
import { TimeZone } from "./timeZone";
import { YourLanguages } from "./yourLanguages";

const AccountPersonalizationsUI = ({ handleChangeSystemLanguage, loadingSytemLang }) => {
  return (
    <>
      <section className="border-b border-vobb-neutral-20 mb-8 max-w-[800px]">
        <h1 className="text-lg font-bold mb-4">Your Personalizations</h1>
      </section>
      <SystemLanguage submit={handleChangeSystemLanguage} loadingSytemLang={loadingSytemLang} />
      <YourLanguages submit={console.log} />
      <DateFormat submit={console.log} />
      <TimeZone submit={console.log} />
      <CustomAttributes submit={console.log} />
    </>
  );
};

export { AccountPersonalizationsUI };
