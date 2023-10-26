import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";

export enum DataStatus {
	INITIALED = "INITIALED",
	LOADING = "LOADING",
	SENDING = "SENDING",
	SUCCESSED = "SUCCESSED",
	FAILED = "FAILED",
}

export interface Transaction {
	id: string;
	uid: string;
	type: string;
	date: Date;
	comment: string;
	value: number;
}

export interface State {
	transactions: Transaction[];
	start: Date;
	end: Date;
	status: DataStatus;
	error: string;
}

export const initialState: State = {
	transactions: [],
	status: DataStatus.INITIALED,
	start: new Date(),
	end: new Date(),
	error: "",
};

const getTransactions = createAction<string>("transactions/getTransactions");
const delTransaction = createAction<string>("transactions/delTransaction");

export const transactionsSlice = createSlice({
	name: "transactions",
	initialState,
	reducers: {
		setTransactions(state, { payload }: PayloadAction<Transaction[]>) {
			state.transactions = payload;
			state.error = "";
		},
		removeTransaction(state, { payload }: PayloadAction<string>) {
			state.transactions = state.transactions.filter(
				(item) => item.id !== payload
			);
		},
		setStartDate(state, { payload }: PayloadAction<Date>) {
			state.start = payload;
		},
		setEndDate(state, { payload }: PayloadAction<Date>) {
			state.end = payload;
		},
		setStatus(state, { payload }: PayloadAction<DataStatus>) {
			state.status = payload;
		},
		setError(state, { payload }: PayloadAction<string>) {
			state.error = payload;
		},
		clear(state) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			state = { ...initialState };
		},
	},
});

export const { reducer } = transactionsSlice;

export const actions = {
	getTransactions,
	delTransaction,
	...transactionsSlice.actions,
};
