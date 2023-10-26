import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";

export enum AuthState {
	INITIALED,
	SUCCESSED,
	FAILED_SIGN_IN,
	FAILED_SIGN_UP,
}

export interface User {
	uid?: string;
	email?: string;
}

export interface State {
	user: User;
	status: AuthState;
	error: string;
}

export const initialState: State = {
	user: {},
	status: AuthState.INITIALED,
	error: "",
};

export type AuthData = { email: string; password: string };

const signIn = createAction<AuthData>("user/signIn");
const signUp = createAction<AuthData>("user/signUp");
const signOut = createAction("user/signOut");

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, { payload }: PayloadAction<User>) => {
			return {
				...state,
				status: AuthState.SUCCESSED,
				user: payload,
				error: "",
			};
		},
		setSingInError: (state, { payload }: PayloadAction<string>) => {
			return {
				...state,
				status: AuthState.FAILED_SIGN_IN,
				error: payload,
			};
		},
		setSingUpError: (state, { payload }: PayloadAction<string>) => {
			return {
				...state,
				status: AuthState.FAILED_SIGN_UP,
				error: payload,
			};
		},
		clear: () => ({
			...initialState,
		}),
	},
});

export const { reducer } = userSlice;

export const actions = {
	...userSlice.actions,
	signIn,
	signUp,
	signOut,
};
