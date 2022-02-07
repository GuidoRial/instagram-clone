import "./App.css";
import React, { useState, useEffect } from "react";
import Feed from "./components/Feed";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import { auth, firestore } from "./firebase";

function App() {
    const [posts, setPosts] = useState([]);
console.log(posts)
    useEffect(() => {
        let postsRef = firestore.collection("posts").onSnapshot((snapshot) => {
            setPosts(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });
    }, []);
    return (
        <div className="App">
            {/*<SignUp/>*/}
            <Header />
            <Feed posts={posts} />
            {/* <Profile /> */}
        </div>
    );
}

export default App;
