import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDvxhcjMTelwSZM7w-BH3L_8lID9eEYmII",
    authDomain: "gear-genie.firebaseapp.com",
    databaseURL: "https://gear-genie.firebaseio.com",
    projectId: "gear-genie",
    storageBucket: "gear-genie.appspot.com",
    messagingSenderId: "317502964367",
    appId: "1:317502964367:web:ada658cee4d4d6590926fa",
    measurementId: "G-KT56K4D51V"
};

firebase.initializeApp(firebaseConfig);
window['firebase'] = firebase;
export const firestoreDB = firebase.firestore();