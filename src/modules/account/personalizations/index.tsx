import { CustomAttributes, CustomAttributesProps } from "./customAttributes";
import { DateFormat, DateFormatProps } from "./dateFormat";
import { SystemLanguage, SystemLanguageProps } from "./systemLanguage";
import { TimeZone, TimeZoneProps } from "./timeZone";
import { YourLanguages, YourLanguagesProps } from "./yourLanguages";

interface PersonalizationsProps {
  systemLanguage: SystemLanguageProps;
  yourLanguages: YourLanguagesProps;
  dateFormat: DateFormatProps;
  timeZone: TimeZoneProps;
  orgProperties: CustomAttributesProps;
}
const AccountPersonalizationsUI: React.FC<PersonalizationsProps> = ({
  systemLanguage,
  yourLanguages,
  dateFormat,
  timeZone,
  orgProperties
}) => {
  return (
    <>
      <section className="border-b border-vobb-neutral-20 mb-8 max-w-[800px]">
        <h1 className="text-lg font-bold mb-4">Your Personalizations</h1>
      </section>
      <SystemLanguage {...systemLanguage} />
      <YourLanguages {...yourLanguages} />
      <DateFormat {...dateFormat} />
      <TimeZone {...timeZone} />
      <CustomAttributes {...orgProperties} />
    </>
  );
};

export { AccountPersonalizationsUI };
