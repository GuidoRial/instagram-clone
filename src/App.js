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
    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [feedPhotos, setFeedPhotos] = useState(null);

    async function getUserByUserId(userId) {
        const result = await firestore
            .collection()
            .where("userId", "==", userId)
            .get();
        const user = result.docs.map((item) => ({
            ...item.data(),
            docId: item.id,
        }));

        return user;
    }

    const getFeedPhotos = async (following) => {
        const result = await firestore.collection("photos").get();
        let filteredResult = result.docs
            .map((photo) => ({
                ...photo.data(),
                docId: photo.id,
            }))
            .filter((photo) => following.includes(photo.userId));

        return filteredResult;
        //At this point result returns an array of photos from people I follow
    };

    /*
    async function getFeedPhotos(userId, following) {
        const result = await firestore
            .collection("photos")
            .where("userId", "in", following)
            .get();

        const userFollowedPhotos = result.docs.map((photo) => ({
            ...photo.data(),
            docId: photo.id,
        }));

        console.log(userFollowedPhotos, "userFollowedPhotos");

        const photosWithUserDetails = await Promise.all(
            userFollowedPhotos.map(async (photo) => {
                let userLikedPhoto = false;
                if (photo.likes.includes(userId)) {
                    userLikedPhoto = true;
                }
                const user = await getUserByUserId(photo.userId);

                const { username } = user[0];

                return { username, ...photo, userLikedPhoto };
            })
        );

        return photosWithUserDetails;
    }
*/
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
                //I could make it so that description and profile picture is part of activeUser in the future

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

    useEffect(() => {
        async function getFeed() {
            const response = await getFeedPhotos(activeUser.following);

            setFeedPhotos(response);
        }

        if (activeUser) getFeed()
    }, [activeUser.userId]);


    console.log(feedPhotos);
    /*
    useEffect(() => {
        const getPhotosArray = async () => {
            const response = await getFeedPhotos(activeUser.following);
            setFeedPhotos(response);
        };

        if (activeUser) {
            let result = getFeedPhotos(activeUser.following);
            setFeedPhotos(result);
        }
    }, [user]);

    useEffect(() => {
        async function getTimelinePhotos() {
            const [{ following }] = await getUserByUserId(activeUser.userId);
            let followedUserPhotos = [];

            if (following.length > 0) {
                followedUserPhotos = await getFeedPhotos(
                    activeUser.userId,
                    following
                );
            }
        }

        getTimelinePhotos();
    }, []);
*/
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
                                    <Header
                                        user={user}
                                        activeUser={activeUser}
                                    />
                                    <Feed user={user} activeUser={activeUser} />
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
                                <Header user={user} activeUser={activeUser} />
                                <Profile user={user} activeUser={activeUser} />
                            </>
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
