import { companySectorTypes, companySizeTypes } from "types";
import { optionType } from "types/interfaces";
import timezones from "timezones-list";

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
