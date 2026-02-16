import { isRequired, minLength } from "./fieldValidators";

// for Login Form
const loginSchema = {
  email: [isRequired, isEmail],
  password: [isRequired, minLength(6)],
};

// for Search Form
const registerSchema = {
  search: [isRequired, minLength(2)],
};
