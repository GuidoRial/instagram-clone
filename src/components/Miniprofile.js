import React from "react";

function Miniprofile({ img, username }) {
    return (
        <div className="suggestion">
            <div className="suggestion-image-and-username">
                <img
                    className="profile-picture suggestion-profile-picture"
                    src={img}
                    alt="user-avatar"
                />
                <p>{username}</p>
            </div>

            <button className="log-out-button">Follow</button>
        </div>
    );
}

export default Miniprofile;
