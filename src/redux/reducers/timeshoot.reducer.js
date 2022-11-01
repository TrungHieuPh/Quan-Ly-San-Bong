import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, FAIL, TIME_SHOOT_ACTION } from "../constants";

const initialState = {
  timeShootList: {
    data: [],
    loading: false,
    error: "",
  },
};

const timeShootReducer = createReducer(initialState, {
  [REQUEST(TIME_SHOOT_ACTION.GET__TIME_SHOOT_LIST)]: (state, action) => {
    return {
      ...state,
      timeShootList: {
        ...state.timeShootList,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(TIME_SHOOT_ACTION.GET__TIME_SHOOT_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      timeShootList: {
        ...state.timeShootList,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(TIME_SHOOT_ACTION.GET__TIME_SHOOT_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      timeShootList: {
        ...state.timeShootList,
        loading: false,
        error: error,
      },
    };
  },
});

export default timeShootReducer;
