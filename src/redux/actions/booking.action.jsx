import { createAction } from "@reduxjs/toolkit";
import { BOOKING_ACTION, REQUEST } from "../constants";

export const getOderListAction = createAction(
  REQUEST(BOOKING_ACTION.GET_ORDER_LIST)
);
export const bookingPitchAction = createAction(
  REQUEST(BOOKING_ACTION.BOOKING_PITCH)
);
