import {updateProfile} from "firebase/auth";
import {auth, storage} from "../firebase.config";

import {getDownloadURL, ref} from "firebase/storage";
import { User } from "firebase/auth";

interface INewData {
    displayName: string,
    photoURL: string
}

export class UserService {
    static async updateUser(userInstance: User, newUsername: string | null = null, newAvatar: File | null = null) {
        const newData: INewData = {displayName: "", photoURL: ""};
        if (newUsername) newData.displayName = newUsername;
        if (newAvatar && auth.currentUser) {
            const storageRef = ref(storage, `avatars/${auth.currentUser.uid}`);
            newData.photoURL = await getDownloadURL(storageRef);
        }

        console.log(newData);
        console.log(auth.currentUser)


        if (Object.keys(newData).length)
            return updateProfile(userInstance, {...newData})
                .then(() => {
                    return auth.currentUser;
                })
                .catch(error => {throw error});
        return auth.currentUser;
    }
}