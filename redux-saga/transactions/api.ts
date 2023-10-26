import { db } from "@/api";
import firebase from "firebase";
import { Transaction } from "./slice";

export interface ResponceTransaction {
	uid: string;
	type: string;
	date: string;
	comment: string;
	value: number;
}

interface TransactionsDoc {
	id: string;
	data(): ResponceTransaction;
}

export const getTransactions = (uid: string): Promise<Transaction[]> => {
	return db
		.collection("transactions")
		.where("uid", "==", uid)
		.get()
		.then((snapshot: firebase.firestore.DocumentData) => {
			const items = snapshot.docs
				.map((doc: TransactionsDoc) => {
					const { uid, type, date, comment, value } = doc.data();
					return {
						id: doc.id,
						uid,
						type: type || "Прочее",
						date: date ? new Date(date) : new Date(),
						comment: comment || "",
						value: isNaN(Number(value)) ? 0 : Number(value),
					};
				})
				.sort(
					(a: Transaction, b: Transaction) => Number(a.date) - Number(b.date)
				);
			return items;
		});
};

export const delTransaction = (id: string): Promise<Transaction[]> => {
	return db
		.collection("transactions")
		.doc(id)
		.delete()
		.then(() => "ok");
};
