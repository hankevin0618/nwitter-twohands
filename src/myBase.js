import firebase from "firebase/app";
import "firebase/auth"; // https://firebase.google.com/docs/reference/js/firebase.auth.Auth
// 여기서 auth를 먼저 import 하라고 함


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);


export const authService = firebase.auth();