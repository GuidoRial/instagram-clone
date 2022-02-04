import React from "react";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

function Feed() {
    return (
        <main>
            <div className="left-container">
                <Stories />
                <Posts />
            </div>
            <Suggestions />
        </main>
    );
}

export default Feed;
