import { takeEvery, put, debounce } from "redux-saga/effects";
import axios from "axios";

import { PITCH_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getPitchListSaga(action) {
  try {
    const { params, more, dateSelected } = action.payload;
    const result = yield axios.get(`http://localhost:4000/pitchs`, {
      params: {
        _expand: "team",
        _embed: ["times", "images", "favorites", "reviews"],
        _page: params.page,
        _limit: params.limit,
        ...(params.teamId && {
          teamId: params.teamId,
        }),
        ...(params.keyword && {
          q: params.keyword,
        }),
        ...(params.timeShootId && {
          timeShootId: params.timeShootId,
        }),
        ...(params.sortFilter && {
          _sort: "price",
          _order: params.sortFilter,
        }),
        dateSelected: params.dateSelected,
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
        dateSelected: dateSelected,
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
    const result = yield axios.get(`http://localhost:4000/pitchs/${id}`, {
      params: {
        _embed: ["times", "images", "favorites", "reviews"],
      },
    });
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
    const { values, images } = action.payload;
    const result = yield axios.post("http://localhost:4000/pitchs", values);
    for (let j = 0; j < images.length; j++) {
      yield axios.post("http://localhost:4000/images", {
        ...images[j],
        pitchId: result.data.id,
      });
    }
    yield put({
      type: SUCCESS(PITCH_ACTION.CREATE_PITCH),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PITCH_ACTION.CREATE_PITCH),
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
  yield debounce(500, REQUEST(PITCH_ACTION.GET_PITCH_LIST), getPitchListSaga);
  yield takeEvery(REQUEST(PITCH_ACTION.GET_PITCH_DETAIL), getPitchDetailSaga);
  yield takeEvery("CREATE_PITCH_REQUEST", createPitchSaga);
  yield takeEvery("UPDATE_PITCH_REQUEST", updatePitchSaga);
  yield takeEvery("DELETE_PITCH_REQUEST", deletePitchSaga);
}
