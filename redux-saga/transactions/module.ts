import { ISagaModule } from "redux-dynamic-modules-saga";

import { reducer } from "./slice";
import { watchTransactions } from "./saga";

export const getTransactionsModule = (): ISagaModule<typeof reducer> => ({
	id: "transactions",
	reducerMap: {
		transactions: reducer,
	},
	sagas: [watchTransactions],
});
