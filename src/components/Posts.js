import React from "react";
import Post from "./Post";
import "./Posts.css";

function Posts({ user, activeUser, feedPhotos }) {
    return (
        <div className="posts">
            {feedPhotos.length > 0 ? (
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
                    You need to follow people to see their posts. guidorial is
                    the web developer who created this clone, so looking for him
                    on your suggestions here on the right or in the search bar
                    up there may be a good place to start.
                </p>
            )}
        </div>
    );
}

export default Posts;
