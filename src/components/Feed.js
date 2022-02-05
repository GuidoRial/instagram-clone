import React from "react";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

function Feed({posts}) {
    return (
        <main>
            <div className="left-container">
                <Stories />
                <Posts posts={posts}/>
            </div>
            <Suggestions />
        </main>
    );
}

export default Feed;
