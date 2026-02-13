import axios from "axios";
import { Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import validateFormEntries from "../utils/formValidation";
import { useState } from "react";

const newsletterUrl = "https://www.course-api.com/cocktails-newsletter";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const fieldErrors = validateFormEntries(data);
    if (Object.keys(fieldErrors).length > 0) {
      throw new Error(
        `Form fields didn't pass form validation: ${fieldErrors}`,
      );
    }

    const response = await axios.post(newsletterUrl, data);
    toast.success(response.data.msg);
    return redirect("/");
  } catch (error) {
    console.log(error);
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
  const [formValues, setFormValues] = useState({
    name: "",
    lastName: "",
    email: "test@test.com",
  });

  const handleSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData);

    const fieldErrors = validateFormEntries(fieldValues);

    if (Object.keys(fieldErrors).length > 0) {
      e.preventDefault();

      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
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
          value={formValues.name}
          onChange={handleChange}
        />
        {errors.name && <p className="field-error">{errors.name}</p>}
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
          onChange={handleChange}
          value={formValues.lastName}
        />
        {errors.lastName && <p className="field-error">{errors.lastName}</p>}
      </div>
      {/* email */}
      <div className="form-row">
        <label htmlFor="email" className="form-label">
          email
        </label>
        <input
          type="email"
          className={inputClass("email")}
          name="email"
          id="email"
          defaultValue="test@test.com"
          onChange={handleChange}
          value={formValues.email}
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
