import { createAction } from "@reduxjs/toolkit";
import { TIME_SHOOT_ACTION, REQUEST } from "../constants";

export const getTimeShootListAction = createAction(
  REQUEST(TIME_SHOOT_ACTION.GET__TIME_SHOOT_LIST)
);
