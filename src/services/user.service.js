import {updateProfile} from 'firebase/auth';
import {auth, storage} from '../firebase.config';

import {getDownloadURL, ref} from 'firebase/storage';

export class UserService {
    static async updateUser(userInstance, newUsername = null, newAvatar = null) {
        const newData = {};
        if (newUsername) newData.displayName = newUsername;
        if (newAvatar) {
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