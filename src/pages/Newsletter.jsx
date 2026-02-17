import axios from "axios";
import { Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  isEmail,
  isRequired,
  minLength,
} from "../utils/formValidator/fieldValidators";
import validateForm from "../utils/formValidator/formValidator";

const newsletterUrl = "https://www.course-api.com/cocktails-newsletter";
const newsletterSchema = {
  name: [isRequired, minLength(2)],
  lastName: [isRequired, minLength(2)],
  email: [isEmail],
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData, newsletterSchema);
  try {
    // secondary validation, UI walkaround case
    const fieldErrors = validateForm(data);
    if (Object.keys(fieldErrors).length > 0) {
      return { fieldErrors, fieldValues: data };
    }

    const response = await axios.post(newsletterUrl, data);
    toast.success(response.data.msg);
    return redirect("/");
  } catch (error) {
    // action, server error
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function Newsletter() {
  // router state
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // local state
  const [errors, setErrors] = useState({});
  console.log({ errors });

  const handleSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData);

    const fieldErrors = validateForm(fieldValues, newsletterSchema);

    if (Object.keys(fieldErrors).length > 0) {
      e.preventDefault();

      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  };

  const inputClass = (name) =>
    `form-input ${errors[name] ? "input-error" : ""}`;

  return (
    <Form className="form" method="POST" onSubmit={handleSubmit}>
      <h4 style={{ textAlign: "center", marginBottom: "2rem" }}>
        our newsletter
      </h4>
      {/* name */}
      <div className="form-row">
        <label htmlFor="name" className="form-label">
          name
        </label>
        <input
          type="text"
          className={inputClass("name")}
          name="name"
          id="name"
        />
        {errors.name && <p className="field-error">{errors.name[0]}</p>}
      </div>
      {/* last name */}
      <div className="form-row">
        <label htmlFor="lastName" className="form-label">
          last name
        </label>
        <input
          type="text"
          className={inputClass("lastName")}
          name="lastName"
          id="lastName"
        />
        {errors.lastName && <p className="field-error">{errors.lastName[0]}</p>}
      </div>
      {/* email */}
      <div className="form-row">
        <label htmlFor="email" className="form-label">
          email
        </label>
        <input
          type="text"
          className={inputClass("email")}
          name="email"
          id="email"
          defaultValue="test@test.com"
        />
        {errors.email && <p className="field-error">{errors.email}</p>}
      </div>
      {/* submit */}
      <button
        type="submit"
        className="btn btn-block"
        style={{ marginTop: "0.5rem" }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "submitting..." : "submit"}
      </button>
    </Form>
  );
}

export default Newsletter;
