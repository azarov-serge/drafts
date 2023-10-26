import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "@redux-saga/core";
import { signIn, signUp, signOut } from "./api";
import { actions, AuthData } from "./slice";
import { history } from "@/constants/history";
import { AppRoute } from "@/constants/app-routes";

export function* signInWorker(action: PayloadAction<AuthData>): SagaIterator {
	try {
		const { email, password } = action.payload;
		const response = yield call(signIn, email, password);
		if (response.user) {
			yield put(actions.setUser(response.user));
			history.push(AppRoute.ROOT);
		} else {
			yield put(actions.setSingInError(response.message));
		}
	} catch (error) {
		yield put(actions.setSingInError(error.message));
	}
}

export function* signUpWorker(action: PayloadAction<AuthData>): SagaIterator {
	try {
		const { email, password } = action.payload;
		const response = yield call(signUp, email, password);
		if (response.user) {
			yield put(actions.setUser(response.user));
			history.push(AppRoute.ROOT);
		} else {
			yield put(actions.setSingUpError(response.message));
		}
	} catch (error) {
		yield put(actions.setSingUpError(error.message));
	}
}

export function* signOutWorker(): SagaIterator {
	try {
		yield call(signOut);
		yield put(actions.clear());
		history.push(AppRoute.WELCOME);
	} catch (error) {
		console.error(error.message);
	}
}

export function* watchAuth(): SagaIterator {
	yield takeLatest(actions.signIn.type, signInWorker);
	yield takeLatest(actions.signUp.type, signUpWorker);
	yield takeLatest(actions.signOut.type, signOutWorker);
}
