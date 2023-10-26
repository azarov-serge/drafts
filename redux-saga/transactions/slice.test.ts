import { actions, reducer, initialState, DataStatus } from "./slice";
import { transactions } from "@/mocks/transactions";

const DATE = new Date("5/25/2020 00:00:00");
const ERROR = "ERRROR";

describe("currentUserSlice test", () => {
	const {
		getTransactions,
		setTransactions,
		delTransaction,
		removeTransaction,
		setStartDate,
		setEndDate,
		setStatus,
		setError,
		clear,
	} = actions;

	describe("Transactions/Actions", () => {
		it("getTransactions", () => {
			const UID = transactions[0].uid;
			const action = {
				type: getTransactions.type,
				payload: UID,
			};
			expect(getTransactions(UID)).toEqual(action);
		});

		it("setTransactions", () => {
			const action = {
				type: setTransactions.type,
				payload: transactions,
			};
			expect(setTransactions(transactions)).toEqual(action);
		});

		it("delTransaction", () => {
			const ID = transactions[2].id;
			const action = {
				type: delTransaction.type,
				payload: ID,
			};
			expect(delTransaction(ID)).toEqual(action);
		});

		it("removeTransaction", () => {
			const ID = transactions[2].id;
			const action = {
				type: removeTransaction.type,
				payload: ID,
			};
			expect(removeTransaction(ID)).toEqual(action);
		});

		it("setStartDate", () => {
			const action = {
				type: setStartDate.type,
				payload: DATE,
			};
			expect(setStartDate(DATE)).toEqual(action);
		});

		it("setEndDate", () => {
			const action = {
				type: setEndDate.type,
				payload: DATE,
			};
			expect(setEndDate(DATE)).toEqual(action);
		});

		it("setStatus", () => {
			const action = {
				type: setStatus.type,
				payload: DataStatus.SUCCESSED,
			};
			expect(setStatus(DataStatus.SUCCESSED)).toEqual(action);
		});

		it("setError", () => {
			const action = {
				type: setError.type,
				payload: ERROR,
			};
			expect(setError(ERROR)).toEqual(action);
		});

		it("clear", () => {
			const action = {
				type: clear.type,
			};
			expect(clear()).toEqual(action);
		});
	});

	describe("Transactions/Reducer", () => {
		it("setTransactions", () => {
			const action = setTransactions(transactions);
			const state = reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				transactions,
				error: "",
			});
		});

		it("removeTransaction", () => {
			const ID = transactions[2].id;
			const action = removeTransaction(ID);
			const mockState = {
				...initialState,
				transactions,
			};

			const updatedTransactions = transactions.filter((item) => item.id !== ID);
			const state = reducer(mockState, action);
			expect(state).toEqual({
				...initialState,
				transactions: updatedTransactions,
			});
		});

		it("setStartDate", () => {
			const action = setStartDate(DATE);
			const state = reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				start: DATE,
			});
		});

		it("setEndDate", () => {
			const action = setEndDate(DATE);
			const state = reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				end: DATE,
			});
		});

		it("setStatus", () => {
			const action = setStatus(DataStatus.SUCCESSED);
			const state = reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				status: DataStatus.SUCCESSED,
			});
		});

		it("setError", () => {
			const action = setError(ERROR);
			const state = reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				error: ERROR,
			});
		});

		it("clear", () => {
			const action = clear();
			const state = reducer(initialState, action);
			expect(state).toEqual(initialState);
		});
	});
});
