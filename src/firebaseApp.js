import firebase from 'firebase';
import { UpdateFcmToken } from './Utils'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3-Rq6FV56siMHvCuxnfaYjv5dn-kEG1U",
  authDomain: "letsprep-a3d49.firebaseapp.com",
  projectId: "letsprep-a3d49",
  storageBucket: "letsprep-a3d49.appspot.com",
  messagingSenderId: "279759060273",
  appId: "1:279759060273:web:10a5abadd7dcf373c78410",
  measurementId: "G-X5Q79RJ2HF"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyAQ3soZGdopFKY85H7_62GAOPvhdFgmv6c",
//   authDomain: "cutq-sid.firebaseapp.com",
//   projectId: "cutq-sid",
//   storageBucket: "cutq-sid.appspot.com",
//   messagingSenderId: "446737643551",
//   appId: "1:446737643551:web:d4aac1237ab4a60ce13d2a",
//   measurementId: "G-PSWDTBTYDL"
// };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
// FCM

const messaging = firebase.messaging.isSupported()
  ? firebase.messaging()
  : null;

export const getFCMToken = () => {
  messaging
    ?.getToken(firebaseConfig)
    ?.then((currentToken) => {
      if (currentToken) {
        if (localStorage && localStorage.setItem) {
          localStorage.setItem('LETS_PREP_DEVICE_ID', currentToken);
          UpdateFcmToken(auth?.currentUser?.email)
        }
      }
    })
    .catch((err) => {
      console.log(err);
      return;
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging?.onMessage((payload) => {
      resolve(payload);
    });
  });

getFCMToken();

//FCM END

export default firebaseApp;