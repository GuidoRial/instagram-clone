import "./App.css";
import React, { useState, useEffect } from "react";
import Feed from "./components/Feed/Feed";
import Header from "./components/Header/Header";
import LogIn from "./components/LogIn/LogIn";
import Profile from "./components/Profile/Profile";
import SignUp from "./components/SignUp/SignUp";
import { firestore, authService } from "./firebase";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getFeedPhotos } from "./aux";

function App() {
    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [feedPhotos, setFeedPhotos] = useState([]);
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
                //Now I have the document that share the same uid
                const [userObject] = result.docs.map((item) => ({
                    ...item.data(),
                    docId: item.id,
                }));
                //I create an object out of it and add the doc.id (which it didn't previously have)
                setActiveUser(userObject);

                if (!authUser.displayName) {
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

    useEffect(() => {
        async function getFeed() {
            const response = await getFeedPhotos(activeUser.following);
            setFeedPhotos(response);
        }

        if (activeUser) getFeed();
    }, [activeUser]);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {!user ? (
                        <Route
                            exact
                            path="/"
                            element={<LogIn activeUser={activeUser} />}
                        ></Route>
                    ) : (
                        <Route
                            exact
                            path="/"
                            element={
                                <>
                                    <Header
                                        user={user}
                                        activeUser={activeUser}
                                    />
                                    <Feed
                                        feedPhotos={feedPhotos}
                                        user={user}
                                        activeUser={activeUser}
                                    />
                                </>
                            }
                        ></Route>
                    )}

                    <Route
                        exact
                        path="profile/:username"
                        element={
                            <>
                                <Header user={user} activeUser={activeUser} />
                                <Profile
                                    user={user}
                                    activeUser={activeUser}
                                    animate={true}
                                />
                            </>
                        }
                    ></Route>

                    <Route
                        exact
                        path="/signup"
                        element={
                            <SignUp
                                userName={userName}
                                setUserName={setUserName}
                                fullName={fullName}
                                setFullName={setFullName}
                                activeUser={activeUser}
                            />
                        }
                    ></Route>
                    <Route
                        path="*"
                        element={<Navigate to={activeUser ? "/" : "/login"} />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
