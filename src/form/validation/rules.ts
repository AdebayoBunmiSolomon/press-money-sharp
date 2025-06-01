import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email address")
    .required("Email is required"),
  password: yup.string().required("password is required"),
});
