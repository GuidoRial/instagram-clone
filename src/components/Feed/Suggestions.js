import React, { useEffect, useState } from "react";
import Miniprofile from "./Miniprofile";
import "./Suggestions.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { authService, firestore } from "../../firebase";
import { getSuggestedProfiles, linkStyle } from "../../aux";

function Suggestions({ user, activeUser }) {
    const [suggestions, setSuggestions] = useState([]);
    let navigate = useNavigate();

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

    const handleLogOut = async () => {
        try {
            signOut(authService);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="suggestions">
            <div className="user-mini-profile">
                <div className="avatar-and-username-miniprofile">
                    <Link
                        to={`/profile/${activeUser.username}`}
                        style={linkStyle}
                    >
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
                        <Link
                            to={`/profile/${activeUser.username}`}
                            style={linkStyle}
                        >
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
