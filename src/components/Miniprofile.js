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
                    <img
                        className="profile-picture suggestion-profile-picture"
                        src={profilePicture}
                        alt="user-avatar"
                    />
                </Link>
                <Link to={`/profile/${username}`} style={linkStyle}>
                    <p>{username}</p>
                </Link>
            </div>

            <button className="log-out-button">Follow</button>
        </div>
    ) : null;
}

export default Miniprofile;
