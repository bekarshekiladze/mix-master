function validateSearchForm(data) {
  const fieldErrors = {};

  const q = (data.search ?? "").trim();

  if (q.length === 0) {
    fieldErrors.search = "The search query cannot be empty";
  }

  return fieldErrors;
}

export default validateSearchForm;
