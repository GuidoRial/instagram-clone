import React from "react";
import Post from "./Post";
import "./Posts.css";

function Posts({ posts }) {
    console.log(posts);
    return (
        <div className="posts">
            {posts.map((post) => (
                <Post
                    key={post.id}
                    username={post.username}
                    img={post.imageUrl}
                    caption={post.caption}
                />
            ))}
        </div>
    );
}

export default Posts;
