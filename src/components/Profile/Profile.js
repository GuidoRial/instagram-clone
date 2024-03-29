import React, { useEffect, useState } from "react";
import "./Profile.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { auth, firestore, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
    clearAllInputs,
    editProfileModalStyle,
    getProfilePhotos,
    getSavedPhotos,
} from "../../aux";
import { useNavigate, useParams } from "react-router-dom";
import UserProfilePhoto from "./UserProfilePhoto";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

function Profile({ user, activeUser }) {
    const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
    const handleEditProfileModalOpen = () => setOpenEditProfileModal(true);
    const handleEditProfileModalClose = () => setOpenEditProfileModal(false);

    const [updatedPhotoURL, setUpdatedPhotoURL] = useState(null);
    const [updatedDisplayName, setUpdatedDisplayName] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [usersFromDatabase, setUsersFromDatabase] = useState([]);
    const [usernameExistsInDatabase, setUsernameExistsInDatabase] = useState(
        []
    );
    const [usernameAvailable, setUserNameAvailable] = useState(false);
    let navigate = useNavigate();

    let params = useParams();
    const [profileOwner, setProfileOwner] = useState({});

    const [profilePhotos, setProfilePhotos] = useState([]);
    const [photosFromUser, setPhotosFromUser] = useState(true);
    const [savedPhotos, setSavedPhotos] = useState([]);
    const [followButton, setFollowButton] = useState("");
    const [followStatus, setFollowStatus] = useState(false);

    const [postsAmount, setPostsAmount] = useState(0);
    const [followersAmount, setFollowersAmount] = useState(0);
    const [followingAmount, setFollowingAmount] = useState(0);

    //Set state for posts, followers and following so that it updates automatically

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

    useEffect(() => {
        async function initializeProfile() {
            const response = await getProfilePhotos(profileOwner.userId);
            setProfilePhotos(response);
            const secondResponse = await getSavedPhotos(profileOwner.userId);
            setSavedPhotos(secondResponse);
            setPostsAmount(response.length);
            setFollowersAmount(profileOwner.followers.length);
            setFollowingAmount(profileOwner.following.length);
        }

        profileOwner && initializeProfile();
    }, [profileOwner]);

    useEffect(() => {
        async function getFollowUserState(profileOwner, activeUser) {
            let doIFollowThisUser = await profileOwner.followers.includes(
                activeUser.userId
            );
            if (doIFollowThisUser) {
                setFollowStatus(true);
                setFollowButton("UNFOLLOW");
            } else {
                setFollowStatus(false);
                setFollowButton("FOLLOW");
            }
        }
        if (profileOwner && activeUser) {
            getFollowUserState(profileOwner, activeUser);
        }
    }, [profileOwner, activeUser]);

    useEffect(() => {
        const getUsersFromDatabase = async () => {
            const result = await firestore.collection("users").get();
            let filteredResult = result.docs.map((user) => ({
                username: user.data().username,
            }));
            setUsersFromDatabase(filteredResult);
        };

        getUsersFromDatabase();
    }, []);

    useEffect(() => {
        const checkIfUsernameIsValid = (updatedDisplayName) => {
            const searchResult = usersFromDatabase.filter(
                (user) => user.username === updatedDisplayName
            );
            setUsernameExistsInDatabase(searchResult);
        };

        checkIfUsernameIsValid(updatedDisplayName);
    }, [updatedDisplayName]);

    useEffect(() => {
        usernameExistsInDatabase[0]
            ? setUserNameAvailable(false)
            : setUserNameAvailable(true);
    }, [usernameExistsInDatabase]);

    const toggleFollowUser = async (activeUser, profileOwner) => {
        if (!followStatus) {
            //If I'm not following this user
            await firestore
                .collection("users")
                .doc(activeUser.docId)
                .update({
                    following: arrayUnion(profileOwner.userId),
                });
            await firestore
                .collection("users")
                .doc(profileOwner.docId)
                .update({
                    followers: arrayUnion(activeUser.userId),
                });
            setFollowStatus(true);
            setFollowButton("UNFOLLOW");
            setFollowersAmount(followersAmount + 1);
        } else {
            //If I'm already following him
            await firestore
                .collection("users")
                .doc(activeUser.docId)
                .update({
                    following: arrayRemove(profileOwner.userId),
                });
            await firestore
                .collection("users")
                .doc(profileOwner.docId)
                .update({
                    followers: arrayRemove(activeUser.userId),
                });
            setFollowStatus(false);
            setFollowButton("FOLLOW");
            setFollowersAmount(followersAmount - 1);
        }
    };

    const handleEditProfile = (updatedPhotoURL, activeUser) => {
        if (!usernameAvailable) {
            alert("You can't do that, username taken");
            return;
        }
        if (updatedPhotoURL) {
            const profilePicsRef = ref(
                storage,
                `/profilePictures/${updatedPhotoURL.name}`
            );
            const uploadTask = uploadBytesResumable(
                profilePicsRef,
                updatedPhotoURL
            );
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    setUploadProgress(
                        Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                                100
                        )
                    );
                },
                (error) => {
                    console.error(error);
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            firestore
                                .collection("users")
                                .doc(activeUser.docId)
                                .update({
                                    profilePicture:
                                        downloadURL ||
                                        activeUser.profilePicture,
                                    description:
                                        updatedDescription ||
                                        activeUser.description,
                                    username:
                                        updatedDisplayName ||
                                        activeUser.username,
                                });
                        })
                        .then(() => {
                            setTimeout(() => {
                                navigate("/");
                                window.location.reload();
                            }, 3000);
                            setUpdatedDisplayName("");
                            setUpdatedDescription("");
                            setUploadProgress(0);
                            clearAllInputs();
                        });
                }
            );
        } else {
            firestore
                .collection("users")
                .doc(activeUser.docId)
                .update({
                    description: updatedDescription || activeUser.description,
                    username: updatedDisplayName || activeUser.username,
                });
            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 3000);
            setUpdatedDisplayName("");
            setUpdatedDescription("");
            setUploadProgress(0);
            clearAllInputs();
        }
    };

    return (
        <div className="profile-container">
            <Modal
                open={openEditProfileModal}
                onClose={handleEditProfileModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={editProfileModalStyle}>
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
                    {updatedPhotoURL && <h3>{uploadProgress}% done</h3>}
                    {!usernameAvailable && updatedDisplayName.length > 0 && (
                        <p style={{ color: "#FD1D1D" }}>
                            This username is taken.
                        </p>
                    )}
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

                    <Button
                        variant="contained"
                        onClick={() =>
                            handleEditProfile(updatedPhotoURL, activeUser)
                        }
                    >
                        Update Profile
                    </Button>
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
                        ) : (
                            <Button
                                variant="outlined"
                                onClick={() =>
                                    toggleFollowUser(activeUser, profileOwner)
                                }
                            >
                                {profileOwner ? followButton : "loading..."}
                            </Button>
                        )}
                    </div>
                    <div className="profile-second">
                        <div className="profile-amounts">
                            <p className="bold-text">
                                {profilePhotos ? postsAmount : "loading..."}
                            </p>
                            <span>{postsAmount === 1 ? "post" : "posts"}</span>
                        </div>
                        <div className="profile-amounts">
                            <p className="bold-text">
                                {profileOwner.followers
                                    ? followersAmount
                                    : "loading..."}
                            </p>
                            <span>
                                {followersAmount === 1
                                    ? "follower"
                                    : "followers"}
                            </span>
                        </div>
                        <div className="profile-amounts">
                            <p className="bold-text">
                                {profileOwner.following
                                    ? followingAmount
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
                                  activeUser={activeUser}
                                  amountOfComments={photo.comments.length}
                              />
                          </>
                      ))
                    : savedPhotos.map((photo) => (
                          <>
                              <UserProfilePhoto
                                  photo={photo}
                                  key={photo.docId}
                                  src={photo.imageSrc}
                                  activeUser={activeUser}
                                  amountOfComments={photo.comments.length}
                              />
                          </>
                      ))}
            </div>
        </div>
    );
}

export default Profile;
