import { takeEvery, put, debounce } from "redux-saga/effects";

import axios from "axios";
import moment from "moment";
import { Modal } from "antd";

import { BLOG_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";
import { BLOG_LIST_LIMIT } from "../../constants/paginations";

/* const countDown = () => {
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
}; */
function* getBlogListSaga(action) {
  try {
    const { params, more } = action.payload;
    const result = yield axios.get(`http://localhost:4000/blogs`, {
      params: {
        _expand: "user",
        _embed: ["imageBlogs", "favoriteBlogs", "reviewBlogs"],
        _page: params.page,
        _limit: params.limit,
        ...(params.keyword && {
          q: params.keyword,
        }),
      },
    });
    yield put({
      type: SUCCESS(BLOG_ACTION.GET_BLOG_LIST),
      payload: {
        data: result.data,
        meta: {
          total: parseInt(result.headers["x-total-count"]),
          page: params.page,
          limit: params.limit,
        },
        more: more,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(BLOG_ACTION.GET_BLOG_LIST),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* getBlogDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/blogs/${id}`, {
      params: {
        _embed: ["imageBlogs", "reviewBlogs", "favoriteBlogs"],
        _expand: "user",
      },
    });
    yield put({
      type: SUCCESS(BLOG_ACTION.GET_BLOG_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(BLOG_ACTION.GET_BLOG_DETAIL),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* createBlogSaga(action) {
  try {
    const { values, images, userId } = action.payload;
    const result = yield axios.post("http://localhost:4000/blogs", {
      ...values,
      userId: userId,
      status: 1,
    });

    for (let i = 0; i < images.length; i++) {
      yield axios.post("http://localhost:4000/imageBlogs", {
        ...images[i],
        blogId: result.data.id,
      });
    }

    yield put({
      type: SUCCESS(BLOG_ACTION.CREATE_BLOG),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(BLOG_ACTION.CREATE_BLOG),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* updateBlogSaga(action) {
  try {
    const { id, values, options, initialOptionIds, images, initialImageIds } =
      action.payload;

    const result = yield axios.patch(
      `http://localhost:4000/blogs/${id}`,
      values
    );

    // Images
    for (let i = 0; i < images.length; i++) {
      if (!images[i].id) {
        yield axios.post("http://localhost:4000/images", {
          ...images[i],
          pitchId: result.data.id,
        });
      }
    }
    for (let j = 0; j < initialImageIds.length; j++) {
      const keepImage = images.find(
        (item) => item.id && item.id === initialImageIds[j]
      );
      if (!keepImage) {
        yield axios.delete(
          `http://localhost:4000/images/${initialImageIds[j]}`
        );
      }
    }
    yield put({
      type: SUCCESS(BLOG_ACTION.UPDATE_PITCH),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(BLOG_ACTION.UPDATE_PITCH),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}
function* browserBlogSaga(action) {
  try {
    const { id, values } = action.payload;

    const result = yield axios.patch(`http://localhost:4000/blogs/${id}`, {
      ...values,
      status: 2,
    });
    yield put({
      type: SUCCESS(BLOG_ACTION.BROWSER_BLOG),
      payload: {
        data: result.data,
      },
    });
    yield put({
      type: REQUEST(BLOG_ACTION.GET_BLOG_LIST),
      params: {
        page: 1,
        limit: BLOG_LIST_LIMIT,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(BLOG_ACTION.BROWSER_BLOG),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* deleteBlogSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`http://localhost:4000/blogs/${id}`);
    yield put({ type: SUCCESS(BLOG_ACTION.DELETE_BLOG) });
    yield put({
      type: REQUEST(BLOG_ACTION.GET_BLOG_LIST),
      params: {
        page: 1,
        limit: BLOG_LIST_LIMIT,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(BLOG_ACTION.DELETE_BLOG),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}
export default function* blogSaga() {
  yield debounce(500, REQUEST(BLOG_ACTION.GET_BLOG_LIST), getBlogListSaga);
  yield takeEvery(REQUEST(BLOG_ACTION.GET_BLOG_DETAIL), getBlogDetailSaga);
  yield takeEvery(REQUEST(BLOG_ACTION.CREATE_BLOG), createBlogSaga);
  yield takeEvery(REQUEST(BLOG_ACTION.UPDATE_BLOG), updateBlogSaga);
  yield takeEvery(REQUEST(BLOG_ACTION.DELETE_BLOG), deleteBlogSaga);
  yield takeEvery(REQUEST(BLOG_ACTION.BROWSER_BLOG), browserBlogSaga);
}
