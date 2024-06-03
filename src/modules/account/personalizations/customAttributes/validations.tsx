import * as yup from "yup";
import { FormFieldConfig } from "types/formField";
import { isFile } from "lib";

export const generateValidationSchema = (config: FormFieldConfig[]) => {
  const shape = {};

  config.forEach((field) => {
    let schema;

    switch (field.type) {
      case "text":
      case "email":
        schema = yup.string();
        if (field.type === "email") {
          schema = schema.email("Invalid email format");
        }
        break;
      case "number":
        schema = yup.number().typeError("Must be a number");
        break;
      case "date":
        schema = yup.date().typeError("Invalid date format");
        break;
      case "file":
        schema = yup
          .mixed()
          .test(
            "fileSize",
            "Image is too large",
            (value) => !value || (isFile(value) && value.size <= 1048576 * 10)
          );
        break;
      case "select":
      case "radio":
      case "checkbox":
        schema = yup.mixed();
        break;
      default:
        schema = yup.mixed();
    }

    if (field.required) {
      schema = schema.required(`${field.label} is required`);
    }

    if (field.minimum !== undefined) {
      if (field.type === "number") {
        schema = schema.min(
          Number(field.minimum),
          `${field.label} must be at least ${field.minimum}`
        );
      } else if (field.type === "date") {
        schema = schema.min(
          new Date(field.minimum),
          `Date must be after ${new Date(field.minimum).toDateString()}`
        );
      } else {
        schema = schema.min(
          Number(field.minimum),
          `${field.label} must be at least ${field.minimum} characters`
        );
      }
    }

    if (field.maximum !== undefined) {
      if (field.type === "number") {
        schema = schema.max(
          Number(field.maximum),
          `${field.label} must be at most ${field.maximum}`
        );
      } else if (field.type === "date") {
        schema = schema.max(
          new Date(field.maximum),
          `Date must be before ${new Date(field.maximum).toDateString()}`
        );
      } else {
        schema = schema.max(
          Number(field.maximum),
          `${field.label} must be at most ${field.maximum} characters`
        );
      }
    }

    shape[field.name] = schema;
  });

  return yup.object().shape(shape);
};
