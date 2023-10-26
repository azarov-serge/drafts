import { initialState, DataStatus } from "./slice";
import { selectors } from "./selectors";
import { transactions, pie } from "@/mocks/transactions";

const {
	selectError,
	selectStatus,
	selectTransactionsAll,
	selectStart,
	selectEnd,
	selectTransactions,
	selectPieChartData,
} = selectors;

const ERROR = "ERROR";

describe("Transactions/Selectors", () => {
	it("selectError", () => {
		const mockSore = {
			transactions: {
				...initialState,
				error: ERROR,
			},
		};

		expect(selectError(mockSore)).toEqual(ERROR);
	});

	it("selectStatus", () => {
		const mockSore = {
			transactions: {
				...initialState,
				status: DataStatus.SUCCESSED,
			},
		};

		expect(selectStatus(mockSore)).toEqual(DataStatus.SUCCESSED);
	});

	it("selectTransactionsAll", () => {
		const mockSore = {
			transactions: {
				...initialState,
				transactions,
			},
		};

		expect(selectTransactionsAll(mockSore)).toEqual(transactions);
	});

	it("selectStart", () => {
		const mockSore = {
			transactions: {
				...initialState,
				start: transactions[0].date,
			},
		};

		expect(selectStart(mockSore)).toEqual(transactions[0].date);
	});

	it("selectEnd", () => {
		const mockSore = {
			transactions: {
				...initialState,
				end: transactions[0].date,
			},
		};

		expect(selectEnd(mockSore)).toEqual(transactions[0].date);
	});

	it("selectTransactions", () => {
		const mockSore = {
			transactions: {
				...initialState,
				start: transactions[0].date,
				end: transactions[3].date,
				transactions,
			},
		};

		expect(selectTransactions(mockSore)).toEqual(transactions.slice(0, 4));
	});

	it("selectTransactions/empty", () => {
		const mockSore = {
			transactions: {
				...initialState,
				start: new Date(),
				end: new Date(),
				transactions,
			},
		};

		expect(selectTransactions(mockSore)).toEqual([]);
	});

	it("selectPieChartData", () => {
		const mockSore = {
			transactions: {
				...initialState,
				start: transactions[0].date,
				end: transactions[transactions.length - 1].date,
				transactions,
			},
		};

		expect(selectPieChartData(mockSore)).toEqual(pie);
	});
});
