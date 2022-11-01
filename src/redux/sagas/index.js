import { fork } from "redux-saga/effects";

import pitchSaga from "./pitch.saga";
import userSaga from "./user.saga";
import timeShootSaga from "./timeshoot.saga";
import bookingPitchSaga from "./booking.saga";
export default function* rootSaga() {
  yield fork(pitchSaga);
  yield fork(userSaga);
  yield fork(timeShootSaga);
  yield fork(bookingPitchSaga);
}
