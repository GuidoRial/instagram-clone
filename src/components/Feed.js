import React from "react";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

function Feed({ posts, user, activeUser  }) {
    return (
        <div className="main">
            <div className="left-container">
                <Stories />
                <Posts posts={posts} />
            </div>
            <Suggestions user={user} activeUser={activeUser} />
        </div>
    );
}

export default Feed;
