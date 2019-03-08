import React from "react";
import { Field, ErrorMessage, connect } from "formik";

const ErrorFocus = ({
  name,
  formik: { isSubmitting, isValidating, errors }
}) => {
  const keys = Object.keys(errors);
  if (keys.length > 0 && isSubmitting && !isValidating) {
    document.querySelector(`[name="${keys[0]}"]`).focus();
  }

  return <ErrorMessage name={name} />;
};

const ConnectErrorFocus = connect(ErrorFocus);

const field = ({ name, placeholder }) => (
  <div className="field">
    <div className="control">
      <Field
        name={name}
        placeholder={placeholder}
        className="input is-hovered"
        required
      />
    </div>
    <ConnectErrorFocus name={name} />
  </div>
);

export default field;
