export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  USER: {
    HOME: "/home",
    PITCH_LIST: "/pitch",
    PITCH_DETAIL: "/pitch/:id/setpitch",
    PITCH_ABOUT: "/about",
    PITCH_HISTORY: "/history",
    SET_PITCH: "/pitch/:id/setpitch",
    CREATE_PITCH: "/pitch/createpitch",
    PRODUCT_LIST_PAGE: "/productlistPage",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    PITCH_LIST: "/admin/pitch",
    CREATE_PITCH: "/admin/pitch/create",
    UPDATE_PITCH: "/admin/pitch/:id/update",
    PRODUCT_DETAIL: "/admin/pitch/:id",
    USER_LIST: "/admin/users",
    ORDER_LIST: "/admin/orders",
  },
  NOT_FOUND: "/404",
};
