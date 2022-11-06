import { createReducer } from "@reduxjs/toolkit";
import { ARBITRATION_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  arbitrationList: {
    data: [],
    loading: false,
    error: "",
  },
};

const arbitrationReducer = createReducer(initialState, {
  [REQUEST(ARBITRATION_ACTION.GET_ORDER_LIST)]: (state, action) => {
    return {
      ...state,
      arbitrationList: {
        ...state.arbitrationList,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(ARBITRATION_ACTION.GET_ORDER_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      arbitrationList: {
        ...state.arbitrationList,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(ARBITRATION_ACTION.GET_ORDER_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      arbitrationList: {
        ...state.arbitrationList,
        loading: false,
        error: error,
      },
    };
  },
});

export default arbitrationReducer;
