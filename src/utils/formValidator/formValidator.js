export default function validateForm(values, schema) {
  const errors = {};

  for (const field in schema) {
    const fieldValidators = schema[field];
    errors[field] = [];

    fieldValidators.forEach((validator) => {
      const error = validator(values[field]);
      if (error) {
        errors[field].push(error);
      }
    });
    if (errors[field].length === 0) {
      delete errors[field];
    }
  }

  return errors;
}
