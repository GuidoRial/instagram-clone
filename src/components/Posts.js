import React from "react";
import Post from "./Post";
import "./Posts.css";
import {sleep} from "../aux"

function Posts({ user, activeUser, feedPhotos }) {

    return (
        <div className="posts">
            {feedPhotos.map((post) => (
                <Post
                    key={post.docId}
                    id={post.docId}
                    username={post.displayName}
                    img={post.imageSrc}
                    caption={post.caption}
                    userId={post.userId}
                    likes={post.likes}
                />
            ))}
        </div>
    );
}

export default Posts;
