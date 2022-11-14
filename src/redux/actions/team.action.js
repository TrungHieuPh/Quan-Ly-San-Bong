import { createAction } from "@reduxjs/toolkit";
import { TEAM_ACTION, REQUEST } from "../constants";

export const getTeamListAction = createAction(
  REQUEST(TEAM_ACTION.GET_TEAM_LIST)
);
