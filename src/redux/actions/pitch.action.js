import { createAction } from "@reduxjs/toolkit";

export const getPitchListAction = createAction("GET_PITCH_LIST_REQUEST");
export const createPitchAction = createAction("CREATE_PITCH_REQUEST");
export const updatePitchAction = createAction("UPDATE_PITCH_REQUEST");
export const deletePitchAction = createAction("DELETE_PITCH_REQUEST");
