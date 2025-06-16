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
