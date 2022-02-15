import React, { useEffect, useState } from "react";
import {
    clearAllInputs,
    likeStyle,
    linkStyle,
    modalPostStyle,
    notLikeStyle,
    notLikeStyleHover,
    profilePhotosStyle,
    profilePhotosStyleOnHover,
} from "../aux";
import "./Profile.css";
import "./UserProfilePhoto.css";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { firestore } from "../firebase";
import { Avatar, Divider, Link } from "@mui/material";

import uniqid from "uniqid";
import { arrayRemove, arrayUnion } from "firebase/firestore";

function UserProfilePhoto({ src, amountOfComments, photo, activeUser }) {
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

    const [toggleLiked, setToggleLiked] = useState(false);
    const [toggleSaved, setToggleSaved] = useState(false);
    const [amountOfLikes, setAmountOfLikes] = useState(photo.likes.length);

    const handleToggleLiked = async (docId, userId) => {
        if (toggleLiked === false) {
            setToggleLiked(true);
            setAmountOfLikes(amountOfLikes + 1);
        } else {
            setToggleLiked(false);
            setAmountOfLikes(amountOfLikes - 1);
        }

        await firestore
            .collection("photos")
            .doc(docId)
            .update({
                likes: toggleLiked ? arrayRemove(userId) : arrayUnion(userId),
            });
    };

    const handleToggleSaved = async (docId, userId) => {
        if (toggleSaved === false) {
            setToggleSaved(true);
        } else {
            setToggleSaved(false);
        }

        await firestore
            .collection("photos")
            .doc(docId)
            .update({
                saved: toggleSaved ? arrayRemove(userId) : arrayUnion(userId),
            });
    };

    useState(async () => {
        let didILikeThisPhoto = photo.likes.includes(activeUser.userId);
        let didISaveThisPhoto = photo.saved.includes(activeUser.userId);
        didILikeThisPhoto && setToggleLiked(true);
        didISaveThisPhoto && setToggleSaved(true);
    }, []);

    return (
        <>
            <Modal
                open={postModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalPostStyle}>
                    <img src={photo.imageSrc} alt="post" id="postedPicture" />

                    <div className="interactive-section">
                        <div>
                            <div id="profilePictureHeader">
                                <Link
                                    to={`/profile/${postOwner.username}`}
                                    style={linkStyle}
                                >
                                    <Avatar src={postOwner.profilePicture} />{" "}
                                </Link>
                                <Link
                                    to={`/profile/${postOwner.username}`}
                                    style={linkStyle}
                                >
                                    <span style={{ fontWeight: "700" }}>
                                        {postOwner.username}
                                    </span>
                                </Link>
                            </div>
                            <Divider />
                            <div className="post-info">
                                <Avatar
                                    src={postOwner.profilePicture}
                                    style={{ cursor: "pointer" }}
                                />
                                <span
                                    style={{
                                        cursor: "pointer",
                                        fontWeight: "700",
                                    }}
                                >
                                    {postOwner.username}
                                </span>
                                <p
                                    style={{
                                        marginLeft: "10px",
                                        fontSize: "14px",
                                    }}
                                >
                                    {photo.caption}
                                </p>
                            </div>

                            {databaseComments.map((comment) => (
                                <div key={uniqid()} className="comment-section">
                                    {/* Remember to do the links for the user!!! */}
                                    <Link
                                        to={`/profile/${comment.displayName}`}
                                        style={linkStyle}
                                    >
                                        <span style={{ cursor: "pointer" }}>
                                            {comment.displayName}
                                        </span>
                                    </Link>
                                    <p
                                        style={{
                                            marginLeft: "10px",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {comment.comment}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div>
                            <Divider />
                            <div id="profileIcons">
                                {toggleLiked ? (
                                    <i
                                        className="fas fa-heart interaction-icons"
                                        onClick={() =>
                                            handleToggleLiked(
                                                photo.docId,
                                                activeUser.userId
                                            )
                                        }
                                        style={likeStyle}
                                    />
                                ) : (
                                    <i
                                        style={
                                            hoverStatus
                                                ? notLikeStyleHover
                                                : notLikeStyle
                                        }
                                        onMouseOver={() => setHoverStatus(true)}
                                        onMouseOut={() => setHoverStatus(false)}
                                        className="far fa-heart interaction-icons"
                                        onClick={() =>
                                            handleToggleLiked(
                                                photo.docId,
                                                activeUser.userId
                                            )
                                        }
                                    />
                                )}
                                {toggleSaved ? (
                                    <i
                                        className="fas fa-bookmark interaction-icons"
                                        onClick={() =>
                                            handleToggleSaved(
                                                photo.docId,
                                                activeUser.userId
                                            )
                                        }
                                    />
                                ) : (
                                    <i
                                        className="far fa-bookmark interaction-icons"
                                        onClick={() =>
                                            handleToggleSaved(
                                                photo.docId,
                                                activeUser.userId
                                            )
                                        }
                                    />
                                )}
                            </div>
                            {amountOfLikes === 1 ? (
                                <p style={{ fontWeight: "700", marginLeft: "10px" }}>
                                    {amountOfLikes} like
                                </p>
                            ) : (
                                <p style={{ fontWeight: "700", marginLeft: "10px" }}>
                                    {amountOfLikes} likes{" "}
                                </p>
                            )}

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
