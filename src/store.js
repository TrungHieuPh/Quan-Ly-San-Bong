import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import pitchReducers from "./redux/reducers/pitch.reducer";
import userReducer from "./redux/reducers/user.reducer";
import timeShootReducer from "./redux/reducers/timeshoot.reducer";
import bookingReducer from "./redux/reducers/booking.reducer";
import reviewReducer from "./redux/reducers/review.reducer";

import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    product: pitchReducers,
    timeShoot: timeShootReducer,
    booking: bookingReducer,
    review: reviewReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export { store };
