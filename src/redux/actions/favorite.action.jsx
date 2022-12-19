import { createAction } from "@reduxjs/toolkit";

import { REQUEST, FAVORITE_ACTION } from "../constants";

export const favoritePitchAction = createAction(
  REQUEST(FAVORITE_ACTION.FAVORITE_PITCH)
);
export const unFavoritePitchAction = createAction(
  REQUEST(FAVORITE_ACTION.UN_FAVORITE_PITCH)
);
export const favoriteBlogAction = createAction(
  REQUEST(FAVORITE_ACTION.FAVORITE_BLOG)
);
export const unFavoriteBlogAction = createAction(
  REQUEST(FAVORITE_ACTION.UN_FAVORITE_BLOG)
);
export const getFavoriteList = createAction(
  REQUEST(FAVORITE_ACTION.GET_FAVORITE_LIST)
);
export const getFavoriteBlogList = createAction(
  REQUEST(FAVORITE_ACTION.GET_FAVORITE_BLOG_LIST)
);
