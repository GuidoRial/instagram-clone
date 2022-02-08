import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

firebase.initializeApp({
    apiKey: "AIzaSyC9ot2RsYoA6LndK9jPnERQZT_8qlhUCuw",
    authDomain: "instagram-clone-af38c.firebaseapp.com",
    projectId: "instagram-clone-af38c",
    storageBucket: "instagram-clone-af38c.appspot.com",
    messagingSenderId: "970620958679",
    appId: "1:970620958679:web:7e46ab6b91c95f7d8d3d92",
});

const auth = getAuth();
const firestore = firebase.firestore();
const FirebaseContext = createContext(null);

export { auth, firestore, FirebaseContext };
