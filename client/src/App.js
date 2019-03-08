import React from "react";
import { Form, withFormik } from "formik";
import axios from "axios";
import * as yup from "yup";

import normalizeErrors from "./normalizeErrors";
import Field from "./field";

const App = ({ handleSubmit, isSubmitting }) => (
  <div className="hero is-fullheight-with-navbar">
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="column is-6 is-offset-3">
          <h3 className="title has-text-grey">Enter your name and last name</h3>
        </div>

        <Form merhod="POST" onSubmit={handleSubmit}>
          <Field name="name" placeholder="Enter your name" />
          <Field name="lastname" placeholder="Enter your last name" />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`button is-block is-primary is-large is-fullwidth ${
              isSubmitting ? "is-loading" : ""
            }`}
          >
            Do it!
          </button>
        </Form>
      </div>
    </div>
  </div>
);

export default withFormik({
  mapPropsToValues: () => ({
    name: "",
    lastname: ""
  }),
  validationSchema: yup.object().shape({
    name: yup
      .string()
      .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/, "Wrong name.")
      .typeError("Is that a name?")
      .required("It's required!"),
    lastname: yup
      .string()
      .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/, "Wrong last name.")
      .typeError("Is that a last name?")
      .required("It's required!")
  }),
  validateOnBlur: false,
  validateOnChange: false,
  handleSubmit: async (values, { setSubmitting, setErrors }) => {
    const response = await axios.post("http://localhost:3000/", {
      name: values.name,
      lastname: values.lastname
    });

    if (response.data.length > 0) {
      setErrors(normalizeErrors(response.data));
      document.querySelector(`[name="${response.data[0].path}"]`).focus();
    }

    setSubmitting(false);
  }
})(App);
