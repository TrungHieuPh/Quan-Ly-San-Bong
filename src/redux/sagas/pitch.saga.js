import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import { PITCH_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getPitchListSaga(action) {
  try {
    const { params, more, sortFilter } = action.payload;
    const result = yield axios.get("http://localhost:4000/pitchs", {
      params: {
        _page: params.page,
        _limit: params.limit,
        ...(params.keyword && {
          q: params.keyword,
        }),
        ...(params.sortFilter && {
          _sort: "price",
          _order: sortFilter,
        }),
      },
    });
    yield put({
      type: SUCCESS(PITCH_ACTION.GET_PITCH_LIST),
      payload: {
        data: result.data,
        meta: {
          total: parseInt(result.headers["x-total-count"]),
          page: params.page,
          limit: params.limit,
        },
        more: more,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PITCH_ACTION.GET_PITCH_LIST),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* getPitchDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/pitchs/${id}`);
    yield put({
      type: SUCCESS(PITCH_ACTION.GET_PITCH_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PITCH_ACTION.GET_PITCH_DETAIL),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* createPitchSaga(action) {
  try {
    const { values } = action.payload;
    const result = yield axios.post("http://localhost:4000/pitchs", values);
    yield put({ type: "GET_PITCH_LIST_REQUEST" });
    yield put({
      type: "CREATE_PITCH_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "CREATE_PITCH_FAIL",
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* updatePitchSaga(action) {
  try {
    const { values, id } = action.payload;
    const result = yield axios.patch(
      `http://localhost:4000/pitchs/${id}`,
      values
    );
    yield put({
      type: "UPDATE_PITCH_SUCCESS",
      payload: {
        data: result.data,
      },
    });
    yield put({ type: "GET_PITCH_LIST_REQUEST" });
  } catch (e) {
    yield put({
      type: "UPDATE_PRODUCT_FAIL",
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* deletePitchSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`http://localhost:4000/pitchs/${id}`);
    yield put({ type: "DELETE_PRODUCT_SUCCESS" });
    yield put({ type: "GET_PRODUCT_LIST_REQUEST" });
  } catch (e) {
    yield put({
      type: "DELETE_PRODUCT_FAIL",
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

export default function* pitchSaga() {
  yield takeEvery(REQUEST(PITCH_ACTION.GET_PITCH_LIST), getPitchListSaga);
  yield takeEvery(REQUEST(PITCH_ACTION.GET_PITCH_DETAIL), getPitchDetailSaga);
  yield takeEvery("CREATE_PITCH_REQUEST", createPitchSaga);
  yield takeEvery("UPDATE_PITCH_REQUEST", updatePitchSaga);
  yield takeEvery("DELETE_PITCH_REQUEST", deletePitchSaga);
}
