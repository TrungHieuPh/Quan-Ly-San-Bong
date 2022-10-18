import { createAction } from "@reduxjs/toolkit";
import { PITCH_ACTION, REQUEST } from "../constants";

export const getPitchListAction = createAction(
  REQUEST(PITCH_ACTION.GET_PITCH_LIST)
);
export const getPitchDetailAction = createAction(
  REQUEST(PITCH_ACTION.GET_PITCH_DETAIL)
);
export const createPitchAction = createAction("CREATE_PITCH_REQUEST");
export const updatePitchAction = createAction("UPDATE_PITCH_REQUEST");
export const deletePitchAction = createAction("DELETE_PITCH_REQUEST");
