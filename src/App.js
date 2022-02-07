import "./App.css";
import React, { useState, useEffect } from "react";
import Feed from "./components/Feed";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import { auth, firestore } from "./firebase";
import * as ROUTES from "./routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        let postsRef = firestore.collection("posts").onSnapshot((snapshot) => {
            setPosts(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });
    }, []);
    return (
        <div className="App">
            <BrowserRouter>
                {/* Show header only if user == true */}
                <Header />
                <Routes>
                    <Route exact path="login" element={<LogIn />}></Route>
                    <Route exact path="signup" element={<SignUp />}></Route>
                    <Route exact path="/" element={<Feed posts={posts} />}></Route>
                    <Route exact path="profile" element={<Profile />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
