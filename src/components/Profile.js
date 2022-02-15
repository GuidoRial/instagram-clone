import React, { useEffect, useState } from "react";
import "./Profile.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import { auth, firestore, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { modalStyle } from "../aux";
import { useParams } from "react-router-dom";
import UserProfilePhoto from "./UserProfilePhoto";

function Profile({ user, activeUser }) {
    const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
    const handleEditProfileModalOpen = () => setOpenEditProfileModal(true);
    const handleEditProfileModalClose = () => setOpenEditProfileModal(false);

    const [updatedPhotoURL, setUpdatedPhotoURL] = useState(null);
    const [updatedDisplayName, setUpdatedDisplayName] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);

    let params = useParams();
    //When I give React Router a personalized link like :username or :userId I can call params to return that value
    //console.log(params);  with :username returns: {username: "demouser"}

    /* I have to add three sections, one for each component the user can update */
    /* The photoURL is the same as posting, send the profile picture to storage, get the link, use that as a source for photoURL */
    /* display name will be the one the user set when he signed in, but if they decide to change it, I'll set it to updateDisplayName and updatedDescription and add it to the updateProfile function at the end */
    const [profileOwner, setProfileOwner] = useState({});
    const [profilePhotos, setProfilePhotos] = useState([]);

    const [photosFromUser, setPhotosFromUser] = useState(true);
    const [savedPhotos, setSavedPhotos] = useState([]);

    useEffect(() => {
        const getProfileOwner = async (username) => {
            try {
                const result = await firestore
                    .collection("users")
                    .where("username", "==", username)
                    .get();

                const [profileOwnerObject] = result.docs.map((item) => ({
                    ...item.data(),
                    docId: item.id,
                }));

                setProfileOwner(profileOwnerObject);
            } catch (error) {
                console.error(error);
            }
        };

        getProfileOwner(params.username);
    }, [params]);

    const getProfilePhotos = async (profileOwnerUserId) => {
        const result = await firestore
            .collection("photos")
            .orderBy("dateCreated", "desc")
            .get();

        let filteredResult = result.docs
            .map((photo) => ({
                ...photo.data(),
                docId: photo.id,
            }))
            .filter((photo) => profileOwnerUserId === photo.userId);

        return filteredResult;
    };

    const getSavedPhotos = async (profileOwnerUserId) => {
        const result = await firestore
            .collection("photos")
            .orderBy("dateCreated", "desc")
            .get();

        let filteredResult = result.docs
            .map((photo) => ({
                ...photo.data(),
                docId: photo.id,
            }))
            .filter((photo) => photo.saved.includes(profileOwnerUserId));

        return filteredResult;
    };

    useEffect(() => {
        async function getPhotos() {
            const response = await getProfilePhotos(profileOwner.userId);
            setProfilePhotos(response);
            const secondResponse = await getSavedPhotos(profileOwner.userId);
            setSavedPhotos(secondResponse);
        }

        if (profileOwner) {
            getPhotos();
        }
    }, [profileOwner]);

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
                        test Edit Profile
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
                        style={{
                            width: "128px",
                            height: "128px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                        src={profileOwner.profilePicture}
                        alt="user-avatar"
                    />
                </div>
                <div className="profile-right">
                    <div className="profile-first">
                        <p className="bold-text">{profileOwner.username}</p>
                        {activeUser.username === profileOwner.username ? (
                            <button
                                className="edit-profile-button"
                                onClick={handleEditProfileModalOpen}
                            >
                                Edit Profile
                            </button>
                        ) : null}
                    </div>
                    <div className="profile-second">
                        <div className="profile-amounts">
                            <p className="bold-text">0</p>
                            <span> posts</span>
                        </div>
                        <div className="profile-amounts">
                            <p className="bold-text">
                                {profileOwner.followers
                                    ? profileOwner.followers.length
                                    : "loading..."}
                            </p>
                            <span> followers</span>
                        </div>
                        <div className="profile-amounts">
                            <p className="bold-text">
                                {profileOwner.following
                                    ? profileOwner.following.length
                                    : "loading..."}
                            </p>
                            <span> following</span>
                        </div>
                    </div>
                    <div className="profile-third">
                        <p className="bold-text"> {profileOwner.fullName}</p>
                        <p>{profileOwner.description}</p>
                    </div>
                </div>
            </div>
            <div className="profile-button-container">
                {activeUser.username === profileOwner.username ? (
                    <>
                        <button
                            className="profile-switch-button"
                            disabled={photosFromUser}
                            onClick={() => setPhotosFromUser(true)}
                        >
                            <i className="fas fa-th profile-icons"></i>
                            POSTS
                        </button>

                        <button
                            className="profile-switch-button"
                            onClick={() => setPhotosFromUser(false)}
                            disabled={!photosFromUser}
                        >
                            <i className="far fa-bookmark profile-icons" />
                            SAVED
                        </button>
                    </>
                ) : null}
            </div>
            <div className="profile-photo-main-container">
                {photosFromUser
                    ? profilePhotos.map((photo) => (
                          <>
                              <UserProfilePhoto
                                  photo={photo}
                                  key={photo.docId}
                                  src={photo.imageSrc}
                                  amountOfLikes={photo.likes.length}
                                  amountOfComments={photo.comments.length}
                                  activeUser={activeUser}
                              />
                          </>
                      ))
                    : savedPhotos.map((photo) => (
                          <>
                              <UserProfilePhoto
                                  photo={photo}
                                  key={photo.docId}
                                  src={photo.imageSrc}
                                  amountOfLikes={photo.likes.length}
                                  amountOfComments={photo.comments.length}
                                  activeUser={activeUser}
                              />
                          </>
                      ))}
            </div>
        </div>
    );
}

export default Profile;
