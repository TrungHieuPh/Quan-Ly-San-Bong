import { createReducer } from "@reduxjs/toolkit";

import { CHECKOUT_ACTION, REQUEST } from "../constants";

const initialState = {
  checkoutInfo: {},
  CheckoutPayment: {},
  CheckoutTimeSelect: {},
};

const CheckoutReducer = createReducer(initialState, {
  [REQUEST(CHECKOUT_ACTION.SET_CHECKOUT_TIME_SELECT)]: (state, action) => {
    return {
      ...state,
      CheckoutTimeSelect: action.payload,
    };
  },

  [REQUEST(CHECKOUT_ACTION.SET_CHECKOUT_INFO)]: (state, action) => {
    return {
      ...state,
      checkoutInfo: action.payload,
    };
  },
});

export default CheckoutReducer;
