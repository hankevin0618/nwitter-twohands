import firebase from "firebase/app";
import "firebase/auth"; // https://firebase.google.com/docs/reference/js/firebase.auth.Auth
import "firebase/firestore"
import "firebase/storage"

// 여기서 auth를 먼저 import 하라고 함


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJ0yF1lB1O5gOAzTQgb6q7S-Sx-8l0ZMU",
    authDomain: "nwitter-twohands.firebaseapp.com",
    projectId: "nwitter-twohands",
    storageBucket: "nwitter-twohands.appspot.com",
    messagingSenderId: "873521844372",
    appId: "1:873521844372:web:63be0e0fcbaa7ae88a2481"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore()

// firebase.storage.Reference
// Represents a reference to a Google Cloud Storage object. Developers can upload, download, and delete objects, as well as get/set object metadata.

export const storageService = firebase.storage();