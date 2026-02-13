function validateFormEntries(data) {
  const fieldErrors = {};

  if (!data.name || data.name.trim().length < 2) {
    fieldErrors.name = "Name must be at least 2 characters";
  }

  if (!data.lastName || data.lastName.trim().length < 2) {
    fieldErrors.lastName = "Last name must be at least 2 characters";
  }

  if (!data.email || !data.email.includes("@")) {
    fieldErrors.email = "Please enter a valid email";
  }

  return fieldErrors;
}

export default validateFormEntries;
