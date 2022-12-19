import { createReducer } from "@reduxjs/toolkit";
import {
  BLOG_ACTION,
  FAVORITE_ACTION,
  REVIEW_ACTION,
  REQUEST,
  SUCCESS,
  FAIL,
} from "../constants";
const initialState = {
  blogList: {
    data: [],
    meta: {},
    loading: false,
    error: "",
  },
  blogDetail: {
    data: {},
    loading: false,
    error: "",
  },
  createBlogData: {
    loading: false,
    error: "",
  },
  updateBlogData: {
    data: [],
    loading: false,
    error: "",
  },
  deleteBlogData: {
    loading: false,
    error: "",
  },
  browserBlogData: {
    loading: false,
    error: "",
  },
};

const blogReducer = createReducer(initialState, {
  [REQUEST(BLOG_ACTION.GET_BLOG_LIST)]: (state, action) => {
    return {
      ...state,
      blogList: {
        ...state.blogList,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(BLOG_ACTION.GET_BLOG_LIST)]: (state, action) => {
    const { data, meta } = action.payload;
    return {
      ...state,
      blogList: {
        ...state.blogList,
        data: data,
        meta: meta,
        loading: false,
      },
    };
  },
  [FAIL(BLOG_ACTION.GET_BLOG_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      blogList: {
        ...state.blogList,
        loading: false,
        error: error,
      },
    };
  },
  /* Detail */
  [REQUEST(BLOG_ACTION.GET_BLOG_DETAIL)]: (state, action) => {
    return {
      ...state,
      blogDetail: {
        ...state.blogDetail,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(BLOG_ACTION.GET_BLOG_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      blogDetail: {
        ...state.blogDetail,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(BLOG_ACTION.GET_BLOG_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      blogDetail: {
        ...state.blogDetail,
        loading: false,
        error: error,
      },
    };
  },
  /* Create */
  [REQUEST(BLOG_ACTION.CREATE_BLOG)]: (state, action) => {
    return {
      ...state,
      createBlogData: {
        ...state.createBlogData,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(BLOG_ACTION.CREATE_BLOG)]: (state, action) => {
    return {
      ...state,
      createBlogData: {
        ...state.createBlogData,
        loading: false,
      },
    };
  },
  [FAIL(BLOG_ACTION.CREATE_BLOG)]: (state, action) => {
    const { error } = action.payload;

    return {
      ...state,
      createBlogData: {
        ...state.createBlogData,
        loading: false,
        error: error,
      },
    };
  },

  [REQUEST(BLOG_ACTION.UPDATE_BLOG)]: (state, action) => {
    return {
      ...state,
      updateBlogData: {
        ...state.updateBlogData,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(BLOG_ACTION.UPDATE_BLOG)]: (state, action) => {
    return {
      ...state,
      updateBlogData: {
        ...state.updateBlogData,
        loading: false,
      },
    };
  },
  [FAIL(BLOG_ACTION.UPDATE_BLOG)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      updateBlogData: {
        ...state.updateBlogData,
        loading: false,
        error: error,
      },
    };
  },

  [REQUEST(BLOG_ACTION.DELETE_BLOG)]: (state, action) => {
    return {
      ...state,
      deleteBlogData: {
        ...state.deleteBlogData,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(BLOG_ACTION.DELETE_BLOG)]: (state, action) => {
    return {
      ...state,
      deleteBlogData: {
        ...state.deleteBlogData,
        loading: false,
      },
    };
  },
  [FAIL(BLOG_ACTION.DELETE_BLOG)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      deleteBlogData: {
        ...state.deleteBlogData,
        loading: false,
        error: error,
      },
    };
  },
  [REQUEST(BLOG_ACTION.BROWSER_BLOG)]: (state, action) => {
    return {
      ...state,
      browserBlogData: {
        ...state.browserBlogData,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(BLOG_ACTION.BROWSER_BLOG)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      browserBlogData: {
        ...state.browserBlogData,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(BLOG_ACTION.BROWSER_BLOG)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      browserBlogData: {
        ...state.browserBlogData,
        loading: false,
        error: error,
      },
    };
  },
  [SUCCESS(FAVORITE_ACTION.FAVORITE_BLOG)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      blogDetail: {
        ...state.blogDetail,
        data: {
          ...state.blogDetail.data,
          favoriteBlogs: [...state.blogDetail.data.favoriteBlogs, data],
        },
      },
    };
  },
  [SUCCESS(FAVORITE_ACTION.UN_FAVORITE_BLOG)]: (state, action) => {
    const { id } = action.payload;
    const newFavoriteBlogs = state.blogDetail.data.favoriteBlogs?.filter(
      (item) => item.id !== id
    );
    return {
      ...state,
      blogDetail: {
        ...state.blogDetail,
        data: {
          ...state.blogDetail.data,
          favoriteBlogs: newFavoriteBlogs,
        },
      },
    };
  },
  [SUCCESS(REVIEW_ACTION.POST_REVIEW_BLOG)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      blogDetail: {
        ...state.blogDetail,
        data: {
          ...state.blogDetail.data,
          reviewBlogs: [...state.blogDetail.data.reviewBlogs, data],
        },
      },
    };
  },
  [SUCCESS(REVIEW_ACTION.DELETE_REVIEW_BLOG)]: (state, action) => {
    const { id } = action.payload;
    const newReviewBlogs = state.blogDetail.data.reviewBlogs?.filter(
      (item) => item.id !== id
    );
    return {
      ...state,
      blogDetail: {
        ...state.blogDetail,
        data: {
          ...state.blogDetail.data,
          reviewBlogs: newReviewBlogs,
        },
      },
    };
  },
});
export default blogReducer;
