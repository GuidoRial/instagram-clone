import React, { useEffect, useState } from "react";
import faker from "@faker-js/faker";
import Story from "./Story";
import "./Stories.css"

function Stories() {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fakerProfiles = [...Array(20)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        }));

        setSuggestions(fakerProfiles);
    }, []);

    return (
        <div className="stories-container">
            {suggestions.map((profile) => (
                <Story
                    key={profile.id}
                    img={profile.avatar}
                    username={profile.username}
                />
            ))}
        </div>
    );
}

export default Stories;
