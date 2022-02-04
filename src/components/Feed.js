import React from "react";
import Posts from "./Posts";
import Stories from "./Stories";

function Feed() {
    return (
        <main>
            <Stories />
            <Posts/>
        </main>
    );
}

export default Feed;
