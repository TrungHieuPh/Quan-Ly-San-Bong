import { createAction } from "@reduxjs/toolkit";

import { REQUEST, REVIEW_ACTION } from "../constants";

export const postReviewAction = createAction(
  REQUEST(REVIEW_ACTION.POST_REVIEW)
);
export const getReviewListAction = createAction(
  REQUEST(REVIEW_ACTION.GET_REVIEW_LIST)
);
export const updateReviewAction = createAction(
  REQUEST(REVIEW_ACTION.UPDATE_REVIEW)
);
export const deleteReviewAction = createAction(
  REQUEST(REVIEW_ACTION.DELETE_REVIEW)
);
export const postReviewBlogAction = createAction(
  REQUEST(REVIEW_ACTION.POST_REVIEW_BLOG)
);
export const getReviewListBlogAction = createAction(
  REQUEST(REVIEW_ACTION.GET_REVIEW_LIST_BLOG)
);
export const updateReviewBlogAction = createAction(
  REQUEST(REVIEW_ACTION.UPDATE_REVIEW_BLOG)
);
export const deleteReviewBlogAction = createAction(
  REQUEST(REVIEW_ACTION.DELETE_REVIEW_BLOG)
);
