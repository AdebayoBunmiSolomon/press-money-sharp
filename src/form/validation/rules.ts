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
  phone: yup.string().notRequired(),
  referral_code: yup.string().notRequired(), // ✅ now optional
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

export const updateProfileValidationSchema = yup.object().shape({
  first_name: yup.string().required("first name is required"),
  last_name: yup.string().required("last name is required"),
  address: yup.string().required("address required"),
  phone: yup.string().required("phone is required"),
  dob: yup
    .string()
    .nullable() // allows null
    .notRequired() // makes it optional
    .test("is-18", "You must be at least 18 years old", function (value) {
      if (!value) return true; // ✅ skip validation if empty

      // Parse DOB as UTC to avoid timezone shift
      const dob = new Date(value.split("T")[0]); // YYYY-MM-DD
      const today = new Date();

      let age = today.getFullYear() - dob.getFullYear();

      const hasHadBirthdayThisYear =
        today.getMonth() > dob.getMonth() ||
        (today.getMonth() === dob.getMonth() &&
          today.getDate() >= dob.getDate());

      if (!hasHadBirthdayThisYear) {
        age -= 1;
      }

      return age >= 18;
    }),
  gender: yup.string().required("gender not selected"),
});
