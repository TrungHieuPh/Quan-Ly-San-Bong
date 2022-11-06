import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import { COMBO_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getComboList() {
  try {
    const result = yield axios.get("http://localhost:4000/combos");
    yield put({
      type: SUCCESS(COMBO_ACTION.GET_COMBO),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(COMBO_ACTION.GET_COMBO),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

export default function* comboSaga() {
  yield takeEvery(REQUEST(COMBO_ACTION.GET_COMBO), getComboList);
}
