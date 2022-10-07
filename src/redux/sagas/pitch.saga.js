import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

function* getPitchListSaga() {
  const result = yield axios.get("http://localhost:4000/pitchs");
  yield put({
    type: "GET_PITCH_LIST_SUCCESS",
    payload: {
      data: result.data,
    },
  });
  try {
  } catch (e) {
    yield put({
      type: "GET_PITCH_LIST_FAIL",
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
    yield axios.delete(`http://localhost:4000/pitch/${id}`);
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
  yield takeEvery("GET_PITCH_LIST_REQUEST", getPitchListSaga);
  yield takeEvery("CREATE_PITCH_REQUEST", createPitchSaga);
  yield takeEvery("UPDATE_PITCH_REQUEST", updatePitchSaga);
  yield takeEvery("DELETE_PITCH_REQUEST", deletePitchSaga);
}
