import React from "react";
import Post from "./Post";
import "./Posts.css"

const posts = [
    {
        id: 1,
        username: "GuidoRial",
        userImg:
            "https://lh3.googleusercontent.com/ogw/ADea4I5HaEHIjUpA_xJBph5dE9POzh0l_z62cJ5IACM6WVY=s83-c-mo",
        img: "https://lh3.googleusercontent.com/ogw/ADea4I5HaEHIjUpA_xJBph5dE9POzh0l_z62cJ5IACM6WVY=s83-c-mo",
        caption: "hire me pls",
    },
    {
        id: 2,
        username: "uwuntu",
        userImg:
            "https://lh3.googleusercontent.com/ogw/ADea4I5HaEHIjUpA_xJBph5dE9POzh0l_z62cJ5IACM6WVY=s83-c-mo",
        img: "https://lh3.googleusercontent.com/ogw/ADea4I5HaEHIjUpA_xJBph5dE9POzh0l_z62cJ5IACM6WVY=s83-c-mo",
        caption: "hire @GuidoRial pls",
    },
];

function Posts() {
    return (
        <div className="posts">
            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    userImg={post.userImg}
                    img={post.img}
                    caption={post.caption}
                />
            ))}
        </div>
    );
}

export default Posts;
