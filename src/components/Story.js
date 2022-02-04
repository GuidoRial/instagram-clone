import React from "react";

function Story({ username, img }) {
    return (
        <div className="story">
            <img src={img} alt="avatar" className="story-avatar" />
            <p className="story-username">{username}</p>
        </div>
    );
}

export default Story;
