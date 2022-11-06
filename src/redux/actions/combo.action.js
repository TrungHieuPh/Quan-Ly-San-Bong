import { createAction } from "@reduxjs/toolkit";
import { COMBO_ACTION, REQUEST } from "../constants";

export const getComboAction = createAction(REQUEST(COMBO_ACTION.GET_COMBO));
