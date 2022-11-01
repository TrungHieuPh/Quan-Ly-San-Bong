import { takeEvery, put, debounce } from "redux-saga/effects";
import axios from "axios";

import { TIME_SHOOT_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getTimeShootListSaga() {
  try {
    const result = yield axios.get("http://localhost:4000/times");
    yield put({
      type: SUCCESS(TIME_SHOOT_ACTION.GET__TIME_SHOOT_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(TIME_SHOOT_ACTION.GET__TIME_SHOOT_LIST),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

export default function* timeShootSaga() {
  yield takeEvery(
    REQUEST(TIME_SHOOT_ACTION.GET__TIME_SHOOT_LIST),
    getTimeShootListSaga
  );
}
