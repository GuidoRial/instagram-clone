import React from "react";
import Post from "./Post";
import "./Posts.css";

function Posts({ user, activeUser, feedPhotos }) {

    return (
        <div className="posts">
            {feedPhotos ? (
                feedPhotos.map((post) => (
                    <Post
                        key={post.docId}
                        id={post.docId}
                        username={post.displayName}
                        img={post.imageSrc}
                        caption={post.caption}
                        userId={post.userId}
                        likes={post.likes}
                        activeUser={activeUser}
                        saved={post.saved}
                        comments={post.comments}
                        dateCreated={post.dateCreated}
                    />
                ))
            ) : (
                <p>
                    You need to follow people to see their posts. Consider
                    following someone from your suggestions
                </p>
            )}
        </div>
    );
}

export default Posts;
