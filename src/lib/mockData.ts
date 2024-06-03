import { FormFieldConfig } from "types/formField";

export const loginHistoryMock = [
  {
    location: "Lagos, Nigeria",
    date: "05/05/2024",
    time: "5:15pm",
    ipAddress: "192.168.0.180",
    isBlacklisted: true
  },
  {
    location: "Oyo, Nigeria",
    date: "05/05/2024",
    time: "5:15pm",
    ipAddress: "192.168.134.180",
    isBlacklisted: false
  },
  {
    location: "Lagos, Nigeria",
    date: "05/05/2024",
    time: "5:25pm",
    ipAddress: "192.168.012.180",
    isBlacklisted: true
  }
];

export const BranchTableMock = [
  {
    id: "728ed52f",
    name: "Headquarters",
    country: "Nigeria",
    state: "Lagos",
    city: "Ikeja",
    timeZone: "GMT +1",
    isPrimary: true
  },
  {
    id: "728ed52f",
    name: "Branch Ide",
    country: "Canada",
    state: "Ontario",
    city: "Toronto",
    timeZone: "GMT -6",
    isPrimary: false
  }
];

export const MockDynamicData: FormFieldConfig[] = [
  {
    key: "firstName",
    name: "firstName",
    type: "text",
    label: "First name",
    required: true,
    maximum: "20",
    minimum: "5",
    placeholder: "Enter your first name",
    defaultValue: ""
  },
  {
    key: "lastName",
    name: "lastName",
    type: "text",
    label: "Last name",
    required: true,
    maximum: "20",
    minimum: "5",
    placeholder: "Enter your last name",
    defaultValue: ""
  },
  {
    key: "age",
    name: "age",
    type: "number",
    label: "Age",
    required: true,
    maximum: "60",
    minimum: "18",
    placeholder: "Enter your age",
    defaultValue: ""
  },
  {
    key: "userEmail",
    name: "userEmail",
    type: "email",
    label: "User Email",
    required: true,
    placeholder: "Enter your email Address",
    defaultValue: ""
  },
  {
    key: "dob",
    name: "dob",
    type: "date",
    label: "Date of Birth",
    required: true,
    maximum: "2020-05-01T20:29:56.421Z",
    minimum: "1990-10-25T20:29:56.421Z",
    placeholder: "Enter your date of birth",
    defaultValue: ""
  },
  {
    key: "favoriteColor",
    name: "favoriteColor",
    type: "select",
    label: "Favorite Color",
    required: true,
    options: [
      { label: "Red", value: "red" },
      { label: "Blue", value: "blue" },
      { label: "Green", value: "green" }
    ],
    defaultValue: ""
  },
  {
    key: "gender",
    name: "gender",
    type: "radio",
    label: "Gender",
    required: false,
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" }
    ],
    defaultValue: "male"
  },
  {
    key: "hobbies",
    name: "hobbies",
    type: "checkbox",
    label: "Hobbies",
    required: false,
    options: [
      { label: "Reading", value: "reading" },
      { label: "Traveling", value: "traveling" },
      { label: "Cooking", value: "cooking" }
    ],
    defaultValue: ["reading"]
  },
  {
    key: "resume",
    name: "resume",
    type: "file",
    label: "Resume",
    required: false,
    defaultValue: null
  }
];
