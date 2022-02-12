import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { linkStyle } from "../aux";
import { firestore } from "../firebase";
import Interactions from "./Interactions";

function Post({ activeUser, id, username, img, caption, userId, likes, saved }) {
    const [postOwner, setPostOwner] = useState({});

    useEffect(() => {
        const getPostOwner = async (userId) => {
            const result = await firestore
                .collection("users")
                .where("userId", "==", userId)
                .get();

            const [postOwnerObject] = result.docs.map((item) => ({
                ...item.data(),
                docId: item.id,
            }));

            setPostOwner(postOwnerObject);
        };

        getPostOwner(userId);
    }, []);

    //console.log(postOwner);

    return (
        <div className="post" key={id}>
            <div className="post-header">
                <div className="user-and-image">
                    <Link to={`/profile/${username}`} style={linkStyle}>
                        <img
                            className="post-user-avatar"
                            alt="user-avatar"
                            src={postOwner.profilePicture}
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                        />
                    </Link>
                    <Link to={`/profile/${username}`} style={linkStyle}>
                        <p>{postOwner.username}</p>
                    </Link>
                </div>
                <div></div>
            </div>
            <div className="post-img-container">
                <img className="post-img" src={img} alt="post" />
            </div>
            <div className="post-footer">

                <Interactions
                    likes={likes}
                    docId={id}
                    activeUser={activeUser}
                    saved={saved}
                />

                <p className="user-and-caption">
                    <span>{postOwner.username}</span> {caption}
                </p>

                <form className="comment-form">
                    <i className="far fa-smile-wink" />
                    <input type="text" placeholder="Add a comment..." />
                    <button className="post-button">Post</button>
                </form>
            </div>
        </div>
    );
}

export default Post;
