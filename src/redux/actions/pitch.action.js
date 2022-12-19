import { createAction } from "@reduxjs/toolkit";
import { PITCH_ACTION, REQUEST } from "../constants";

export const getPitchListAction = createAction(
  REQUEST(PITCH_ACTION.GET_PITCH_LIST)
);
export const getPitchDetailAction = createAction(
  REQUEST(PITCH_ACTION.GET_PITCH_DETAIL)
);
export const createPitchAction = createAction(
  REQUEST(PITCH_ACTION.CREATE_PITCH)
);
export const updatePitchAction = createAction(
  REQUEST(PITCH_ACTION.UPDATE_PITCH)
);
export const deletePitchAction = createAction(
  REQUEST(PITCH_ACTION.DELETE_PITCH)
);
