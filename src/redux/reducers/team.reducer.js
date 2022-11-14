import { createReducer } from "@reduxjs/toolkit";
import { TEAM_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  teamList: {
    data: [],
    loading: false,
    error: "",
  },
};

const teamReducer = createReducer(initialState, {
  [REQUEST(TEAM_ACTION.GET_TEAM_LIST)]: (state, action) => {
    return {
      ...state,
      teamList: {
        ...state.teamList,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(TEAM_ACTION.GET_TEAM_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      teamList: {
        ...state.teamList,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(TEAM_ACTION.GET_TEAM_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      teamList: {
        ...state.teamList,
        loading: false,
        error: error,
      },
    };
  },
});

export default teamReducer;
