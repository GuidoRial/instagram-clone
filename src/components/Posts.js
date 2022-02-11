import React from "react";
import Post from "./Post";
import "./Posts.css";

function Posts({ user, activeUser }) {
    return (
        <div className="posts">
            {/*feedPhotos.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    username={post.displayName}
                    img={post.imageSrc}
                    caption={post.caption}
                    userId={post.userId}
                />
            ))*/}
        </div>
    );
}

export default Posts;
