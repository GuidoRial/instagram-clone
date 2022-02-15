import React from "react";
import Posts from "./Posts";
import Suggestions from "./Suggestions";

function Feed({ feedPhotos, user, activeUser }) {

    return (
        <div className="main">
            <div className="left-container">
           
                <Posts feedPhotos={feedPhotos} activeUser={activeUser}/>
            </div>
            <Suggestions user={user} activeUser={activeUser} />
        </div>
    );
}

export default Feed;
