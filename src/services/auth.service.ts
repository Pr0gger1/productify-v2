import { auth, db } from '../firebase.config';
import { signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signInWithPopup, GoogleAuthProvider,
	sendEmailVerification, getAuth,
	reauthenticateWithCredential,
	EmailAuthProvider, User, Auth, UserCredential
} from 'firebase/auth';

import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { UserService } from './user.service';
import {IUserDataObject} from 'types/User';


export class AuthService {
	static async createUserCollection(userId: string): Promise<void> {
		const userTasks = await getDoc(doc(db, 'tasks', userId));
		if (!userTasks.exists())
			await setDoc(doc(db, 'tasks', userId), {
				taskData: [],
				taskGroups: []
			});
	}
	static async login(email: string, password: string): Promise<User | null> {
		return signInWithEmailAndPassword(auth, email, password)
			.then((creds: UserCredential): User | null => {
				return creds.user ?? null;
			})
			.catch(error => { throw error; });
	}

	static async register(email: string, password: string, username: string): Promise<IUserDataObject | null> {
		return createUserWithEmailAndPassword(auth, email, password)
			.then(async (creds: UserCredential) => {
				if (creds.user) {
					const userId: string = creds.user.uid;
					await UserService.updateUser(creds.user, username);

					sendEmailVerification(creds.user)
						.then(() => console.log('Email verification sent!'))
						.catch(error => console.log(error));

					await AuthService.createUserCollection(userId);

					const user: IUserDataObject = {userData: creds.user};
					return user;
				}
				return null;
			})
			.catch(error => { throw error; });
	}

	static async loginWithGoogle(): Promise<User | null> {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider)
			.then(async (result: UserCredential) => {
				if (result.user) {
					const user: User = result.user;
					await AuthService.createUserCollection(result.user.uid);
					return user;
				}
				return null;
				// const credential = GoogleAuthProvider.credentialFromResult(result);
				// const token = credential.accessToken;
			})
			.catch(error => { throw error; });
	}

	static async deleteUser(password: string) {
		const auth: Auth = getAuth();
		const user: User | null = auth.currentUser;
		let credential;

		if (user) {
			if (typeof user.email === 'string') {
				credential = EmailAuthProvider.credential(user.email, password);
			}
			try {
				if (credential) await reauthenticateWithCredential(user, credential);

				await Promise.all([
					await deleteDoc(doc(db, 'tasks', user.uid)),
					user.delete()
				]);

				const userData: IUserDataObject = {userData: null};

				return userData;
			}
			catch (error) {
				const userData: IUserDataObject = {userData: null};
				return userData;
			}
		}
		return {userData: null};
	}
}