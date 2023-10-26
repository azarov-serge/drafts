import { createSelector } from "@reduxjs/toolkit";
import { State as UserState } from "./slice";
import { State } from "@/redux/store";

const selectSelf = (state: State) => state.user;

const selectError = createSelector(
	selectSelf,
	(state: UserState) => state.error
);

const selectStatus = createSelector(
	selectSelf,
	(state: UserState) => state.status
);

const selectUser = createSelector(selectSelf, (state: UserState) => state.user);

export const selectors = {
	selectError,
	selectStatus,
	selectUser,
};
