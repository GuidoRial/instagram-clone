import React, { useEffect, useState } from "react";
import faker from "@faker-js/faker";
import Miniprofile from "./Miniprofile";
import "./Suggestions.css";

function Suggestions({ user }) {
    console.log(user)
    const [suggestions, setSuggestions] = useState([]);

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
                    <img
                        className="profile-picture mini-profile-picture"
                        src={
                            user.photoURL ||
                            "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
                        }
                        alt="user-avatar"
                    />
                    <div className="user-data-container">
                        <p className="username">{user.displayName}</p>

                    </div>
                </div>
                <div>
                    <button className="log-out-button">Log Out</button>
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
