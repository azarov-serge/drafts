import {
	actions,
	reducer,
	initialState,
	User,
	AuthData,
	AuthState,
} from "./slice";

const user: User = {
	uid: "1",
	email: "test@test.test",
};

const authUserData: AuthData = {
	email: "test@test.test",
	password: "test",
};

const ERROR = "ERRROR";

describe("currentUserSlice test", () => {
	const {
		setUser,
		signIn,
		signUp,
		signOut,
		clear,
		setSingInError,
		setSingUpError,
	} = actions;

	describe("User actions", () => {
		it("setUser", () => {
			const action = {
				type: setUser.type,
				payload: user,
			};
			expect(setUser(user)).toEqual(action);
		});

		it("signIn", () => {
			const action = {
				type: signIn.type,
				payload: authUserData,
			};
			expect(signIn(authUserData)).toEqual(action);
		});
		it("signUp", () => {
			const action = {
				type: signUp.type,
				payload: authUserData,
			};
			expect(signUp(authUserData)).toEqual(action);
		});
		it("signOut", () => {
			const action = {
				type: signOut.type,
			};
			expect(signOut()).toEqual(action);
		});
		it("setSingInError", () => {
			const action = {
				type: setSingInError.type,
				payload: ERROR,
			};
			expect(setSingInError(ERROR)).toEqual(action);
		});
		it("setSingUpError", () => {
			const action = {
				type: setSingUpError.type,
				payload: ERROR,
			};
			expect(setSingUpError(ERROR)).toEqual(action);
		});
		it("clear", () => {
			const action = {
				type: clear.type,
			};
			expect(clear()).toEqual(action);
		});
	});

	describe("User reducer", () => {
		it("reduser/setUser", () => {
			const action = setUser(user);
			const state = reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				status: AuthState.SUCCESSED,
				user,
			});
		});

		it("reduser/setSingInError", () => {
			const action = setSingInError(ERROR);
			const state = reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				status: AuthState.FAILED_SIGN_IN,
				error: ERROR,
			});
		});

		it("reduser/setSingUpError", () => {
			const action = setSingUpError(ERROR);
			const state = reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				status: AuthState.FAILED_SIGN_UP,
				error: ERROR,
			});
		});
		it("reduser/clear", () => {
			const action = clear();
			const state = reducer(initialState, action);
			expect(state).toEqual(initialState);
		});
	});
});
