import React, { useEffect, useState } from "react";
import faker from "@faker-js/faker";
import Miniprofile from "./Miniprofile";

function Suggestions() {
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
                        className="profile-picture mini-profile-picture" src="https://lh3.googleusercontent.com/ogw/ADea4I5HaEHIjUpA_xJBph5dE9POzh0l_z62cJ5IACM6WVY=s83-c-mo"
                        alt="user-avatar"
                    />
                    <div className="user-data-container">
                        <p className="username">gui2rial</p>
                        <p className="fullname">Guido Rial</p>
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
