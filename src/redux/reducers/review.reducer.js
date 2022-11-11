import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, REVIEW_ACTION } from "../constants";

const initialState = {
  reviewList: {
    data: [],
    loading: false,
    error: "",
  },
  postReviewData: {
    loading: false,
    error: "",
  },
  updateReviewData: {
    data: [],
    loading: false,
    error: "",
  },
  deleteReviewData: {
    loading: false,
    error: "",
  },
};

const reviewReducer = createReducer(initialState, {
  [REQUEST(REVIEW_ACTION.GET_REVIEW_LIST)]: (state, action) => {
    return {
      ...state,
      reviewList: {
        ...state.reviewList,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(REVIEW_ACTION.GET_REVIEW_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      reviewList: {
        ...state.reviewList,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(REVIEW_ACTION.GET_REVIEW_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      reviewList: {
        ...state.reviewList,
        loading: false,
        error: error,
      },
    };
  },

  [REQUEST(REVIEW_ACTION.POST_REVIEW)]: (state, action) => {
    return {
      ...state,
      postReviewData: {
        ...state.postReviewData,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(REVIEW_ACTION.POST_REVIEW)]: (state, action) => {
    return {
      ...state,
      postReviewData: {
        ...state.postReviewData,
        loading: false,
      },
    };
  },
  [FAIL(REVIEW_ACTION.POST_REVIEW)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      postReviewData: {
        ...state.postReviewData,
        loading: false,
        error: error,
      },
    };
  },

  [REQUEST(REVIEW_ACTION.UPDATE_REVIEW)]: (state, action) => {
    return {
      ...state,
      updateReviewData: {
        ...state.updateReviewData,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(REVIEW_ACTION.UPDATE_REVIEW)]: (state, action) => {
    return {
      ...state,
      updateReviewData: {
        ...state.updateReviewData,
        loading: false,
      },
    };
  },
  [FAIL(REVIEW_ACTION.UPDATE_REVIEW)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      updateReviewData: {
        ...state.updateReviewData,
        loading: false,
        error: error,
      },
    };
  },
  /*   [SUCCESS(REVIEW_ACTION.DELETE_REVIEW)]: (state, action) => {
    const { data } = action.payload;
    const newReviewList = [...state.reviewList.data];
    const itemIndex = newReviewList.findIndex((item) => item.id === data.id);
    newReviewList.splice(itemIndex, 1);
    return {
      ...state,
      reviewList: {
        ...state.reviewList,
        data: newReviewList,
        loading: false,
      },
    };
  }, */
  [REQUEST(REVIEW_ACTION.DELETE_REVIEW)]: (state, action) => {
    return {
      ...state,
      deleteReviewData: {
        ...state.deleteReviewData,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(REVIEW_ACTION.DELETE_REVIEW)]: (state, action) => {
    return {
      ...state,
      deleteReviewData: {
        ...state.deleteReviewData,
        loading: false,
      },
    };
  },
  [FAIL(REVIEW_ACTION.DELETE_REVIEW)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      deleteReviewData: {
        ...state.deleteReviewData,
        loading: false,
        error: error,
      },
    };
  },
});
export default reviewReducer;
