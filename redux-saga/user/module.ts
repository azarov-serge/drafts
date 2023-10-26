import { ISagaModule } from "redux-dynamic-modules-saga";

import { reducer } from "./slice";
import { watchAuth } from "./saga";

export const getUserModule = (): ISagaModule<typeof reducer> => ({
	id: "user",
	reducerMap: {
		user: reducer,
	},
	sagas: [watchAuth],
});
