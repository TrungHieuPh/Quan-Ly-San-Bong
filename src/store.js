import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import pitchReducers from "./redux/reducers/pitch.reducer";
import userReducer from "./redux/reducers/user.reducer";

import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    product: pitchReducers,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export { store };
