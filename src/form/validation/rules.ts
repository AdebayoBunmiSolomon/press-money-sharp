import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email address")
    .required("Email is required"),
  password: yup.string().required("password is required"),
});

export const signUpValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email address")
    .required("email is required"),
  password: yup.string().required("password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});

export const passwordResetValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email address")
    .required("email is required"),
});
