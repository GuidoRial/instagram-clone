import React from "react";
import Post from "./Post";
import "./Posts.css";

function Posts({ posts }) {
    //It returns an object with an id and a key called post so I have to access it this way
    //wtf did I do wrong?
    return (
        <div className="posts">
            {posts.map((post) => (
                <Post
                    key={post.id}
                    username={post.post.username}
                    img={post.post.imageUrl}
                    caption={post.post.caption}
                />
            ))}
        </div>
    );
}

export default Posts;
