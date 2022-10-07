import { createReducer } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  pitch: [],
};

const pitchReducers = createReducer(initialState, {
  GET_PITCH_LIST_SUCCESS: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      pitch: data,
    };
  },
  CREATE_PITCH_SUCCESS: (state, action) => {
    const { data } = action.payload;

    return {
      ...state,
      pitch: [...state.pitch, data],
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
