One way I could resolve the problem to catch the first error and show it on its input, instead of using react-register-nodes' solution was this one (In my case):

```
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
```

The preview code shows the error and focus on that element, inspired by [this](https://github.com/jaredpalmer/formik/issues/146#issuecomment-435226018) solution, so I only call this component in any other component, like this:

```
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
```

But, there's one problem, when the API sends me an error and I want to show it on any input, for example if I typed a wrong password, I want to focus on the password input. The solution I could do was (In my case) adding the `document.querySelector(`[name="${keys[0]}"]`).focus();` function, something like this:

```
const response = await axios.post("http://localhost:8080/", {
  password: values.password
});

if (response.data.length > 0) {
  setErrors(normalizeErrors(response.data));
  document.querySelector(`[name="${response.data[0].path}"]`).focus();
}

setSubmitting(false);
```

The server sends this:

```
[
  {
    path: "password",
    message: "Wrong password."
  }
]
```

And the `normalizeErrors` function transform that array to `{ password: ['error 1', 'error 2'] }`.
