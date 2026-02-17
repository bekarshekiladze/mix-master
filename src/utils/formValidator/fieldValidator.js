export default function fieldValidator(value, validators, values = {}) {
  const fieldErrors = [];

  validators.forEach((validator) => {
    const error = validator(value);
    if (error) {
      fieldErrors.push(error);
    }
  });

  return fieldErrors;
}
