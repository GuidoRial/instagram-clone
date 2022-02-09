import "./App.css";
import React, { useState, useEffect } from "react";
import Feed from "./components/Feed";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import { firestore, authService, auth } from "./firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "firebase/compat/app";
import { updateProfile } from "firebase/auth";

function App() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");

    useEffect(() => {
        let postsRef = firestore.collection("posts").orderBy("createdAt").onSnapshot((snapshot) => {
            setPosts(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });
    }, []);
    useEffect(() => {
        const unsuscribe = authService.onAuthStateChanged((authUser) => {
            if (authUser) {
                //User has logged in
                console.log(authUser);
                setUser(authUser);
                if (authUser.displayName) {
                    //Don't update username
                } else {
                    //If I just created someone
                    return authUser.updateProfile({
                        displayName: userName,
                        fullName: fullName,
                    });
                }
            } else {
                //User is logged out
                setUser(null);
            }

            return () => {
                unsuscribe();
            };
        });
    }, [user]);

    /* if the user isn't loged in show Log In and don't show header, if he is send it to / and show header */
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {/* if there isn't a user make me log in, else show me my feed */}
                    {!user ? <Route exact path="/" element={<LogIn />}></Route> :
                    <Route
                        exact
                        path="/"
                        element={
                            <>
                                <Header user={user}/>
                                <Feed posts={posts} user={user}/>
                            </>
                        }
                    ></Route>}
                    <Route
                        exact
                        path="signup"
                        element={
                            <SignUp
                                userName={userName}
                                setUserName={setUserName}
                                fullName={fullName}
                                setFullName={setFullName}
                            />
                        }
                    ></Route>
                    <Route
                        exact
                        path="profile"
                        element={
                            <>
                                <Header />
                                <Profile user={user}/>
                            </>
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
