import { combineReducers } from "redux";
import { createStore } from "redux-dynamic-modules";
import { getSagaExtension } from "redux-dynamic-modules-saga";

import { userSlice } from "./user";
import { getUserModule } from "./user/module";

import { transactionsSlice } from "./transactions/slice";
import { getTransactionsModule } from "./transactions/module";

const reducer = combineReducers({
	user: userSlice.reducer,
	transactions: transactionsSlice.reducer,
});

export type State = ReturnType<typeof reducer>;

export const store = createStore<State>(
	{ extensions: [getSagaExtension({})] },
	getUserModule(),
	getTransactionsModule()
);
