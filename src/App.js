import "./App.css";
import React, { useState, useEffect } from "react";
import Feed from "./components/Feed";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import { firestore, authService } from "./firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";

function App() {
    const [user] = useAuthState(authService);

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        let postsRef = firestore.collection("posts").onSnapshot((snapshot) => {
            setPosts(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });
    }, []);

    /* if the user isn't loged in show Log In and don't show header, if he is send it to / and show header */
    return (
        <div className="App">
            <BrowserRouter>
                {/* Show header only if user == true */}

                <Routes>
                    <Route exact path="login" element={<LogIn />}></Route>
                    <Route exact path="signup" element={<SignUp />}></Route>
                    <Route
                        exact
                        path="/"
                        element={
                            <>
                                <Header />
                                <Feed posts={posts} />
                            </>
                        }
                    ></Route>
                    <Route
                        exact
                        path="profile"
                        element={
                            <>
                                <Header />
                                <Profile />
                            </>
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
