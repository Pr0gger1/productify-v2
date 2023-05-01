import { auth, db } from '../firebase.config';
import { signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup, GoogleAuthProvider,
    sendEmailVerification, getAuth,
    reauthenticateWithCredential,
    EmailAuthProvider
} from 'firebase/auth';

import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { UserService } from "./user.service";

export class AuthService {
    static async createUserCollection(userId) {
         const userTasks = await getDoc(doc(db, 'tasks', userId));
         if (!userTasks.exists())
            await setDoc(doc(db, 'tasks', userId), {
                taskData: [],
                taskGroups: []
            });
    }
    static async login(email, password) {
        await signInWithEmailAndPassword(auth, email, password)
            .then(creds => {
                if (creds.user) return creds.user;
            })
            .catch(error => { throw error });
    }

    static async register(email, password, username) {
        let response = null;

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async creds => {
                if (creds.user) {
                    const userId = creds.user.uid;
                    UserService.updateUser(creds.user, username);

                    sendEmailVerification(creds.user)
                        .then(() => console.log("Email verification sent!"))
                        .catch(error => console.log(error))

                    await AuthService.createUserCollection(
                        userId, username, creds.user.email
                    );

                    response = {userData: creds.user}
                }
            })
            .catch(error => { throw error });
        return response;
    }

    static async loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async result => {
                if (result.user) {
                    const user = result.user;
                    await AuthService.createUserCollection(
                        result.user.uid, user.displayName, user.email);

                    return result.user;
                }
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
            })
            .catch(error => { throw error });
    }

    static async deleteUser(password) {
      const auth = getAuth();
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, password);

      try {
          await reauthenticateWithCredential(user, credential)
          await Promise.all([
            await deleteDoc(doc(db, 'tasks', user.uid)),
            user.delete()
          ])

        return {userData: null};
      }
      catch (error) {
        throw error;
      }
    }

}