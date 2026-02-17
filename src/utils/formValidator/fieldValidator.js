export default function fieldValidator(validator) {
  const error = validator(values[field]);
  if (error) {
    errors[field].push(error);
  }
}
