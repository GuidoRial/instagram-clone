import React, { useEffect, useState } from "react";
import Miniprofile from "./Miniprofile";
import "./Suggestions.css";
import { Link, Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { authService, firestore } from "../firebase";
import { Avatar } from "@mui/material";
import { linkStyle } from "../aux";

function Suggestions({ user, activeUser }) {
    const [suggestions, setSuggestions] = useState([]);

    const handleLogOut = async () => {
        try {
            signOut(authService);
            await Navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    async function getSuggestedProfiles(userId, following) {
        const result = await firestore.collection("users").limit(5).get();
        return result.docs
            .map((user) => ({ ...user.data(), docId: user.id }))
            .filter(
                (profile) =>
                    profile.userId !== userId &&
                    !following.includes(profile.userId)
            );
    }

    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(
                activeUser.userId,
                activeUser.following
            );

            setSuggestions(response);
        }
        if (activeUser.userId) {
            suggestedProfiles(activeUser.userId, activeUser.following);
        }
    }, [activeUser.userId]);

    return (
        <div className="suggestions">
            <div className="user-mini-profile">
                <div className="avatar-and-username-miniprofile">
                    <Link to="/profile" style={linkStyle}>
                        <img
                            src={activeUser.profilePicture}
                            style={{
                                width: "64px",
                                height: "64px",
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                            alt="user-profile"
                        />
                    </Link>
                    <div className="user-data-container">
                        <Link to="/profile" style={linkStyle}>
                            <p className="username">{activeUser.username}</p>
                        </Link>
                    </div>
                </div>
                <div>
                    <button className="log-out-button" onClick={handleLogOut}>
                        Log Out
                    </button>
                </div>
            </div>

            <div>
                <p className="suggestions-for-you">Suggestions For You</p>
            </div>
            <div className="mini-profile-container">
                {suggestions.map((profile) => (
                    <Miniprofile
                        key={profile.docId}
                        suggestedProfileDocId={profile.docId}
                        profilePicture={profile.profilePicture}
                        username={profile.username}
                        profileId={profile.userId}
                        userId={activeUser.userId}
                        loggedInUserDocId={activeUser.docId}
                    />
                ))}
            </div>
        </div>
    );
}

export default Suggestions;
