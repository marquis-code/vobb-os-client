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
export type phone_number_type = string;
export type country_type = optionType;
export type multiple_choice_type = optionType;
export type checkbox_type = optionType;
export type dropdown_type = optionType;
export type file_type = File;
export type date_type = Date;

export type formFieldTypess = short_text_type | long_text_type | number_type;

interface short_text_data {
  value: short_text_type;
}

interface short_text_data {
  value: long_text_type;
  word_limit: number;
}

interface number_type_data {
  value: number_type;
}

interface email_type_data {
  value: email_type;
}

interface formFieldData {
  value: formFieldTypess;
  word_limit?: number;
  options: optionType[];
}

export interface FormFieldConfig {
  key: string;
  name: string;
  type:
    | "text"
    | "number"
    | "email"
    | "date"
    | "select"
    | "radio"
    | "checkbox"
    | "textarea"
    | "phone"
    | "file";
  label: string;
  required: boolean;
  minimum?: string | number;
  maximum?: string | number;
  placeholder?: string;
  defaultValue: string | number | boolean | string[] | any;
  options?: Array<{ label: string; value: string | number }> | any;
}
