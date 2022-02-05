import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
    apiKey: "AIzaSyC9ot2RsYoA6LndK9jPnERQZT_8qlhUCuw",
    authDomain: "instagram-clone-af38c.firebaseapp.com",
    projectId: "instagram-clone-af38c",
    storageBucket: "instagram-clone-af38c.appspot.com",
    messagingSenderId: "970620958679",
    appId: "1:970620958679:web:7e46ab6b91c95f7d8d3d92",
});

const auth = firebase.auth();
const firestore = firebase.firestore();


export { auth, firestore };
