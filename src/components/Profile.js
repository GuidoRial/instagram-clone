import React, { useState } from "react";
import Header from "./Header";
import "./Profile.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";

function Profile({ user }) {
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: 200,
        width: 400,
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

    console.log(user);
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
                    <div>edit photoURL</div>
                    <div>edit username</div>

                    <div>edit description</div>
                </Box>
            </Modal>
            <div className="profile-resume">
                <div className="profile-pic-container">
                    <img
                        className="main-profile-pic"
                        src={
                            !user.photoURL &&
                            "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
                        }
                        alt="user-avatar"
                    />
                </div>
                <div className="profile-right">
                    <div className="profile-first">
                        <p className="bold-text">{user.displayName}</p>
                        <button
                            className="edit-profile-button"
                            onClick={handleEditProfileModalOpen}
                        >
                            Edit Profile
                        </button>
                    </div>
                    <div className="profile-second">
                        <div className="profile-amounts">
                            <p className="bold-text">{user.postsAmount || 0}</p>
                            <span> posts</span>
                        </div>
                        <div className="profile-amounts">
                            <p className="bold-text">{user.followers || 0}</p>
                            <span> followers</span>
                        </div>
                        <div className="profile-amounts">
                            <p className="bold-text">{user.following || 0}</p>
                            <span> following</span>
                        </div>
                    </div>
                    <div className="profile-third">
                        <p>{user.description || "Description."}</p>
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
