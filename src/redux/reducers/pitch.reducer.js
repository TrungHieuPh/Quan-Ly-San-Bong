import { createReducer } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  pitch: {
    data: [],
    loading: false,
    error: "",
  },
  pitchDetail: {
    loading: false,
    error: "",
  },
  createPitchData: {
    loading: false,
    error: "",
  },
  updatePitchData: {
    loading: false,
    error: "",
  },
  deletePitchData: {
    loading: false,
    error: "",
  },
};

const pitchReducers = createReducer(initialState, {
  GET_PITCH_LIST_REQUEST: (state, action) => {
    return {
      ...state,
      pitch: {
        ...state.pitch,
        loading: true,
        error: "",
      },
    };
  },
  GET_PITCH_LIST_SUCCESS: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      pitch: {
        ...state.pitch,
        data: data,
        loading: false,
      },
    };
  },
  GET_PITCH_LIST_FAIL: (state, action) => {
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
  /* Create */
  CREATE_PITCH_REQUEST: (state, action) => {
    return {
      ...state,
      createPitchData: {
        ...state.pitch,
        loading: true,
        error: "",
      },
    };
  },
  CREATE_PITCH_SUCCESS: (state, action) => {
    return {
      ...state,
      createPitchData: {
        ...state.createPitchData,
        loading: false,
      },
    };
  },
  CREATE_PITCH_FAIL: (state, action) => {
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

  UPDATE_PAGE: (state, action) => {
    const { id, values } = action.payload;
    const newProductList = [...state.pitch];
    const product = { ...values, id: id };

    const index = state.pitch.findIndex((item) => item.id === id);
    newProductList.splice(index, 1, product);
    return {
      ...state,
      pitch: newProductList,
    };
  },
  DELETE_PAGE: (state, action) => {
    const { id } = action.payload;
    const newProductList = state.pitch.filter((item) => item.id !== id);
    return {
      ...state,
      pitch: newProductList,
    };
  },
});
export default pitchReducers;
