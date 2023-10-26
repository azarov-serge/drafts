/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "@reduxjs/toolkit";
import { State as TransactionsState, Transaction } from "./slice";
import { State } from "@/redux/store";

type ChartItem = { [key: string]: number };

const selectSelf = (state: State) => state.transactions;

const selectError = createSelector(
	selectSelf,
	(state: TransactionsState) => state.error
);

const selectStatus = createSelector(
	selectSelf,
	(state: TransactionsState) => state.status
);

const selectTransactionsAll = createSelector(
	selectSelf,
	(state: TransactionsState) => state.transactions
);

const selectStart = createSelector(
	selectSelf,
	(state: TransactionsState) => state.start
);

const selectEnd = createSelector(
	selectSelf,
	(state: TransactionsState) => state.end
);

const selectTransactions = createSelector(
	selectTransactionsAll,
	selectStart,
	selectEnd,
	(transactions, start, end) =>
		transactions.filter((item) => item.date >= start && item.date <= end)
);

const selectPieChartData = createSelector(
	selectTransactions,
	(transactions) => {
		const data = transactions.reduce((acc: ChartItem, item: Transaction) => {
			if (acc[item.type]) {
				acc[item.type] = acc[item.type] + item.value;
			} else {
				acc[item.type] = item.value;
			}
			return acc;
		}, {});

		return {
			labels: Object.keys(data),
			values: Object.values(data),
		};
	}
);

export const selectors = {
	selectError,
	selectStatus,
	selectTransactionsAll,
	selectStart,
	selectEnd,
	selectTransactions,
	selectPieChartData,
};
