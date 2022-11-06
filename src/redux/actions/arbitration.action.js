import { createAction } from "@reduxjs/toolkit";
import { ARBITRATION_ACTION, REQUEST } from "../constants";

export const getArbitrationAction = createAction(
  REQUEST(ARBITRATION_ACTION.GET_ARBITRATION)
);
