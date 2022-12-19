import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import { Modal } from "antd";

import {
  BLOG_ACTION,
  REVIEW_ACTION,
  REQUEST,
  SUCCESS,
  FAIL,
} from "../constants";
import { REVIEW_LIST_LIMIT } from "../../constants/paginations";
const countDown = () => {
  let secondsToGo = 2;
  const modal = Modal.success({
    title: "Đặt sân thành công!",
    content: `Tiếp tục trong ${secondsToGo} giây.`,
  });
  const timer = setInterval(() => {
    secondsToGo -= 1;
    modal.update({
      content: `Tiếp tục trong ${secondsToGo} giây.`,
    });
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
  }, secondsToGo * 1000);
};
function* getReviewListSaga(action) {
  try {
    const { pitchId } = action.payload;
    const result = yield axios.get("http://localhost:4000/reviews", {
      params: {
        pitchId: pitchId,
        _expand: ["user"],
        _sort: "id",
        _order: "desc",
      },
    });
    yield put({
      type: SUCCESS(REVIEW_ACTION.GET_REVIEW_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(REVIEW_ACTION.GET_REVIEW_LIST),
      payload: {
        error: "Fail!",
      },
    });
  }
}

function* postReviewSaga(action) {
  try {
    const { pitchId } = action.payload;
    const result = yield axios.post(
      "http://localhost:4000/reviews",
      action.payload
    );
    yield put({
      type: SUCCESS(REVIEW_ACTION.POST_REVIEW),
      payload: {
        data: result.data,
      },
    });
    yield put({
      type: REQUEST(REVIEW_ACTION.GET_REVIEW_LIST_BLOG),
      payload: {
        pitchId: pitchId,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(REVIEW_ACTION.POST_REVIEW),
      payload: {
        error: e.response.data,
      },
    });
  }
}

function* DeleteReviewSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`http://localhost:4000/reviews/${id}`);
    yield put({ type: SUCCESS(REVIEW_ACTION.DELETE_REVIEW) });
    yield put({
      type: REQUEST(REVIEW_ACTION.GET_REVIEW_LIST),
      payload: {
        page: 1,
        limit: REVIEW_LIST_LIMIT,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(REVIEW_ACTION.DELETE_REVIEW),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}
function* getReviewListBlogSaga(action) {
  try {
    const { blogId } = action.payload;
    const result = yield axios.get("http://localhost:4000/reviewBlogs", {
      params: {
        blogId: blogId,
        _expand: ["user"],
        _sort: "id",
        _order: "desc",
      },
    });
    yield put({
      type: SUCCESS(REVIEW_ACTION.GET_REVIEW_LIST_BLOG),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(REVIEW_ACTION.GET_REVIEW_LIST_BLOG),
      payload: {
        error: "Fail!",
      },
    });
  }
}

function* postReviewBlogSaga(action) {
  try {
    const { blogId, callback } = action.payload;
    const result = yield axios.post(
      "http://localhost:4000/reviewBlogs",
      action.payload
    );
    yield put({
      type: SUCCESS(REVIEW_ACTION.POST_REVIEW_BLOG),
      payload: {
        data: result.data,
      },
    });
    yield callback.clearForm();
    yield put({
      type: REQUEST(REVIEW_ACTION.GET_REVIEW_LIST_BLOG),
      payload: {
        blogId: blogId,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(REVIEW_ACTION.POST_REVIEW_BLOG),
      payload: {
        error: e.response.data,
      },
    });
  }
}

function* DeleteReviewBlogSaga(action) {
  try {
    const { id, blogId } = action.payload;
    yield axios.delete(`http://localhost:4000/reviewBlogs/${id}`);
    yield put({
      type: SUCCESS(REVIEW_ACTION.DELETE_REVIEW),
      payload: {
        id: id,
      },
    });
    yield put({
      type: REQUEST(REVIEW_ACTION.GET_REVIEW_LIST_BLOG),
      payload: {
        page: 1,
        limit: REVIEW_LIST_LIMIT,
      },
    });
    /*  yield put({
      type: REQUEST(BLOG_ACTION.GET_BLOG_DETAIL),
      payload: {
        id: blogId,
      },
    }); */
  } catch (e) {
    yield put({
      type: FAIL(REVIEW_ACTION.DELETE_REVIEW),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

export default function* reviewSaga() {
  yield takeEvery(REQUEST(REVIEW_ACTION.GET_REVIEW_LIST), getReviewListSaga);
  yield takeEvery(REQUEST(REVIEW_ACTION.POST_REVIEW), postReviewSaga);
  yield takeEvery(REQUEST(REVIEW_ACTION.DELETE_REVIEW), DeleteReviewSaga);
  yield takeEvery(
    REQUEST(REVIEW_ACTION.GET_REVIEW_LIST_BLOG),
    getReviewListBlogSaga
  );
  yield takeEvery(REQUEST(REVIEW_ACTION.POST_REVIEW_BLOG), postReviewBlogSaga);
  yield takeEvery(
    REQUEST(REVIEW_ACTION.DELETE_REVIEW_BLOG),
    DeleteReviewBlogSaga
  );
}
