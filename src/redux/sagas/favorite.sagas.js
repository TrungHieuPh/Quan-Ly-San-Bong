import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import {
  FAVORITE_ACTION,
  PRODUCT_ACTION,
  REQUEST,
  SUCCESS,
  FAIL,
  PITCH_ACTION,
} from "../constants";

function* favoriteProductSaga(action) {
  try {
    /*   const { pitchId } = action.payload; */
    const result = yield axios.post(
      "http://localhost:4000/favorites",
      action.payload
    );
    yield put({
      type: SUCCESS(FAVORITE_ACTION.FAVORITE_PITCH),
      payload: {
        data: result.data,
      },
    });
    /*  yield put({
      type: REQUEST(PITCH_ACTION.GET_PITCH_DETAIL),
      payload: { id: pitchId },
    }); */
  } catch (e) {
    yield put({
      type: FAIL(FAVORITE_ACTION.FAVORITE_PITCH),
      payload: {
        error: "Fail!",
      },
    });
  }
}

function* unFavoriteProductSaga(action) {
  try {
    const { id, pitchId } = action.payload;
    console.log(id, "productId");
    yield axios.delete(`http://localhost:4000/favorites/${id}`);
    yield put({
      type: SUCCESS(FAVORITE_ACTION.UN_FAVORITE_PITCH),
      payload: {
        id: id,
      },
    });
    /*  yield put({
      type: REQUEST(PITCH_ACTION.GET_PITCH_DETAIL),
      payload: { id: pitchId },
    }); */
  } catch (e) {
    yield put({
      type: FAIL(FAVORITE_ACTION.UN_FAVORITE_PITCH),
      payload: {
        error: e.response.data,
      },
    });
  }
}

function* getFavoriteListSaga(action) {
  try {
    const result = yield axios.get("http://localhost:4000/favorites");
    yield put({
      type: SUCCESS(FAVORITE_ACTION.GET_FAVORITE_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(FAVORITE_ACTION.GET_FAVORITE_LIST),
      payload: {
        error: e.response.data,
      },
    });
  }
}

export default function* favoriteSaga() {
  yield takeEvery(REQUEST(FAVORITE_ACTION.FAVORITE_PITCH), favoriteProductSaga);
  yield takeEvery(
    REQUEST(FAVORITE_ACTION.UN_FAVORITE_PITCH),
    unFavoriteProductSaga
  );
  yield takeEvery(
    REQUEST(FAVORITE_ACTION.GET_FAVORITE_LIST),
    getFavoriteListSaga
  );
}
