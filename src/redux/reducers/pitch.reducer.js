import { createReducer } from "@reduxjs/toolkit";
import {
  PITCH_ACTION,
  FAVORITE_ACTION,
  REQUEST,
  SUCCESS,
  FAIL,
} from "../constants";
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
    const { data, meta, more, dateSelected } = action.payload;
    return {
      ...state,
      pitch: {
        ...state.pitch,
        data: more ? [...state.pitch.data, ...data] : data,
        meta: meta,
        dateSelected: dateSelected,
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

  [REQUEST(PITCH_ACTION.UPDATE_PITCH)]: (state, action) => {
    return {
      ...state,
      updatePitchData: {
        ...state.updatePitchData,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(PITCH_ACTION.UPDATE_PITCH)]: (state, action) => {
    return {
      ...state,
      updatePitchData: {
        ...state.updatePitchData,
        loading: false,
      },
    };
  },
  [FAIL(PITCH_ACTION.UPDATE_PITCH)]: (state, action) => {
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

  [REQUEST(PITCH_ACTION.DELETE_PITCH)]: (state, action) => {
    return {
      ...state,
      deletePitchData: {
        ...state.deletePitchData,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(PITCH_ACTION.DELETE_PITCH)]: (state, action) => {
    return {
      ...state,
      deletePitchData: {
        ...state.deletePitchData,
        loading: false,
      },
    };
  },
  [FAIL(PITCH_ACTION.DELETE_PITCH)]: (state, action) => {
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

  [SUCCESS(FAVORITE_ACTION.FAVORITE_PITCH)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      pitchDetail: {
        ...state.pitchDetail,
        data: {
          ...state.pitchDetail.data,
          favorites: [...state.pitchDetail.data.favorites, data],
        },
      },
    };
  },
  [SUCCESS(FAVORITE_ACTION.UN_FAVORITE_PITCH)]: (state, action) => {
    const { id } = action.payload;
    const newFavorites = state.pitchDetail.data.favorites?.filter(
      (item) => item.id !== id
    );
    return {
      ...state,
      pitchDetail: {
        ...state.pitchDetail,
        data: {
          ...state.pitchDetail.data,
          favorites: newFavorites,
        },
      },
    };
  },
});
export default pitchReducers;
