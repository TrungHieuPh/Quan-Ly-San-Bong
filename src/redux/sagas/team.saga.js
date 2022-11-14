import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import { TEAM_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getTeamListSaga() {
  try {
    const result = yield axios.get("http://localhost:4000/teams");
    yield put({
      type: SUCCESS(TEAM_ACTION.GET_TEAM_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(TEAM_ACTION.GET_TEAM_LIST),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

export default function* teamSaga() {
  yield takeEvery(REQUEST(TEAM_ACTION.GET_TEAM_LIST), getTeamListSaga);
}
