import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import pitchReducers from "./redux/reducers/pitch.reducer";
import userReducer from "./redux/reducers/user.reducer";
import timeShootReducer from "./redux/reducers/timeshoot.reducer";
import bookingReducer from "./redux/reducers/booking.reducer";
import reviewReducer from "./redux/reducers/review.reducer";
import locationReducer from "./redux/reducers/location.reducer";
import arbitrationReducer from "./redux/reducers/arbitration.reducer";
import comboReducer from "./redux/reducers/combo.reducer";
import CheckoutReducer from "./redux/reducers/checkout.reducer";

import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    product: pitchReducers,
    timeShoot: timeShootReducer,
    booking: bookingReducer,
    review: reviewReducer,
    location: locationReducer,
    arbitration: arbitrationReducer,
    combo: comboReducer,
    checkout: CheckoutReducer,
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
