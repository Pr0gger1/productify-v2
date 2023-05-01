import { storage, auth } from '../firebase.config';
import { ref, uploadBytes } from 'firebase/storage';

export default class StorageService {
    static async uploadAvatar(avatar = null) {
        const storageRef = ref(storage, `avatars/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, avatar);
    }
}