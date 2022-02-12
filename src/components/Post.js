import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";

function Post({ id, username, img, caption, userId, likes }) {
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

        getPostOwner(userId)
    }, []);

    console.log(postOwner)
    return (
        <div className="post" key={id}>
            <div className="post-header">
                <div className="user-and-image">
                    <Avatar /* get avatar from userId */
                        className="post-user-avatar"
                        alt="user-avatar"
                        src={postOwner.profilePicture}
                        style={{ width: "30px", height: "30px" }}
                    />
                    <p>{postOwner.username}</p>
                </div>
                <div>
                    <i className="fas fa-ellipsis-h" />
                </div>
            </div>
            <div className="post-img-container">
                <img className="post-img" src={img} alt="post" />
            </div>
            <div className="post-footer">
                <div className="interactions">
                    <div className="left">
                        <i className="far fa-heart interaction-icons" />
                        <i className="far fa-comment interaction-icons" />
                        <i className="fas fa-paper-plane interaction-icons" />
                    </div>
                    <div className="right">
                        <i className="far fa-bookmark interaction-icons" />
                    </div>
                </div>
                <div className="amount-of-likes">{likes.length} likes</div>
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
