import { takeEvery, put, debounce } from "redux-saga/effects";
import axios from "axios";
import moment from "moment";
import { Modal } from "antd";

import { PITCH_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";
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
function* getPitchListSaga(action) {
  try {
    const { params, more, dateSelected } = action.payload;
    const result = yield axios.get(`http://localhost:4000/pitchs`, {
      params: {
        _expand: "team",
        _embed: ["times", "images", "favorites", "reviews"],
        _page: params.page,
        _limit: params.limit,
        ...(params.teamId && {
          teamId: params.teamId,
        }),
        ...(params.keyword && {
          q: params.keyword,
        }),
        ...(params.timeShootId && {
          timeShootId: params.timeShootId,
        }),
        ...(params.sortFilter && {
          _sort: "price",
          _order: params.sortFilter,
        }),
        dateSelected: params.dateSelected,
      },
    });
    yield put({
      type: SUCCESS(PITCH_ACTION.GET_PITCH_LIST),
      payload: {
        data: result.data,
        meta: {
          total: parseInt(result.headers["x-total-count"]),
          page: params.page,
          limit: params.limit,
        },
        more: more,
        /* dateSelected: dateSelected, */
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PITCH_ACTION.GET_PITCH_LIST),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* getPitchDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/pitchs/${id}`, {
      params: {
        _embed: ["times", "images", "favorites", "reviews", "orders"],
      },
    });
    yield put({
      type: SUCCESS(PITCH_ACTION.GET_PITCH_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PITCH_ACTION.GET_PITCH_DETAIL),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* createPitchSaga(action) {
  try {
    const { values, options, images } = action.payload;
    const result = yield axios.post("http://localhost:4000/pitchs", values);
    for (let i = 0; i < options.length; i++) {
      yield axios.post("http://localhost:4000/times", {
        pitchId: result.data.id,
        name: options[i].name,
        /*  timeSelect: options[i].timeSelect, */
        timestart: moment(options[i].timestart).format("HH:mm:ss"),
        timeend: moment(options[i].timeend).format("HH:mm:ss"),
      });
    }
    for (let j = 0; j < images.length; j++) {
      yield axios.post("http://localhost:4000/images", {
        ...images[j],
        pitchId: result.data.id,
      });
    }
    countDown();
    yield put({
      type: SUCCESS(PITCH_ACTION.CREATE_PITCH),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PITCH_ACTION.CREATE_PITCH),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* updatePitchSaga(action) {
  /*  try {
    const { values, id } = action.payload;
    const result = yield axios.patch(
      `http://localhost:4000/pitchs/${id}`,
      values
    );
    yield put({
      type: "UPDATE_PITCH_SUCCESS",
      payload: {
        data: result.data,
      },
    });
    yield put({ type: "GET_PITCH_LIST_REQUEST" });
  } catch (e) {
    yield put({
      type: "UPDATE_PRODUCT_FAIL",
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  } */
  try {
    const { id, values, options, initialOptionIds, images, initialImageIds } =
      action.payload;
    const result = yield axios.patch(
      `http://localhost:4000/pitchs/${id}`,
      values
    );
    // Options
    for (let i = 0; i < options.length; i++) {
      if (options[i].id) {
        yield axios.patch(`http://localhost:4000/times/${options[i].id}`, {
          pitchId: result.data.id,
          name: options[i].name,
          timestart:
            options[i]
              .timeSelect[0] /*  moment(options[i].timeSelect[0]).format("HH:mm:ss"), */,
          timeend:
            options[i]
              .timeSelect[1] /*  moment(options[i].timeSelect[1]).format("HH:mm:ss"), */,
        });
      } else {
        yield axios.post("http://localhost:4000/times", {
          pitchId: result.data.id,
          name: options[i].name,
          timestart:
            options[i]
              .timeSelect[0] /*  moment(options[i].timeSelect[0]).format("HH:mm:ss"), */,
          timeend:
            options[i]
              .timeSelect[1] /*  moment(options[i].timeSelect[1]).format("HH:mm:ss"), */,
        });
      }
    }
    for (let j = 0; j < initialOptionIds.length; j++) {
      const keepOption = options.find(
        (item) => item.id && item.id === initialOptionIds[j]
      );
      if (!keepOption) {
        yield axios.delete(
          `http://localhost:4000/times/${initialOptionIds[j]}`
        );
      }
    }
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
      type: SUCCESS(PITCH_ACTION.UPDATE_PITCH),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PITCH_ACTION.UPDATE_PITCH),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* deletePitchSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`http://localhost:4000/pitchs/${id}`);
    yield put({ type: "DELETE_PRODUCT_SUCCESS" });
    yield put({ type: "GET_PRODUCT_LIST_REQUEST" });
  } catch (e) {
    yield put({
      type: "DELETE_PRODUCT_FAIL",
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

export default function* pitchSaga() {
  yield debounce(500, REQUEST(PITCH_ACTION.GET_PITCH_LIST), getPitchListSaga);
  yield takeEvery(REQUEST(PITCH_ACTION.GET_PITCH_DETAIL), getPitchDetailSaga);
  yield takeEvery(REQUEST(PITCH_ACTION.CREATE_PITCH), createPitchSaga);
  yield takeEvery(REQUEST(PITCH_ACTION.UPDATE_PITCH), updatePitchSaga);
  yield takeEvery(REQUEST(PITCH_ACTION.DELETE_PITCH), deletePitchSaga);
}
