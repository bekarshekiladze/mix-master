export const isRequired = (value) => {
  if (value === undefined || value === null || value === "") {
    return "input is required";
  }
  return null;
};

export const isEmail = (value) => {
  const regExp = /\S+@\S+\.\S/;
  return !regExp.test(value) ? "Invalid email" : null;
};

export const minLength = (length) => {
  return (value) =>
    value.length < length
      ? `Input should be minimum ${length} characters`
      : null;
};
