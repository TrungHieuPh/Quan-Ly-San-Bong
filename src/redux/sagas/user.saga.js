import { notification } from "antd";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import { USER_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/login", data);
    yield localStorage.setItem("accessToken", result.data.accessToken);
    yield put({
      type: SUCCESS(USER_ACTION.LOGIN),
      payload: {
        data: result.data.user,
      },
    });
    if (result.data?.user?.role === "admin") {
      yield callback.goToDashboard();
    } else {
      yield callback.goToHome();
    }
  } catch (e) {
    yield put({
      type: FAIL(USER_ACTION.LOGIN),
      payload: {
        error: "Login fail!",
      },
    });
  }
}

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/register", data);
    console.log(data, "sss");
    yield put({
      type: SUCCESS(USER_ACTION.REGISTER),
      payload: {
        data: result.data,
      },
    });
    yield callback.goToLogin();
  } catch (e) {
    console.log(e);
    yield put({
      type: FAIL(USER_ACTION.REGISTER),
      payload: {
        error:
          e.response.data === "Email already exists"
            ? "Email đã tồn tại."
            : e.response.data,
      },
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/users/${id}`);
    yield put({
      type: SUCCESS(USER_ACTION.GET_USER_INFO),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(USER_ACTION.GET_USER_INFO),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}
function* changePasswordSaga(action) {
  try {
    const { id, data, callback } = action.payload;
    yield axios.post("http://localhost:4000/login", {
      email: data.email,
      password: data.oldPassword,
    });
    yield axios.patch(`http://localhost:4000/users/${id}`, {
      password: data.newPassword,
    });
    yield callback.clearForm();
    yield put({
      type: SUCCESS(USER_ACTION.CHANGE_PASSWORD),
    });
  } catch (e) {
    yield put({
      type: FAIL(USER_ACTION.CHANGE_PASSWORD),
      payload: {
        error: "Lấy không được",
      },
    });
  }
}

export default function* userSaga() {
  yield takeEvery(REQUEST(USER_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(USER_ACTION.REGISTER), registerSaga);
  yield takeEvery(REQUEST(USER_ACTION.GET_USER_INFO), getUserInfoSaga);
  yield takeEvery(REQUEST(USER_ACTION.CHANGE_PASSWORD), changePasswordSaga);
}
