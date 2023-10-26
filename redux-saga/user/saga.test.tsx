/* eslint-disable jest/expect-expect */
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";

import { actions, reducer, initialState, AuthState } from "./slice";
import { signInWorker } from "./saga";
import { signIn } from "./api";

const authUserData = {
	email: "test@test.test",
	password: "test",
};

const testUser = {
	uid: "1987",
	email: "test@test.test",
};

describe("User Saga", () => {
	describe("Login success", () => {
		it("checkUserSession with not-empty username success", () => {
			return expectSaga(signInWorker, {
				type: actions.signIn.type,
				payload: authUserData,
			})
				.withReducer(reducer)
				.provide([[matchers.call.fn(signIn), authUserData]])
				.put(actions.setUser(testUser))
				.hasFinalState({
					...initialState,
					user: testUser,
					status: AuthState.SUCCESSED,
				})
				.run();
		});
	});
});
