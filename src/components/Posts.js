import React from "react";
import Post from "./Post";
import "./Posts.css";

function Posts({ posts, users }) {
    return (
        <div className="posts">
            {posts.map((post) => (
                <Post
                    key={post.id}
                    username={post.username}
                    img={post.imageUrl}
                    caption={post.caption}
                    profilePic={post.profilePic}
                />
            ))}
        </div>
    );
}

export default Posts;
