/**
 * GENERAL SCHEMAS
 */
import * as yup from "yup";

export const optionTypeSchemaReq = yup.object({
  label: yup.string().required("Required"),
  value: yup.string().required("Required")
});
export const optionTypeSchema = yup.object({
  label: yup.string(),
  value: yup.string()
});
