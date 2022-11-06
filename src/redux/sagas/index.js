import { fork } from "redux-saga/effects";

import pitchSaga from "./pitch.saga";
import userSaga from "./user.saga";
import timeShootSaga from "./timeshoot.saga";
import bookingPitchSaga from "./booking.saga";
import favoriteSaga from "./favorite.sagas";
import reviewSaga from "./review.saga";

export default function* rootSaga() {
  yield fork(pitchSaga);
  yield fork(userSaga);
  yield fork(timeShootSaga);
  yield fork(bookingPitchSaga);
  yield fork(favoriteSaga);
  yield fork(reviewSaga);
}
