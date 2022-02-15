import React, { useEffect, useState } from "react";
import {
    clearAllInputs,

    linkStyle,
    modalPostStyle,
    profilePhotosStyle,
    profilePhotosStyleOnHover,
} from "../aux";
import "./Profile.css";
import { modalStyle } from "../aux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { firestore } from "../firebase";
import { Avatar, Divider, Link } from "@mui/material";

import uniqid from "uniqid";
import { arrayUnion } from "firebase/firestore";

function UserProfilePhoto({
    src,
    amountOfLikes,
    amountOfComments,
    photo,
    activeUser,
}) {
    const [hoverStatus, setHoverStatus] = useState(false);
    const [postModal, setPostModal] = useState(false);

    const handleOpen = () => setPostModal(true);
    const handleClose = () => setPostModal(false);

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

        getPostOwner(photo.userId);
    }, []);

    const [databaseComments, setDatabaseComments] = useState(photo.comments);
    const [newComment, setNewComment] = useState("");

    const handleAddComment = (e) => {
        e.preventDefault();
        setDatabaseComments([...photo.comments, newComment]);
        setNewComment("");
        clearAllInputs();

        return firestore
            .collection("photos")
            .doc(photo.docId)
            .update({ comments: arrayUnion(newComment) });
    };

    return (
        <>
            <Modal
                open={postModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalPostStyle}>
                    <img
                        src={photo.imageSrc}
                        alt="post"
                        style={{
                            width: "60%",
                            height: "95%",
                            objectFit: "cover",
                            borderRadius: "5px",
                        }}
                    />

                    <div
                        style={{
                            width: "40%",
                            height: "95%",
                            padding: "10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                            }}
                        >
                            <Avatar src={postOwner.profilePicture} />
                            <span style={{ fontWeight: "700" }}>
                                {postOwner.username}
                            </span>
                        </div>
                        <Divider />
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                            }}
                        >
                            <Avatar src={postOwner.profilePicture} />
                            <span style={{ fontWeight: "700" }}>
                                {postOwner.username}
                            </span>
                            <p>{photo.caption}</p>
                        </div>
                        <div>
                            {databaseComments.map((comment) => (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                    }}
                                    key={uniqid()}
                                >
                                    <Link
                                        to={`/profile/${comment.displayName}`}
                                        style={linkStyle}
                                    >
                                        <span
                                            style={{
                                                marginRight: "5px",
                                                cursor: "pointer",
                                                marginTop: "7px",
                                                marginBottom: "5px",
                                            }}
                                        >
                                            {comment.displayName}
                                        </span>
                                    </Link>
                                    <p>{comment.comment}</p>
                                </div>
                            ))}
                        </div>
                        <Divider />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <i className="fas fa-heart interaction-icons" />
                            <i className="fas fa-bookmark interaction-icons" />
                        </div>
                        <div>
                            {photo.likes.length === 1 ? (
                                <p>{photo.likes.length} like</p>
                            ) : (
                                <p>{photo.likes.length} likes </p>
                            )}
                        </div>
                        <div>
                            {" "}
                            <form
                                className="comment-form"
                                onSubmit={handleAddComment}
                            >
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    onChange={(e) =>
                                        setNewComment({
                                            displayName: activeUser.username,
                                            comment: e.target.value,
                                        })
                                    }
                                />
                                <button
                                    className="post-button"
                                    style={{
                                        opacity:
                                            newComment.length === 0
                                                ? "0.5"
                                                : "1",
                                    }}
                                    disabled={newComment.length === 0}
                                >
                                    Post
                                </button>
                            </form>
                        </div>
                    </div>
                </Box>
            </Modal>
            <div
                className="photo-container"
                onMouseOver={() => setHoverStatus(true)}
                onMouseOut={() => setHoverStatus(false)}
            >
                <img
                    src={src}
                    alt="uploaded by user"
                    className="profile-photos"
                />
                <div
                    onClick={() => handleOpen()}
                    style={
                        hoverStatus
                            ? profilePhotosStyleOnHover
                            : profilePhotosStyle
                    }
                >
                    {amountOfComments >= 0 && amountOfLikes >= 0 ? (
                        <>
                            <p>
                                <i className="fas fa-heart" /> {amountOfLikes}
                            </p>
                            <p>
                                <i className="fas fa-comment" />{" "}
                                {amountOfComments}
                            </p>
                        </>
                    ) : (
                        <p>loading...</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserProfilePhoto;
