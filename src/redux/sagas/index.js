import { fork } from "redux-saga/effects";

import pitchSaga from "./pitch.saga";
import userSaga from "./user.saga";
import timeShootSaga from "./timeshoot.saga";
import bookingPitchSaga from "./booking.saga";
import favoriteSaga from "./favorite.sagas";
import reviewSaga from "./review.saga";
import locationSaga from "./location.saga";
import arbitrationSaga from "./arbitration.saga";
import comboSaga from "./combo.saga";
import teamSaga from "./team.saga";
import blogSaga from "./blog.saga";

export default function* rootSaga() {
  yield fork(pitchSaga);
  yield fork(userSaga);
  yield fork(timeShootSaga);
  yield fork(bookingPitchSaga);
  yield fork(favoriteSaga);
  yield fork(reviewSaga);
  yield fork(locationSaga);
  yield fork(arbitrationSaga);
  yield fork(comboSaga);
  yield fork(teamSaga);
  yield fork(blogSaga);
}
