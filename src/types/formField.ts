import { optionType } from "./interfaces";

export type formFieldTypes =
  | "short_text"
  | "long_text"
  | "number"
  | "email"
  | "phone_number"
  | "country"
  | "multiple_choice"
  | "checkbox"
  | "dropdown"
  | "file"
  | "date";

export type short_text_type = string;
export type long_text_type = string;
export type number_type = number;
export type email_type = string;
export type phone_number_type = string | null;
export type country_type = optionType;
export type multiple_choice_type = optionType;
export type checkbox_type = optionType;
export type dropdown_type = optionType;
export type file_type = File;
export type date_type = Date;

export type formFieldTypess = short_text_type | long_text_type | number_type;

interface short_text_data {
  type: "short_text";
  value: short_text_type;
}

interface long_text_data {
  type: "long_text";
  value: long_text_type;
  word_limit: number;
}

interface number_type_data {
  type: "number";
  value: number_type;
}

interface email_type_data {
  type: "email";
  value: email_type;
}

interface phone_number_data {
  type: "phone_number";
  value: phone_number_type;
}

interface country_data {
  type: "country";
  value: country_type;
  options: optionType[];
}

interface multiple_choice_data {
  type: "multiple_choice";
  value: multiple_choice_type[];
  options: optionType[];
}

interface checkbox_data {
  type: "checkbox";
  value: checkbox_type[];
  options: optionType[];
}

interface dropdown_data {
  type: "dropdown";
  value: dropdown_type;
  options: optionType[];
}

interface file_data {
  type: "file";
  value: file_type;
  fileType: string[];
  maxSize: number;
}

interface date_data {
  type: "date";
  value: date_type;
  dateFormat: string;
}

export interface formFieldData {
  shortText?: short_text_data;
  longText?: long_text_data;
  number?: number_type_data;
  email?: email_type_data;
  phoneNumber?: phone_number_data;
  country?: country_data;
  multipleChoice?: multiple_choice_data;
  checkbox?: checkbox_data;
  dropdown?: dropdown_data;
  file?: file_data;
  date?: date_data | string;
}

export interface CustomAttributesFormData {
  shortText?: string;
  longText?: string;
  number?: string;
  email?: string;
  phoneNumber?: string | null;
  country?: optionType | null;
  multipleChoice?: optionType;
  checkbox?: string[];
  dropdown?: optionType[];
  file?: File | null;
  date?: string;
}

export interface fieldDataTypes {
  type: formFieldTypes;
  value: any;
  required?: boolean;
  options?: optionType[] | any;
  fileType?: string[];
  maxSize?: number;
  dateFormat?: string;
  word_limit?: string;
}
