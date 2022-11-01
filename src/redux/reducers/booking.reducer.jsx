import { createReducer } from "@reduxjs/toolkit";
import { BOOKING_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  bookingList: {
    data: [],
    loading: false,
    error: null,
  },
  bookingInfo: {},
};

const bookingReducer = createReducer(initialState, {
  [REQUEST(BOOKING_ACTION.BOOKING_PITCH)]: (state, action) => {
    return {
      ...state,
      bookingList: {
        ...state.bookingList,
        loading: true,
      },
    };
  },
  [SUCCESS(BOOKING_ACTION.BOOKING_PITCH)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      bookingList: {
        ...state.bookingList,
        data: data,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(BOOKING_ACTION.BOOKING_PITCH)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      bookingList: {
        ...state.bookingList,
        loading: false,
        error,
      },
    };
  },

  [REQUEST(BOOKING_ACTION.SET_ORDER_INFO)]: (state, action) => {
    return {
      ...state,
      bookingInfo: action.payload,
    };
  },

  [REQUEST(BOOKING_ACTION.GET_ORDER_LIST)]: (state, action) => {
    return {
      ...state,
      bookingList: {
        ...state.bookingList,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(BOOKING_ACTION.GET_ORDER_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      bookingList: {
        ...state.bookingList,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(BOOKING_ACTION.GET_ORDER_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      bookingList: {
        ...state.bookingList,
        loading: false,
        error: error,
      },
    };
  },
});

export default bookingReducer;
