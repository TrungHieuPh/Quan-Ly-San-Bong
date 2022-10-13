import { fork } from "redux-saga/effects";

import pitchSaga from "./pitch.saga";
import userSaga from "./user.saga";

export default function* rootSaga() {
  yield fork(pitchSaga);
  yield fork(userSaga);
}
