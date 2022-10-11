export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  USER: {
    HOME: "/trangchu",
    PITCH_LIST: "/datsan",
    PITCH_DETAIL: "/datsan/:id/setpitch",
  },
  ADMIN: {
    DASHBOARD: "/admin",
    PITCH_LIST: "/admin/pitch",
    CREATE_PITCH: "/admin/pitch/create",
    UPDATE_PITCH: "/admin/pitch/:id/update",
    PRODUCT_DETAIL: "/admin/pitch/:id",
    USER_LIST: "/admin/users",
    ORDER_LIST: "/admin/orders",
  },
  NOT_FOUND: "/404",
};
