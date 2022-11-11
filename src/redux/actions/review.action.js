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
