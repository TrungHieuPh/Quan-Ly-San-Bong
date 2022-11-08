import { createAction } from "@reduxjs/toolkit";
import { CHECKOUT_ACTION, REQUEST } from "../constants";

export const setCheckoutInfoAction = createAction(
  REQUEST(CHECKOUT_ACTION.SET_CHECKOUT_INFO)
);
export const setCheckoutPaymentAction = createAction(
  REQUEST(CHECKOUT_ACTION.SET_CHECKOUT_PAYMENT)
);
export const setCheckoutTimeSelectAction = createAction(
  REQUEST(CHECKOUT_ACTION.SET_CHECKOUT_TIME_SELECT)
);
