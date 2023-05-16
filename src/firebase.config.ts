import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import {getMessaging, MessagePayload} from "firebase/messaging";
import { initializeFirestore,
  CACHE_SIZE_UNLIMITED,
  enableIndexedDbPersistence } from "firebase/firestore";

import { getToken, onMessage } from "firebase/messaging";
import { getStorage } from "firebase/storage";
import React from "react";

const apiKey = process.env.REACT_APP_API_KEY_FIREBASE;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN_FIREBASE;
const databaseURL = process.env.REACT_APP_DATABASE_URL_FIREBASE;
const projectId = process.env.REACT_APP_PROJECT_ID_FIREBASE;
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET_FIREBASE;
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID_FIREBASE;
const appId = process.env.REACT_APP_APP_ID_FIREBASE;
const measurementId = process.env.REACT_APP_MEASUREMENT_ID_FIREBASE;
const vapidKey = process.env.REACT_APP_VAPID_KEY;

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
    .then(() => console.log("indexing data enabled"))
    .catch(error => console.log(error));

export const getMessagingToken = (setMessagingToken: React.Dispatch<React.SetStateAction<boolean>>) => {
  return getToken(messaging, {vapidKey}).then(currentToken => {
    if (currentToken) {
      setMessagingToken(true);
    }
    else {
      setMessagingToken(false);
      console.log("No registration token");
    }
  })
}

export const onMessageListener = (): Promise<MessagePayload> => {
    return new Promise(resolve => {
      onMessage(messaging,  payload => {
        resolve(payload);
      })
    });
}
