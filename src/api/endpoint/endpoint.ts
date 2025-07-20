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
    scheduleConsultation: "/consultations",
    getAllService: "/services?page=1&per_page=10&sort=desc", //&search=&type=&range%5Bfrom%5D=&range%5Bto%5D=
    viewService: "/services", //pass the service_uuid as query parameter
    sendMessage: "/admin/chats/",
  },
};
