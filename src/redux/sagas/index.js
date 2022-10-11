import { fork } from "redux-saga/effects";

import pitchSaga from "../sagas/pitch.saga";
/* import categorySaga from "./category.saga"; */
import userSaga from "./user.saga";

export default function* rootSaga() {
  yield fork(pitchSaga);
  /*   yield fork(categorySaga); */
  yield fork(userSaga);
}
