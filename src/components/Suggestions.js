import React, { useEffect, useState } from "react";
import faker from "@faker-js/faker";
import Miniprofile from "./Miniprofile";
import "./Suggestions.css";
import { Link, Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { authService } from "../firebase";

function Suggestions({ user, activeUser }) {
    console.log(activeUser);
    const linkStyle = {
        textDecoration: "none",
    };

    const [suggestions, setSuggestions] = useState([]);

    const handleLogOut = async () => {
        try {
            signOut(authService);
            await Navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fakerProfiles = [...Array(5)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        }));

        setSuggestions(fakerProfiles);
    }, []);
    return (
        <div className="suggestions">
            <div className="user-mini-profile">
                <div className="avatar-and-username-miniprofile">
                    <Link to="/profile" style={linkStyle}>
                        <img
                            className="profile-picture mini-profile-picture"
                            src={activeUser.profilePicture}
                            alt="user-avatar"
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
                        key={profile.id}
                        img={profile.avatar}
                        username={profile.username}
                    />
                ))}
            </div>
        </div>
    );
}

export default Suggestions;
