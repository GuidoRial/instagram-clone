import "./App.css";
import React, { useState, useEffect } from "react";
import Feed from "./components/Feed";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import { firestore, authService } from "./firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    const [posts, setPosts] = useState([]);
    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");

    //get posts
    useEffect(() => {
        let postsRef = firestore
            .collection("posts")
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                setPosts(
                    snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
            });
    }, []);
    //get posts

    const [user, setUser] = useState(null); //The user that comes from auth
    const [activeUser, setActiveUser] = useState({}); //The actual object I want to manipulate
    //Both of these share the same uid so I have to use user to get activeUser from collections

    useEffect(() => {
        const unsuscribe = authService.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                //User has logged in
                await setUser(authUser);
                //At this point user is correct and user.uid returns the user id from auth
                const result = await firestore
                    .collection("users")
                    .where("userId", "==", user.uid)
                    .get();

                //Now I have a collection of documents that share the uid (only 1)

                const [userObject] = result.docs.map((item) => ({
                    ...item.data(),
                    docId: item.id,
                }));

                //I create an objet out of it and add the doc.id (which it didn't previously have)

                setActiveUser(userObject);


                if (authUser.displayName) {
                    //Don't update username
                } else {
                    //If I just created someone
                    return authUser.updateProfile({
                        displayName: userName,
                        photoURL:
                            "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png",
                    });
                }
            } else {
                //User is logged out
                setUser(null);
                setActiveUser({});
            }

            return () => {
                unsuscribe();
            };
        });
    }, [user]);
                console.log(activeUser);
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {/* if there isn't a user make me log in, else show me my feed */}
                    {!user ? (
                        <Route exact path="/" element={<LogIn />}></Route>
                    ) : (
                        <Route
                            exact
                            path="/"
                            element={
                                <>
                                    <Header user={user} />
                                    <Feed posts={posts} user={user} />
                                </>
                            }
                        ></Route>
                    )}
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
                                <Header user={user} />
                                <Profile user={user} />
                            </>
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
