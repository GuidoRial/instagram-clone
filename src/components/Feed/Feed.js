import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Posts from "./Posts";
import Suggestions from "./Suggestions";

function Feed({ feedPhotos, user, activeUser }) {
    let navigate = useNavigate();

    useEffect(() => {
        if (activeUser) {
            navigate("/");
        } else {
            navigate("/login");
        }
    }, [activeUser.userId]);

    return (
        <div className="main">
            <div className="left-container">
                <Posts feedPhotos={feedPhotos} activeUser={activeUser} />
            </div>
            <Suggestions user={user} activeUser={activeUser} />
        </div>
    );
}

export default Feed;
