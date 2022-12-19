import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import { FAVORITE_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

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
    const { id } = action.payload;
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
    const result = yield axios.get("http://localhost:4000/favorites", {
      params: {
        _expand: ["user", "pitch"],
      },
    });
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

function* favoriteBlogSaga(action) {
  try {
    const result = yield axios.post(
      "http://localhost:4000/favoriteBlogs",
      action.payload
    );
    yield put({
      type: SUCCESS(FAVORITE_ACTION.FAVORITE_BLOG),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(FAVORITE_ACTION.FAVORITE_BLOG),
      payload: {
        error: "Fail!",
      },
    });
  }
}

function* unFavoriteBlogSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`http://localhost:4000/favoriteBlogs/${id}`);
    yield put({
      type: SUCCESS(FAVORITE_ACTION.UN_FAVORITE_BLOG),
      payload: {
        id: id,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(FAVORITE_ACTION.UN_FAVORITE_BLOG),
      payload: {
        error: e.response.data,
      },
    });
  }
}

function* getFavoriteBlogListSaga(action) {
  try {
    const result = yield axios.get("http://localhost:4000/favoriteBlogs", {
      params: {
        _expand: ["user", "blog"],
      },
    });
    yield put({
      type: SUCCESS(FAVORITE_ACTION.GET_FAVORITE_BLOG_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(FAVORITE_ACTION.GET_FAVORITE_BLOG_LIST),
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
  yield takeEvery(REQUEST(FAVORITE_ACTION.FAVORITE_BLOG), favoriteBlogSaga);
  yield takeEvery(
    REQUEST(FAVORITE_ACTION.UN_FAVORITE_BLOG),
    unFavoriteBlogSaga
  );
  yield takeEvery(
    REQUEST(FAVORITE_ACTION.GET_FAVORITE_BLOG_LIST),
    getFavoriteBlogListSaga
  );
}
