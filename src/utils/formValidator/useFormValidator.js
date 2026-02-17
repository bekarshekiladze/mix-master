import { useState } from "react";
import validateForm from "./formValidator";
import fieldValidator from "./fieldValidator";

function useFormValidator(schema) {
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData);

    const fieldErrors = validateForm(fieldValues, schema);

    if (Object.keys(fieldErrors).length > 0) {
      e.preventDefault();

      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    const fieldErrors = fieldValidator(value, schema[name]);
    setErrors((prevErrors) => {
      const nextErrorsObj = { ...prevErrors };
      if (fieldErrors.length > 0) {
        nextErrorsObj[name] = fieldErrors;
      } else {
        delete nextErrorsObj[name];
      }

      return nextErrorsObj;
    });
  };

  return { errors, handleSubmit, handleBlur };
}

export default useFormValidator;
