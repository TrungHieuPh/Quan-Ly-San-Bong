import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import moment from "moment";

import { BOOKING_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";
const accessToken = localStorage.getItem("accessToken");

function* bookingSaga(action) {
  try {
    const { ...orderData } = action.payload;
    console.log(orderData, "aaa");
    const result = yield axios.post("http://localhost:4000/orders", orderData);
    /*  for (let i = 0; i <= PitchOrder.length; i++) {
      console.log(i, "i");
      yield axios.post("http://localhost:4000/orderPitchs", {
        orderId: result.data.id,
        ...PitchOrder[i],
      });
    }
 */
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
function* getOrderListSaga(action) {
  try {
    const { userId } = action.payload;

    const result = yield axios.get(`http://localhost:4000/orders`, {
      params: {
        _embed: "combos",
        userId: userId,
      },
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
