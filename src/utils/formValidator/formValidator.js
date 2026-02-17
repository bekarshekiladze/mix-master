import fieldValidator from "./fieldValidator";

export default function validateForm(values, schema) {
  const errors = {};

  for (const field in schema) {
    const fieldValidators = schema[field];

    const fieldErrors = fieldValidator(values[field], fieldValidators);

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
    }
  }

  return errors;
}
