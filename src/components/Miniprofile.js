import { Avatar } from "@mui/material";
import { arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";
import firebase from "firebase/app";
import {linkStyle} from "../aux"

function Miniprofile({
    profilePicture,
    username,
    suggestedProfileDocId,
    profileId,
    userId,
    loggedInUserDocId,
}) {

    const [followed, setFollowed] = useState(false);

    async function updateLoggedInUserFollowingArray(
        loggedInUserDocId,
        profileId,
        isFollowingProfile
    ) {
        const userDocRef = doc(firestore, "users", loggedInUserDocId);
        await updateDoc(userDocRef, {
            following: isFollowingProfile
                ? arrayRemove(profileId)
                : arrayUnion(profileId),
        });
    }

    async function updateSuggestedUserFollowersArray(
        suggestedProfileDocId,
        userId,
        isFollowingProfile
    ) {
        const userDocRef = doc(firestore, "users", suggestedProfileDocId);
        await updateDoc(userDocRef, {
            followers: isFollowingProfile
                ? arrayRemove(userId)
                : arrayUnion(userId),
        });
    }

    async function handleFollowUser() {
        setFollowed(true);
        await updateLoggedInUserFollowingArray(
            loggedInUserDocId,
            profileId,
            false
        );
        await updateSuggestedUserFollowersArray(
            suggestedProfileDocId,
            userId,
            false
        );
    }

    return !followed ? (
        <div className="suggestion">
            <div className="suggestion-image-and-username">
                <Link to={`/profile/${username}`} style={linkStyle}>
                    <Avatar src={profilePicture} alt="user-avatar" />
                </Link>
                <Link to={`/profile/${username}`} style={linkStyle}>
                    <p>{username}</p>
                </Link>
            </div>

            <button className="log-out-button" onClick={handleFollowUser}>
                Follow
            </button>
        </div>
    ) : null;
}

export default Miniprofile;
