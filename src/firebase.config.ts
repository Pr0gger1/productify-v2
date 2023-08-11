import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import {getMessaging, MessagePayload} from 'firebase/messaging';
import { initializeFirestore,
	CACHE_SIZE_UNLIMITED,
	enableIndexedDbPersistence } from 'firebase/firestore';

import { getToken, onMessage } from 'firebase/messaging';
import { getStorage } from 'firebase/storage';

const appId: string | undefined = process.env.REACT_APP_APP_ID_FIREBASE;
const apiKey: string | undefined = process.env.REACT_APP_API_KEY_FIREBASE;
const vapidKey: string | undefined = process.env.REACT_APP_VAPID_KEY;
const projectId: string | undefined = process.env.REACT_APP_PROJECT_ID_FIREBASE;
const authDomain: string | undefined = process.env.REACT_APP_AUTH_DOMAIN_FIREBASE;
const databaseURL: string | undefined = process.env.REACT_APP_DATABASE_URL_FIREBASE;
const storageBucket: string | undefined = process.env.REACT_APP_STORAGE_BUCKET_FIREBASE;
const measurementId: string | undefined = process.env.REACT_APP_MEASUREMENT_ID_FIREBASE;
const messagingSenderId: string | undefined = process.env.REACT_APP_MESSAGING_SENDER_ID_FIREBASE;

export const firebaseConfig = {
	apiKey, authDomain,
	databaseURL, projectId,
	storageBucket, messagingSenderId,
	appId, measurementId
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);
export const db = initializeFirestore(app, {
	cacheSizeBytes: CACHE_SIZE_UNLIMITED
});

enableIndexedDbPersistence(db)
	.then(() => console.log('indexing data enabled'))
	.catch(error => console.log(error));

export const getMessagingToken = () => {
	return getToken(messaging, {vapidKey}).then(currentToken => {
		if (currentToken) return currentToken;
		else return null;
	});
};

export const onMessageListener = (): Promise<MessagePayload> => {
	return new Promise(resolve => {
		onMessage(messaging,  payload => {
			console.log(payload);
			resolve(payload);
		});
	});
};