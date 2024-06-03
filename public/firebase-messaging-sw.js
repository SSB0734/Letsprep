importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// const FIREBASE_CONFIG = {
//     apiKey: "AIzaSyAQ3soZGdopFKY85H7_62GAOPvhdFgmv6c",
//     authDomain: "cutq-sid.firebaseapp.com",
//     projectId: "cutq-sid",
//     storageBucket: "cutq-sid.appspot.com",
//     messagingSenderId: "446737643551",
//     appId: "1:446737643551:web:d4aac1237ab4a60ce13d2a",
//     measurementId: "G-PSWDTBTYDL"
// };

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyA3-Rq6FV56siMHvCuxnfaYjv5dn-kEG1U",
    authDomain: "letsprep-a3d49.firebaseapp.com",
    projectId: "letsprep-a3d49",
    storageBucket: "letsprep-a3d49.appspot.com",
    messagingSenderId: "279759060273",
    appId: "1:279759060273:web:10a5abadd7dcf373c78410",
    measurementId: "G-X5Q79RJ2HF"
};

firebase.initializeApp(FIREBASE_CONFIG);

// const messaging = firebase.messaging();
firebase.messaging.isSupported() && firebase.messaging()


// messaging?.onBackgroundMessage(function (payload) {
//     console.log(payload);
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         click_action: payload?.data?.click_action,
//         data: { url: payload.data.click_action },
//         actions: [{ action: "open_url", title: "Read Now" }]
//     };
//     return self.registration.showNotification(notificationTitle, notificationOptions);
// });
