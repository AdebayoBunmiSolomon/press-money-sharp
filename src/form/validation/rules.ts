import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email address")
    .required("Email is required"),
  password: yup.string().required("password is required"),
});

export const signUpValidationSchema = yup.object().shape({
  first_name: yup.string().required("first name is required"),
  last_name: yup.string().required("last name is required"),
  gender: yup.string().required("gender is required"),
  email: yup
    .string()
    .email("invalid email address")
    .required("email is required"),
  password: yup.string().required("password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your password"),
  phone: yup.string().required("phone number is required"),
});

export const passwordResetValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email address")
    .required("email is required"),
});

export const passwordUpdateValidationSchema = yup.object().shape({
  password: yup.string().required("password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});

export const messageActionFormValidationSchema = yup.object().shape({
  // name: yup.string().required("name is required"),
  // phone: yup.string().required("phone number is required"),
  // email: yup
  //   .string()
  //   .email("invalid email address")
  //   .required("email is required"),
  message: yup.string().required("message is required"),
});

export const consultationFormValidationSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  phone: yup.string().required("phone number is required"),
  email: yup
    .string()
    .email("invalid email address")
    .required("email is required"),
  message: yup.string().required("message is required"),
  priority: yup.string().required("priority is required"),
  type: yup.string().required("consultation type is required"),
});
