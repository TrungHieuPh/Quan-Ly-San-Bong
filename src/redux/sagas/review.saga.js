import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import { REVIEW_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";
import { REVIEW_LIST_LIMIT } from "../../constants/paginations";

function* getReviewListSaga(action) {
  try {
    const { pitchId } = action.payload;
    const result = yield axios.get("http://localhost:4000/reviews", {
      params: {
        pitchId: pitchId,
        _expand: ["user"],
        _sort: "id",
        _order: "desc",
      },
    });
    yield put({
      type: SUCCESS(REVIEW_ACTION.GET_REVIEW_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(REVIEW_ACTION.GET_REVIEW_LIST),
      payload: {
        error: "Fail!",
      },
    });
  }
}

function* postReviewSaga(action) {
  try {
    const { pitchId } = action.payload;
    const result = yield axios.post(
      "http://localhost:4000/reviews",
      action.payload
    );
    yield put({
      type: SUCCESS(REVIEW_ACTION.POST_REVIEW),
      payload: {
        data: result.data,
      },
    });
    yield put({
      type: REQUEST(REVIEW_ACTION.GET_REVIEW_LIST),
      payload: {
        pitchId: pitchId,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(REVIEW_ACTION.POST_REVIEW),
      payload: {
        error: e.response.data,
      },
    });
  }
}

function* DeleteReviewSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`http://localhost:4000/reviews/${id}`);
    yield put({ type: SUCCESS(REVIEW_ACTION.DELETE_REVIEW) });
    yield put({
      type: REQUEST(REVIEW_ACTION.GET_REVIEW_LIST),
      payload: {
        page: 1,
        limit: REVIEW_LIST_LIMIT,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(REVIEW_ACTION.DELETE_REVIEW),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

export default function* reviewSaga() {
  yield takeEvery(REQUEST(REVIEW_ACTION.GET_REVIEW_LIST), getReviewListSaga);
  yield takeEvery(REQUEST(REVIEW_ACTION.POST_REVIEW), postReviewSaga);
  yield takeEvery(REQUEST(REVIEW_ACTION.DELETE_REVIEW), DeleteReviewSaga);
}
