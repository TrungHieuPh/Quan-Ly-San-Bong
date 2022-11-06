import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import moment from "moment";

import { BOOKING_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* bookingSaga(action) {
  try {
    const { timeSelect, pitchsId, price, timeId, userId } = action.payload;
    const result = yield axios.post("http://localhost:4000/orders", {
      pitchsId: parseInt(pitchsId),
      timeSelect: timeSelect,
      timeId: timeId,
      userId: userId,
      price: price,
    });

    /*     yield put({ type: REQUEST(BOOKING_ACTION.BOOKING_PITCH) });
     */ yield put({
      type: SUCCESS(BOOKING_ACTION.BOOKING_PITCH),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(BOOKING_ACTION.BOOKING_PITCH),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}
function* getOrderListSaga() {
  try {
    const result = yield axios.get("http://localhost:4000/orders", {
      params: { _expand: ["pitchs", "time"] },
    });
    yield put({
      type: SUCCESS(BOOKING_ACTION.GET_ORDER_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(BOOKING_ACTION.GET_ORDER_LIST),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}
export default function* bookingPitchSaga() {
  yield takeEvery(REQUEST(BOOKING_ACTION.BOOKING_PITCH), bookingSaga);
  yield takeEvery(REQUEST(BOOKING_ACTION.GET_ORDER_LIST), getOrderListSaga);
}
