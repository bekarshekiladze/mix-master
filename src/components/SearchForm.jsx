import { Form, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/SearchForm";
import { useState } from "react";
import validateSearchForm from "../utils/validateSearchForm";

function SearchForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData);

    const fieldErrors = validateSearchForm(fieldValues);

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
    <Wrapper>
      <Form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="search"
            name="search"
            className={inputClass("search")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "searching..." : "search"}
          </button>
          {errors.search && <p className="field-error">{errors.search}</p>}
        </div>
      </Form>
    </Wrapper>
  );
}

export default SearchForm;
