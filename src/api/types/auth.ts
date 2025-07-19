export type apiLoginFormTypes = {
  email: string;
  password: string;
};

export type apiSignUpFormTypes = {
  first_name: string;
  last_name: string;
  email: string;
  referral_code: string;
  gender: string;
  password: string;
  phone: string;
};

export type apiVerifyEmailFormTypes = {
  email: string;
  otp: string;
};

export type apiForgotPassAndContinueTypes = {
  email: string;
};

export type apiVerifyOtpToChangePassTypes = {
  email: string;
  hash: string;
};

export type apiUpdatePasswordTypes = {
  email: string;
  hash: string;
  password: string;
  password_confirmation: string;
};

export type apiScheduleConsultation = {
  name: string;
  phone: string;
  email: string;
  description: string;
  priority: string;
  type: string;
};
