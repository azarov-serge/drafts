import firebase from "firebase/app";
import { auth } from "@/api/api";

/**
 * @description Зарегистрировать пользователя
 */
export const signUp = (
	email: string,
	password: string
): Promise<firebase.auth.UserCredential> => {
	return auth()
		.createUserWithEmailAndPassword(email, password)
		.catch((error) => error);
};

/**
 * @description Авторизовать пользователя
 */
export const signIn = (
	email: string,
	password: string
): Promise<firebase.auth.UserCredential> => {
	return auth()
		.signInWithEmailAndPassword(email, password)
		.catch((error) => error);
};

/**
 * @description Выйти из системы
 */
export const signOut = (): Promise<void> => auth().signOut();
