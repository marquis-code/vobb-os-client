import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CalendarIcon, EnvelopeClosedIcon, ImageIcon, PersonIcon } from "@radix-ui/react-icons";
import {
  ProfileCheckboxGroup,
  ProfileFileUpload,
  ProfileInput,
  ProfilePhoneInput,
  ProfileSelectInput
} from "components/form/profile-fields";
import {
  calculateTotalWordCount,
  dateFormatOptions,
  debounce,
  dynamicValidationSchema,
  initOptionType,
  languagesOptions,
  renderProfileFormFields,
  sysLangOptions,
  timeZoneOptions
} from "lib";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  MemberProfileProps,
  MemberPropertiesData,
  optionType,
  OrganisationAttributesData
} from "types";
import { useCountriesContext } from "context";
import { LoadingSpinner } from "components";

interface MemberProfileDetailsUIProps {
  profile: MemberProfileProps;
  orgAttributes: OrganisationAttributesData[];
  submit: (data: {
    name: string;
    value: string | optionType | optionType[];
    orgId: string;
  }) => void;
  loadingCustom: boolean;
  loading: boolean;
  customMemberAttr: MemberPropertiesData[];
}

const MemberProfileDetailsUI: React.FC<MemberProfileDetailsUIProps> = ({
  profile,
  orgAttributes,
  submit,
  loadingCustom,
  loading,
  customMemberAttr
}) => {
  const { countries } = useCountriesContext();
  const [date, setDate] = useState<Date>();
  const [file, setFile] = useState<File | null>(null);
  const [selectedCheckboxValues, setSelectedCheckboxValues] = useState<optionType[]>([]);
  const [selectedRadioValue, setSelectedRadioValue] = useState<optionType>();

  const handleCheckboxChange = (newValues: optionType[], id: string) => {
    setSelectedCheckboxValues(newValues);
    const selectedValues = newValues.map((option) => option.value);
    setValue(`checkbox_${id}`, selectedValues);
  };

  const handleRadioChange = (newValue: optionType | undefined, id: string) => {
    setSelectedRadioValue(newValue);
    setValue(`multiple-choice_${id}`, newValue?.value);
  };

  const schemaFields = orgAttributes?.reduce((acc, field) => {
    acc[`${field.type}_${field.id}`] = dynamicValidationSchema(field);
    return acc;
  }, {} as any);

  const schema = yup.object().shape(schemaFields);
  const {
    reset,
    watch,
    setValue,
    register,
    getValues,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {}
  });

  useEffect(() => {
    const customAttrValues = {};

    customMemberAttr.forEach((attr) => {
      const fieldName = `${attr.type}_${attr.id}`;
      const resetValue = attr.values;

      customAttrValues[fieldName] = resetValue;
    });
    reset({
      firstName: profile.fullName.split(" ")[0],
      lastName: profile.fullName.split(" ")[1],
      email: profile.pendingEmail ?? profile.email,
      phoneNumber: profile?.phoneNumber,
      jobTitle: profile?.jobTitle,
      ...customAttrValues
    });

    const language = profile?.syslanguage
      ? sysLangOptions.find((item) => item.value === profile.syslanguage) || initOptionType
      : initOptionType;
    setValue("sysLanguage", language);

    const timeZone = profile?.timeZone
      ? timeZoneOptions.find((item) => item.value === profile.timeZone) || initOptionType
      : initOptionType;
    setValue("timeZone", timeZone);

    const dateFormat = profile?.dateFormat
      ? dateFormatOptions.find((item) => item.value === profile.dateFormat) || initOptionType
      : initOptionType;
    setValue("dateFormat", dateFormat);

    const languages = profile?.fluentLanguages
      ? profile.fluentLanguages.map(
          (lang) => languagesOptions.find((option) => option.value === lang) || initOptionType
        )
      : [];
    setValue("languages", languages);
  }, [profile]);

  const longTextValues = useWatch({ control });

  const debouncedSubmit = debounce((name: string, orgId: string) => {
    const value = getValues()[name];
    if (value !== "" || value !== null) submit({ name, value, orgId });
  }, 1000);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (!name) return;
      const createdAttrId = name.split("_")[1];
      const orgId =
        customMemberAttr.filter((prop) => prop.id === createdAttrId)[0]?.attribute ?? undefined;
      if (getValues()[name]) {
        debouncedSubmit(name, orgId);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, getValues, customMemberAttr]);

  return (
    <div data-testid="member-details">
      <p className="mb-4 font-medium">Member Details</p>
      <ProfileInput
        label={"First name"}
        icon={<PersonIcon />}
        type="text"
        name="firstName"
        register={register}
        placeholder="Set first name"
      />
      <ProfileInput
        label={"Last name"}
        icon={<PersonIcon />}
        type="text"
        name="lastName"
        register={register}
        placeholder="Set last name"
      />
      <ProfileInput
        label={"Email address"}
        icon={<EnvelopeClosedIcon />}
        type="email"
        name="email"
        register={register}
        placeholder="Set email address"
      />
      <ProfilePhoneInput
        icon={<CalendarIcon />}
        label="Phone number"
        name="phoneNumber"
        value={watch("phoneNumber", profile?.phoneNumber)}
        validatorMessage={
          typeof errors.phoneNumber?.message === "string" ? errors.phoneNumber.message : undefined
        }
        handleChange={(val) => {
          setValue("phoneNumber", val);
        }}
      />
      <ProfileFileUpload
        icon={<ImageIcon />}
        label="Avatar"
        file={file}
        multiple
        id={"file"}
        name="avatar"
        onFileChange={(files) => {
          setFile(files);
          setValue("avatar", files);
        }}
      />
      <ProfileSelectInput
        icon={<CalendarIcon />}
        label="System Language"
        placeholder="select a language"
        options={[{ label: "English", value: "English" }]}
        value={watch("sysLanguage")?.value === "" ? null : watch("sysLanguage")}
        onChange={(val) => val && setValue("sysLanguage", val)}
      />
      <ProfileSelectInput
        icon={<CalendarIcon />}
        label="Timezone"
        placeholder="select a timezone"
        options={timeZoneOptions}
        value={watch("timeZone")?.value === "" ? null : watch("timeZone")}
        onChange={(val) => val && setValue("timeZone", val)}
      />
      <ProfileSelectInput
        icon={<CalendarIcon />}
        label="Date format"
        placeholder="select a date format"
        options={dateFormatOptions}
        value={watch("dateFormat")?.value === "" ? null : watch("dateFormat")}
        onChange={(val) => val && setValue("dateFormat", val)}
      />
      <ProfileInput
        label={"Job Title"}
        icon={<PersonIcon />}
        type="text"
        name="jobTitle"
        register={register}
        placeholder="Set Job title"
      />
      <ProfileCheckboxGroup
        icon={<PersonIcon />}
        label="Languages"
        options={languagesOptions}
        value={watch("languages")}
        onChange={(val) => {
          const value = val as optionType[];
          setValue("languages", value);
        }}
      />
      {loadingCustom ? (
        <LoadingSpinner />
      ) : (
        orgAttributes?.map((fieldData) => {
          // properties already set by member have a new id that will replace it's id from organisation.
          const memberProp = customMemberAttr.find((attr) => attr.label === fieldData.title);
          const id = memberProp ? memberProp.id : fieldData.id;
          return renderProfileFormFields({
            fieldData,
            id,
            register,
            errors,
            setValue,
            longTextCount: calculateTotalWordCount(longTextValues)[`long-text_${id}`] ?? 0,
            countries,
            radio: {
              value: selectedRadioValue,
              handleChange: handleRadioChange
            },
            checkbox: {
              value: selectedCheckboxValues,
              handleChange: handleCheckboxChange
            },
            date: {
              value: date,
              handleChange: setDate
            },
            file: {
              value: file,
              handleChange: setFile
            },
            watch,
            loading
          });
        })
      )}
    </div>
  );
};

export { MemberProfileDetailsUI };
