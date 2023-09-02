import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import { getMessaging, MessagePayload } from 'firebase/messaging';
import {
	initializeFirestore,
	CACHE_SIZE_UNLIMITED,
	enableIndexedDbPersistence,
} from 'firebase/firestore';

import { getToken, onMessage } from 'firebase/messaging';
import { getStorage } from 'firebase/storage';
import { Logger } from '@/utils/Logger';

const appId: string | undefined = import.meta.env.VITE_APP_ID_FIREBASE;
const apiKey: string | undefined = import.meta.env.VITE_API_KEY_FIREBASE;
const vapidKey: string | undefined = import.meta.env.VITE_VAPID_KEY;
const projectId: string | undefined = import.meta.env.VITE_PROJECT_ID_FIREBASE;
const authDomain: string | undefined = import.meta.env
	.VITE_AUTH_DOMAIN_FIREBASE;
const databaseURL: string | undefined = import.meta.env
	.VITE_DATABASE_URL_FIREBASE;
const storageBucket: string | undefined = import.meta.env
	.VITE_STORAGE_BUCKET_FIREBASE;
const measurementId: string | undefined = import.meta.env
	.VITE_MEASUREMENT_ID_FIREBASE;
const messagingSenderId: string | undefined = import.meta.env
	.VITE_MESSAGING_SENDER_ID_FIREBASE;

export const firebaseConfig = {
	apiKey,
	authDomain,
	databaseURL,
	projectId,
	storageBucket,
	messagingSenderId,
	appId,
	measurementId,
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);
export const db = initializeFirestore(app, {
	cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

enableIndexedDbPersistence(db)
	.then(() => Logger.log('indexing data enabled'))
	.catch(error => Logger.log(error));

export const getMessagingToken = (): Promise<string | null> => {
	return getToken(messaging, { vapidKey }).then(currentToken => {
		if (currentToken) return currentToken;
		else return null;
	});
};

export const onMessageListener = (): Promise<MessagePayload> => {
	return new Promise(resolve => {
		onMessage(messaging, payload => {
			Logger.log(payload);
			resolve(payload);
		});
	});
};
