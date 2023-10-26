import { call, put, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import { PayloadAction } from "@reduxjs/toolkit";
import { getTransactions, delTransaction } from "./api";
import { actions, DataStatus } from "./slice";

export function* getTransactionsWorker(
	action: PayloadAction<string>
): SagaIterator {
	try {
		const uid = action.payload;
		yield put(actions.setStatus(DataStatus.LOADING));
		const response = yield call(getTransactions, uid);
		if (response.length) {
			yield put(actions.setStartDate(response[0].date));
		}
		yield put(actions.setTransactions(response));
		yield put(actions.setStatus(DataStatus.SUCCESSED));
	} catch (error) {
		yield put(actions.setStatus(DataStatus.FAILED));
		yield put(actions.setError(error.message));
	}
}

export function* delTransactionWorker(
	action: PayloadAction<string>
): SagaIterator {
	try {
		const id = action.payload;
		yield put(actions.setStatus(DataStatus.SENDING));
		const response = yield call(delTransaction, id);
		if (response === "ok") {
			yield put(actions.removeTransaction(id));
			yield put(actions.setStatus(DataStatus.SUCCESSED));
		} else {
			yield put(actions.setStatus(DataStatus.FAILED));
			yield put(actions.setError(response.message));
		}
	} catch (error) {
		yield put(actions.setStatus(DataStatus.FAILED));
		yield put(actions.setError(error.message));
	}
}

export function* watchTransactions(): SagaIterator {
	yield takeEvery(actions.getTransactions.type, getTransactionsWorker);
	yield takeEvery(actions.delTransaction.type, delTransactionWorker);
}
