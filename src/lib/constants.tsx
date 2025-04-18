import { companySectorTypes, companySizeTypes } from "types";
import { optionType } from "types/interfaces";
import timezones from "timezones-list";
import {
  CalendarIcon,
  DropdownMenuIcon,
  EnvelopeClosedIcon,
  FileIcon,
  LetterCaseCapitalizeIcon,
  ListBulletIcon,
  TextAlignJustifyIcon
} from "@radix-ui/react-icons";
import { CheckDoneIcon, FlagIcon, HashIcon, PhoneIcon } from "assets";
import { languages } from "./languages";

interface optionTypeSize {
  label: string;
  value: companySizeTypes;
}

interface optionTypeSector {
  label: string;
  value: companySectorTypes;
}

export const sectorOptions: optionTypeSector[] = [
  {
    label: "Education",
    value: "Education"
  },
  {
    label: "Medical and Health",
    value: "Health"
  },
  {
    label: "Tourism",
    value: "Tourism"
  }
];

export const teamSizeOptions: optionTypeSize[] = [
  {
    label: "0-5 Team members",
    value: "0-5"
  },
  {
    label: "6-10 Team members",
    value: "6-10"
  },
  {
    label: "11-20 Team members",
    value: "11-20"
  },
  {
    label: "21-50 Team members",
    value: "21-50"
  },
  {
    label: "50+ Team members",
    value: "51+"
  }
];

export const initOptionType: optionType = {
  label: "",
  value: ""
};

export const sysLangOptions: optionType[] = [
  {
    label: "English",
    value: "English"
  }
];

export const dateFormatOptions: optionType[] = [
  {
    label: "DD/MM/YYYY",
    value: "DD/MM/YYYY"
  },
  {
    label: "MM/DD/YYYY",
    value: "MM/DD/YYYY"
  },
  {
    label: "Month D, Yr",
    value: "Month D, Yr"
  }
];

export const timeZoneOptions: optionType[] = timezones
  .map((item) => ({
    label: item.label,
    value: item.tzCode
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const languagesOptions: optionType[] = languages
  .map((item) => ({
    label: item.name,
    value: item.name
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const attributeTypeOptions: optionType[] = [
  {
    label: "Short text",
    value: "text"
  },
  {
    label: "Long text",
    value: "long-text"
  },
  {
    label: "Number",
    value: "number"
  },
  {
    label: "Email",
    value: "email"
  },
  {
    label: "Phone number",
    value: "phone-number"
  },
  {
    label: "Country",
    value: "country"
  },
  {
    label: "Multiple choice",
    value: "multiple-choice"
  },
  {
    label: "Checkbox",
    value: "checkbox"
  },
  {
    label: "Dropdown",
    value: "dropdown"
  },
  {
    label: "File",
    value: "file"
  },
  {
    label: "Date",
    value: "date"
  }
];
export const fileTypeOptions: optionType[] = [
  {
    label: "PDF",
    value: "pdf"
  },
  {
    label: "Image",
    value: "image"
  }
];

export const attributeTypeIcons = {
  text: {
    icon: <LetterCaseCapitalizeIcon />,
    label: "Short text"
  },
  "long-text": {
    icon: <TextAlignJustifyIcon />,
    label: "Long text"
  },
  number: {
    icon: <HashIcon width={15} height={15} strokeWidth={1} />,
    label: "Number"
  },
  email: {
    icon: <EnvelopeClosedIcon />,
    label: "Email"
  },
  "phone-number": {
    icon: <PhoneIcon width={15} height={15} />,
    label: "Phone number"
  },
  country: {
    icon: <FlagIcon width={15} height={15} />,
    label: "Country"
  },
  "multiple-choice": {
    icon: <ListBulletIcon />,
    label: "Multiple choice"
  },
  checkbox: {
    icon: <CheckDoneIcon width={15} height={15} />,
    label: "Checkbox"
  },
  dropdown: {
    icon: <DropdownMenuIcon />,
    label: "Dropdown"
  },
  file: {
    icon: <FileIcon />,
    label: "File"
  },
  date: {
    icon: <CalendarIcon />,
    label: "Date"
  }
};

export const roleOptions: optionType[] = [
  {
    label: "Organization admin",
    value: "Super Admin"
  },
  {
    label: "Branch manager",
    value: "Branch Manager"
  },
  {
    label: "Team manager",
    value: "Team Manager"
  },
  {
    label: "Team lead",
    value: "Team Lead"
  },
  {
    label: "Team member",
    value: "Team Member"
  }
];

export interface ObjectOptionProps {
  title: string;
  color: string;
  id?: string;
}
export const objectOptions: ObjectOptionProps[] = [
  {
    title: "Client",
    color: "#EDA12F"
  },
  {
    title: "Product",
    color: "#4A22EB"
  },
  {
    title: "Offering",
    color: "#088FFF"
  },
  {
    title: "Package",
    color: "#EDA12F"
  },
  {
    title: "General",
    color: "#EDA12F"
  }
];

export const statusOptions: ObjectOptionProps[] = [
  {
    title: "Complete",
    color: "#069952"
  },
  {
    title: "Incomplete",
    color: "#EDA12F"
  },
  {
    title: "Archive",
    color: "#EAECF0"
  }
];

export const priorityOptions: ObjectOptionProps[] = [
  {
    title: "High",
    color: "#E62E2E"
  },
  {
    title: "Medium",
    color: "#EDA12F"
  },
  {
    title: "Low",
    color: "#069952"
  }
];

export const toolTipInfos = {
  stageCreation: `Pipeline stages represent the different phases of the client's journey through your organization while purchasing a service. Each stage allows you to track and manage the client's status efficiently.
Customize each stage with a title, order, color, and rules for movement to build a structured flow for your client interactions.`,
  allStagesAllowed: `Clients from all other stages are allowed to move into this stage.`,
  specificStageAllowed(number: number) {
    return `Only clients from ${number} stage${number > 1 ? 's' : ''} are allowed to move into this stage.`
  },
  stageValidation: "At least two stages are required to complete the pipeline setup."
};

export const PipelineStagesColors = [
  "#4A22EB",
  "#088FFF",
  "#069952",
  "#E62E2E",
  "#FFCC00",
  "#F0AF4F",
  "#FFC0CB",
  "#4B0082",
  "#FFA500",
  "#866CF2",
  "#F65385",
  "#1D2939"
]

export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/png",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];
export const MAX_FILE_SIZE = 15 * 1024 * 1024;

