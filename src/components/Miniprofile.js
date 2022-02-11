import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Miniprofile({
    profilePicture,
    username,
    userDocId,
    profileId,
    userId,
}) {
    const linkStyle = {
        textDecoration: "none",
        color: "black",
    };
    const [followed, setFollowed] = useState(false);

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

            <button
                className="log-out-button"
                onClick={() => console.log("test")}
            >
                Follow
            </button>
        </div>
    ) : null;
}

export default Miniprofile;
