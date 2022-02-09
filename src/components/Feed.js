import React from "react";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

function Feed({ posts, user }) {
    return (
        <div className="main">
            <div className="left-container">
                <Stories />
                <Posts posts={posts} />
            </div>
            <Suggestions />
        </div>
    );
}

export default Feed;
