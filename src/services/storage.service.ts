import { storage, auth } from 'firebase.config';
import { ref, uploadBytes } from 'firebase/storage';
import { User } from 'firebase/auth';

export default class StorageService {
	static async uploadAvatar(avatar: Blob): Promise<void> {
		const user: User | null = auth.currentUser;
		const storageRef = ref(storage, `avatars/${user?.uid}`);
		await uploadBytes(storageRef, avatar);
	}
}
