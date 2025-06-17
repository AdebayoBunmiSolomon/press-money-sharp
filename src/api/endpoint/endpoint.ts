export const endpoint = {
  AUTH: {
    signUp: "/users", //create new user
    verifyEmail: "/verify-email", //verify user email
    login: "/auth/login", //login
    requestPassword: "/auth/request-password",
    verifyToken: "/auth/verify-token",
    updatePassword: "/auth/change-password",
  },
  APP: {
    getCategories: "/category", //get category
  },
};
