import { optionType } from "types/interfaces";
import timezones from "timezones-list";

export const sectorOptions: optionType[] = [
  {
    label: "Education",
    value: "Education"
  },
  {
    label: "Medical and Health",
    value: "Medical and Health"
  },
  {
    label: "Tourism",
    value: "Tourism"
  }
];

export const teamSizeOptions: optionType[] = [
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
    value: "50+"
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
