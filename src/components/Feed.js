import React from "react";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

function Feed({ feedPhotos, user, activeUser }) {

    return (
        <div className="main">
            <div className="left-container">
                <Stories />
                <Posts feedPhotos={feedPhotos} activeUser={activeUser}/>
            </div>
            <Suggestions user={user} activeUser={activeUser} />
        </div>
    );
}

export default Feed;
