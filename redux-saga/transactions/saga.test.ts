/* eslint-disable jest/expect-expect */
import { expectSaga, testSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import * as matchers from "redux-saga-test-plan/matchers";

import { actions, reducer, initialState, DataStatus } from "./slice";
import {
	watchTransactions,
	getTransactionsWorker,
	delTransactionWorker,
} from "./saga";
import { getTransactions, delTransaction } from "./api";
import { transactions } from "@/mocks/transactions";

const actionGetTransactions = {
	type: actions.getTransactions.type,
	payload: "u1",
};

const ID = transactions[0].id;
const actionDelTransaction = {
	type: actions.getTransactions.type,
	payload: ID,
};

const ERROR = "ERROR";

describe("Transaction/Saga", () => {
	describe("getTransactionsWorker", () => {
		it("getTransactionsWorker success with data", () => {
			return expectSaga(getTransactionsWorker, actionGetTransactions)
				.withReducer(reducer)
				.put(actions.setStatus(DataStatus.LOADING))
				.provide([[matchers.call.fn(getTransactions), transactions]])
				.put(actions.setStartDate(transactions[0].date))
				.put(actions.setTransactions(transactions))
				.put(actions.setStatus(DataStatus.SUCCESSED))
				.hasFinalState({
					...initialState,
					transactions,
					status: DataStatus.SUCCESSED,
					start: transactions[0].date,
				})
				.run();
		});

		it("getTransactionsWorker success without data", () => {
			return expectSaga(getTransactionsWorker, actionGetTransactions)
				.withReducer(reducer)
				.put(actions.setStatus(DataStatus.LOADING))
				.provide([[matchers.call.fn(getTransactions), []]])
				.put(actions.setTransactions([]))
				.put(actions.setStatus(DataStatus.SUCCESSED))
				.hasFinalState({
					...initialState,
					transactions: [],
					status: DataStatus.SUCCESSED,
				})
				.run();
		});

		it("getTransactionsWorker error", () => {
			const expectedException = new Error(ERROR);
			return expectSaga(getTransactionsWorker, actionGetTransactions)
				.withReducer(reducer)
				.put(actions.setStatus(DataStatus.LOADING))
				.provide([
					[matchers.call.fn(getTransactions), throwError(expectedException)],
				])
				.put(actions.setStatus(DataStatus.FAILED))
				.put(actions.setError(ERROR))
				.hasFinalState({
					...initialState,
					status: DataStatus.FAILED,
					error: ERROR,
				})
				.run();
		});
	});

	describe("delTransactionWorker", () => {
		it("delTransactionWorker success", () => {
			const updatedTransactions = transactions.filter((item) => item.id !== ID);
			return expectSaga(delTransactionWorker, actionDelTransaction)
				.withReducer(reducer)
				.withState({
					...initialState,
					transactions,
				})
				.put(actions.setStatus(DataStatus.SENDING))
				.provide([[matchers.call.fn(delTransaction), "ok"]])
				.put(actions.removeTransaction(ID))
				.put(actions.setStatus(DataStatus.SUCCESSED))
				.hasFinalState({
					...initialState,
					transactions: updatedTransactions,
					status: DataStatus.SUCCESSED,
				})
				.run();
		});

		it("delTransactionWorker with response error", () => {
			return expectSaga(delTransactionWorker, actionDelTransaction)
				.withReducer(reducer)
				.withState({
					...initialState,
					transactions,
				})
				.put(actions.setStatus(DataStatus.SENDING))
				.provide([[matchers.call.fn(delTransaction), { message: ERROR }]])
				.put(actions.setStatus(DataStatus.FAILED))
				.put(actions.setError(ERROR))
				.hasFinalState({
					...initialState,
					transactions,
					status: DataStatus.FAILED,
					error: ERROR,
				})
				.run();
		});

		it("delTransactionWorker error", () => {
			const expectedException = new Error(ERROR);
			return expectSaga(delTransactionWorker, actionDelTransaction)
				.withReducer(reducer)
				.put(actions.setStatus(DataStatus.SENDING))
				.provide([
					[matchers.call.fn(delTransaction), throwError(expectedException)],
				])
				.put(actions.setStatus(DataStatus.FAILED))
				.put(actions.setError(ERROR))
				.hasFinalState({
					...initialState,
					status: DataStatus.FAILED,
					error: ERROR,
				})
				.run();
		});
	});

	describe("watchTransactions", () => {
		it("watchTransactions flow", () => {
			const saga = testSaga(watchTransactions);
			saga
				.next(actionGetTransactions)
				.next(getTransactionsWorker(actionGetTransactions))
				.next(actionDelTransaction)
				.next(delTransactionWorker(actionDelTransaction))
				.finish();
		});
	});
});
