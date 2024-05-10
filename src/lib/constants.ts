import { companySectorTypes, companySizeTypes } from "types";

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
