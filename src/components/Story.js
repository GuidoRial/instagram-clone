import React from "react";

function Story({ username, img }) {
    return (
        <div>
            <img src={img} alt="avatar" />
            <p>{username}</p>
        </div>
    );
}

export default Story;
