import firebase from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "이렇게키값이-들어있다_000000000",
    authDomain: "react-firebase-nwitter.firebaseapp.com",
    projectId: "react-firebase-nwitter",
    storageBucket: "react-firebase-nwitter.appspot.com",
    messagingSenderId: "00000000000",
    appId: "1:00000000000:web:42dfea9a2d400000000000",
    measurementId: "G-0000000000"
};

export default firebase.initializeApp(firebaseConfig);