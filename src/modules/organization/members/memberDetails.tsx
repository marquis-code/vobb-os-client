import { CalendarIcon, EnvelopeClosedIcon, PersonIcon } from "@radix-ui/react-icons";
import {
  ProfileCheckboxGroup,
  ProfileDatePicker,
  ProfileFileUpload,
  ProfileInput,
  ProfilePhoneInput,
  ProfileRadioGroup,
  ProfileSelectInput,
  ProfileTextarea
} from "components/form/profile-fields";
import { useState } from "react";

const MemberProfileDetailsUI = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <div>
        <p className="mb-4 font-medium">Member Details</p>
        <ProfileInput
          label={"First name"}
          icon={<PersonIcon />}
          type="text"
          name="name"
          placeholder="Set first name"
        />
        <ProfileInput
          label={"Last name"}
          icon={<PersonIcon />}
          type="text"
          name="name"
          placeholder="Set last name"
        />
        <ProfileInput
          label={"Email address"}
          icon={<PersonIcon />}
          type="email"
          name="email"
          placeholder="Set email address"
        />
        <ProfileInput
          label={"Email address address address"}
          icon={<PersonIcon />}
          type="email"
          name="email"
          placeholder="Set email address"
        />
        <ProfileTextarea label={"Bio"} icon={<PersonIcon />} placeholder="Set bio" />
        <ProfileRadioGroup
          icon={<PersonIcon />}
          label="Multiple choice"
          options={[
            {
              label: "Option One",
              value: "option-one"
            },
            {
              label: "Option Two",
              value: "option-two"
            },
            {
              label: "Option Three",
              value: "option-three"
            }
          ]}
          value={{
            label: "Option One",
            value: "option-one"
          }}
          onChange={console.log}
        />
        <ProfileCheckboxGroup
          icon={<PersonIcon />}
          label="Checkboxes"
          options={[
            {
              label: "Option One",
              value: "option-one"
            },
            {
              label: "Option Two",
              value: "option-two"
            },
            {
              label: "Option Three",
              value: "option-three"
            }
          ]}
          value={[
            {
              label: "Option One",
              value: "option-one"
            },
            {
              label: "Option Two",
              value: "option-two"
            }
          ]}
          onChange={console.log}
        />
        <ProfileDatePicker
          icon={<CalendarIcon />}
          value={undefined}
          handleChange={console.log}
          label="Date"
        />
        <ProfilePhoneInput
          label="Phone number"
          validatorMessage={undefined}
          handleChange={console.log}
          icon={<CalendarIcon />}
        />
        <ProfileSelectInput
          icon={<CalendarIcon />}
          label="Country"
          options={[
            {
              label: "Option One",
              value: "option-one"
            },
            {
              label: "Option Two",
              value: "option-two"
            }
          ]}
          value={null}
          // value={{
          //   label: "Option One",
          //   value: "option-one"
          // }}
          onChange={console.log}
        />
        <ProfileFileUpload
          icon={<CalendarIcon />}
          label="File upload"
          file={file}
          multiple
          id={"file"}
          onFileChange={setFile}
        />
      </div>
    </>
  );
};

export { MemberProfileDetailsUI };
