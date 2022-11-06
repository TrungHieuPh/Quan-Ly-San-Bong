import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import { ARBITRATION_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getCategoryListSaga() {
  try {
    const result = yield axios.get("http://localhost:4000/arbitrations");
    yield put({
      type: SUCCESS(ARBITRATION_ACTION.GET_ARBITRATION),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(ARBITRATION_ACTION.GET_ARBITRATION),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

export default function* arbitrationSaga() {
  yield takeEvery(
    REQUEST(ARBITRATION_ACTION.GET_ARBITRATION),
    getCategoryListSaga
  );
}
