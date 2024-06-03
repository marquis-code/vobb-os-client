import { FormFieldConfig } from "types/formField";
import * as Yup from "yup";

export const generateValidationSchema = (config) => {
  const shape = {};

  config.forEach((field: FormFieldConfig) => {
    let schema;

    switch (field.type) {
      case "text":
      case "email":
        schema = Yup.string();
        if (field.type === "email") {
          schema = schema.email("Invalid email format");
        }
        break;
      case "number":
        schema = Yup.number().typeError("Must be a number");
        break;
      case "date":
        schema = Yup.date().typeError("Invalid date format");
        break;
      case "select":
      case "radio":
      case "checkbox":
        schema = Yup.mixed();
        break;
      case "file":
        schema = Yup.mixed();
        break;
      default:
        schema = Yup.mixed();
    }

    if (field.required) {
      schema = schema.required(`${field.label} is required`);
    }

    if (field.minimum) {
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

    if (field.maximum) {
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

  return Yup.object().shape(shape);
};
