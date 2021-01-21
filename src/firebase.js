import firebase from "firebase/app";

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