import { createReducer } from "@reduxjs/toolkit";
import { PITCH_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";
const initialState = {
  pitch: {
    data: [],
    meta: {},
    loading: false,
    error: "",
  },
  pitchDetail: {
    data: {},
    loading: false,
    error: "",
  },
  createPitchData: {
    loading: false,
    error: "",
  },
  updatePitchData: {
    data: [],
    loading: false,
    error: "",
  },
  deletePitchData: {
    loading: false,
    error: "",
  },
};

const pitchReducers = createReducer(initialState, {
  [REQUEST(PITCH_ACTION.GET_PITCH_LIST)]: (state, action) => {
    return {
      ...state,
      pitch: {
        ...state.pitch,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(PITCH_ACTION.GET_PITCH_LIST)]: (state, action) => {
    const { data, meta, more } = action.payload;
    return {
      ...state,
      pitch: {
        ...state.pitch,
        data: more ? [...state.pitch.data, ...data] : data,
        meta: meta,
        loading: false,
      },
    };
  },
  [FAIL(PITCH_ACTION.GET_PITCH_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      pitch: {
        ...state.pitch,
        loading: false,
        error: error,
      },
    };
  },
  /* Detail */
  [REQUEST(PITCH_ACTION.GET_PITCH_DETAIL)]: (state, action) => {
    return {
      ...state,
      pitchDetail: {
        ...state.pitchDetail,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(PITCH_ACTION.GET_PITCH_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      pitchDetail: {
        ...state.pitchDetail,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(PITCH_ACTION.GET_PITCH_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      pitchDetail: {
        ...state.pitchDetail,
        loading: false,
        error: error,
      },
    };
  },
  /* Create */
  [REQUEST(PITCH_ACTION.CREATE_PITCH)]: (state, action) => {
    return {
      ...state,
      createPitchData: {
        ...state.createPitchData,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(PITCH_ACTION.CREATE_PITCH)]: (state, action) => {
    return {
      ...state,
      createPitchData: {
        ...state.createPitchData,
        loading: false,
      },
    };
  },
  [FAIL(PITCH_ACTION.CREATE_PITCH)]: (state, action) => {
    const { error } = action.payload;

    return {
      ...state,
      createPitchData: {
        ...state.createPitchData,
        loading: false,
        error: error,
      },
    };
  },

  UPDATE_PRODUCT_REQUEST: (state, action) => {
    return {
      ...state,
      updatePitchData: {
        ...state.updatePitchData,
        loading: true,
        error: "",
      },
    };
  },
  UPDATE_PITCH_SUCCESS: (state, action) => {
    return {
      ...state,
      updatePitchData: {
        ...state.updatePitchData,
        loading: false,
      },
    };
  },
  UPDATE_PRODUCT_FAIL: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      updatePitchData: {
        ...state.updatePitchData,
        loading: false,
        error: error,
      },
    };
  },

  DELETE_PRODUCT_REQUEST: (state, action) => {
    return {
      ...state,
      deletePitchData: {
        ...state.deletePitchData,
        loading: true,
        error: "",
      },
    };
  },
  DELETE_PRODUCT_SUCCESS: (state, action) => {
    return {
      ...state,
      deletePitchData: {
        ...state.deletePitchData,
        loading: false,
      },
    };
  },
  DELETE_PRODUCT_FAIL: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      deletePitchData: {
        ...state.deletePitchData,
        loading: false,
        error: error,
      },
    };
  },
});
export default pitchReducers;
