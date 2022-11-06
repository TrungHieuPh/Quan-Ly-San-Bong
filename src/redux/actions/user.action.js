import { createAction } from "@reduxjs/toolkit";
import { USER_ACTION, REQUEST } from "../constants";

export const loginAction = createAction(REQUEST(USER_ACTION.LOGIN));
export const logoutAction = createAction(REQUEST(USER_ACTION.LOGOUT));
export const registerAction = createAction(REQUEST(USER_ACTION.REGISTER));
export const getUserInfoAction = createAction(
  REQUEST(USER_ACTION.GET_USER_INFO)
);
export const changePasswordAction = createAction(
  REQUEST(USER_ACTION.CHANGE_PASSWORD)
);
