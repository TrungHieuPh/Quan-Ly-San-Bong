import { createReducer } from "@reduxjs/toolkit";
import { COMBO_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  comboList: {
    data: [],
    loading: false,
    error: "",
  },
};

const comboReducer = createReducer(initialState, {
  [REQUEST(COMBO_ACTION.GET_COMBO)]: (state, action) => {
    return {
      ...state,
      comboList: {
        ...state.comboList,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(COMBO_ACTION.GET_COMBO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      comboList: {
        ...state.comboList,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(COMBO_ACTION.GET_COMBO)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      comboList: {
        ...state.comboList,
        loading: false,
        error: error,
      },
    };
  },
});

export default comboReducer;
