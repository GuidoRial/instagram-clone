import React, { useState } from "react";
import Header from "./Header";
import "./Profile.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import { auth, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";

function Profile({ user, activeUser }) {
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: 400,
        width: 600,
        bgcolor: "background.paper",
        border: "1px solid #efefef",
        borderRadius: "4px",
        boxShadow: 24,
        p: 4,
        padding: "5px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    };

    const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
    const handleEditProfileModalOpen = () => setOpenEditProfileModal(true);
    const handleEditProfileModalClose = () => setOpenEditProfileModal(false);

    const [updatedPhotoURL, setUpdatedPhotoURL] = useState(null);
    const [updatedDisplayName, setUpdatedDisplayName] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);

    /* I have to add three sections, one for each component the user can update */
    /* The photoURL is the same as posting, send the profile picture to storage, get the link, use that as a source for photoURL */
    /* display name will be the one the user set when he signed in, but if they decide to change it, I'll set it to updateDisplayName and updatedDescription and add it to the updateProfile function at the end */

    const updateUserProfile = (image, user) => {
        if (!image) return;
        const imagesRef = ref(storage, `/profilePictures/${image.name}`);
        const uploadTask = uploadBytesResumable(imagesRef, image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setUploadProgress(
                    Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                );
            },
            (error) => {
                console.error(error);
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    updateProfile(auth.user, {
                        displayName: updatedDisplayName || user.displayName,
                        photoURL: downloadURL || user.photoURL,
                    })
                        .then(() => {
                            console.log("passed");
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                });
            }
        );
    };

    return (
        <div className="profile-container">
            <Modal
                open={openEditProfileModal}
                onClose={handleEditProfileModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Edit Profile
                    </Typography>
                    <Divider />

                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        Upload your profile picture here
                    </Typography>
                    <input
                        type="file"
                        onChange={(e) => setUpdatedPhotoURL(e.target.files[0])}
                    />
                    <LinearProgress
                        variant="determinate"
                        value={uploadProgress}
                    />

                    <TextField
                        id="filled-basic"
                        label="New username..."
                        variant="filled"
                        onChange={(e) => setUpdatedDisplayName(e.target.value)}
                    />
                    <TextField
                        id="filled-basic"
                        label="New description..."
                        variant="filled"
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                    />

                    <Button variant="contained">Update Profile</Button>
                </Box>
            </Modal>
            <div className="profile-resume">
                <div className="profile-pic-container">
                    <img
                        className="main-profile-pic"
                        src={
                            activeUser.profilePicture
                        }
                        alt="user-avatar"
                    />
                </div>
                <div className="profile-right">
                    <div className="profile-first">
                        <p className="bold-text">{activeUser.username}</p>
                        <button
                            className="edit-profile-button"
                            onClick={handleEditProfileModalOpen}
                        >
                            Edit Profile
                        </button>
                    </div>
                    <div className="profile-second">
                        <div className="profile-amounts">
                            <p className="bold-text">
                                {activeUser.postsAmount || 0}
                            </p>
                            <span> posts</span>
                        </div>
                        <div className="profile-amounts">
                            <p className="bold-text">
                                {activeUser.followers.length}
                            </p>
                            <span> followers</span>
                        </div>
                        <div className="profile-amounts">
                            <p className="bold-text">
                                {activeUser.following.length}
                            </p>
                            <span> following</span>
                        </div>
                    </div>
                    <div className="profile-third">
                      
                        <p className="bold-text"> {activeUser.fullName}</p>
                        <p>{activeUser.description}</p>
                    </div>
                </div>
            </div>
            {/* give a style with a change of color depending on the state of the button, if it's active change it to the new one otherwise left it as it is */}
            <div className="profile-button-container">
                <button className="profile-switch-button">
                    <i className="fas fa-th profile-icons"></i>POSTS
                </button>
                <button className="profile-switch-button">
                    <i className="far fa-bookmark profile-icons" />
                    SAVED
                </button>
            </div>
            <div>
                {/* import pics from this user and render an each one in three columns and three rows with a hover effect that displays the amount of likes and comments it has */}
            </div>
        </div>
    );
}

export default Profile;
