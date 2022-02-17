import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import firebase from "firebase/compat/app";
import Autocomplete from "@mui/material/Autocomplete";
import { authService, signOut, firestore, ref, storage } from "../firebase";
import { clearAllInputs, linkStyle, modalStyle } from "../aux";

import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import uniqid from "uniqid";

function Header({ user, activeUser }) {
    let navigate = useNavigate();

    // Upload Photo Modal
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const handleModalOpen = () => setOpenUploadModal(true);
    const handleModalClose = () => setOpenUploadModal(false);
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    // Upload Photo Modal

    // Search for users
    const [usersFromDatabase, setUsersFromDatabase] = useState([]);
    const [search, setSearch] = useState("");
    const [display, setDisplay] = useState(false);
    const [recommendations, setRecommendations] = useState([]);

    // Search for users

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
        const filterUsers = (search) => {
            const searchResult = usersFromDatabase.filter((user) =>
                user.username.includes(search)
            );
            setRecommendations(searchResult);
        };

        filterUsers(search);
    }, [search]);

    useEffect(() => {
        search.length > 0 ? setDisplay(true) : setDisplay(false);
    }, [search]);

    const handleEnterProfile = () => {
        setSearch("");
        clearAllInputs();
    };

    const handleFileUpload = (image) => {
        if (!image) return;
        const imagesRef = ref(storage, `/images/${image.name}`);
        const postsRef = firestore.collection("photos");

        const uploadTask = uploadBytesResumable(imagesRef, image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setProgress(
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
                    postsRef.add({
                        caption: caption,
                        comments: [],
                        dateCreated: Date.now(),
                        imageSrc: downloadURL,
                        likes: [],
                        photoId: uniqid(),
                        saved: [],
                        userId: activeUser.userId,
                    });
                    setOpenUploadModal(false);
                    setProgress(0);
                    setImage(null);
                });
            }
        );
    };

    const handleLogOut = async () => {
        try {
            signOut(authService);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="header">
            <div className="header-content">
                <div className="img-container">
                    <Link to="/" label="Home">
                        <img
                            src="https://logos-marcas.com/wp-content/uploads/2020/04/Instagram-Logo.png"
                            alt="instagram-logo"
                            className="instagram-logo-text"
                        />
                    </Link>
                </div>
                <div className="search-bar-container">
                    <i className="fas fa-search search-icon" />
                    <input
                        type="search"
                        className="search-bar"
                        placeholder="Search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {display && (
                        <div key={uniqid()} className="recommendations">
                            {recommendations.map((recommendation) => (
                                <Link
                                    to={`/profile/${recommendation.username}`}
                                    label="Profile"
                                    style={linkStyle}
                                    onClick={handleEnterProfile}
                                >
                                    <div
                                        className="recommendation-item"
                                        key={uniqid()}
                                    >
                                        {recommendation.username}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
                <div className="icon-container">
                    <React.Fragment>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                textAlign: "center",
                            }}
                        >
                            <Link to="/" label="Home">
                                <i
                                    className="fas fa-home navbar-icons"
                                    style={linkStyle}
                                />
                            </Link>

                            <i
                                className="fas fa-plus-circle navbar-icons"
                                onClick={handleModalOpen}
                            />
                            <Modal
                                open={openUploadModal}
                                onClose={handleModalClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box style={modalStyle}>
                                    <div>
                                        <Typography
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h2"
                                            fontWeight="bold"
                                            textAlign="center"
                                        >
                                            Create a new post
                                        </Typography>
                                        <Divider style={{ width: 400 }} />
                                    </div>

                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            setImage(e.target.files[0])
                                        }
                                    />
                                    {image && <h3>{progress}% done</h3>}
                                    <TextField
                                        id="standard-basic"
                                        label="Write a caption..."
                                        variant="standard"
                                        onChange={(e) =>
                                            setCaption(e.target.value)
                                        }
                                    />

                                    <Button
                                        variant="contained"
                                        onClick={() => handleFileUpload(image)}
                                    >
                                        Share post
                                    </Button>
                                </Box>
                            </Modal>

                            <Tooltip title="Account settings">
                                <IconButton
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={
                                        open ? "account-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={(e) =>
                                        setAnchorEl(e.currentTarget)
                                    }
                                >
                                    <Avatar
                                        src={activeUser.profilePicture}
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={() => setAnchorEl(null)}
                            onClick={() => setAnchorEl(null)}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
                                    "& .MuiAvatar-root": {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    "&:before": {
                                        content: '""',
                                        display: "block",
                                        position: "absolute",
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: "background.paper",
                                        transform:
                                            "translateY(-50%) rotate(45deg)",
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{
                                horizontal: "right",
                                vertical: "top",
                            }}
                            anchorOrigin={{
                                horizontal: "right",
                                vertical: "bottom",
                            }}
                        >
                            <Link
                                to={`/profile/${activeUser.username}`}
                                style={linkStyle}
                            >
                                <MenuItem>
                                    <Avatar
                                        src={activeUser.profilePicture}
                                        alt="profile-pic"
                                    />
                                    Profile
                                </MenuItem>
                            </Link>

                            <Divider />
                            <MenuItem>
                                <ListItemIcon>
                                    <Avatar
                                        onClick={handleLogOut}
                                        fontSize="small"
                                        src="https://media.istockphoto.com/vectors/bold-standby-icon-on-white-background-vector-id1309001045?b=1&k=20&m=1309001045&s=170667a&w=0&h=DW7C80PVHwQJeCGTBTZeBk9IMRVddRvpPQrVLJXtAac="
                                    />
                                </ListItemIcon>
                                <p onClick={handleLogOut}>Log Out</p>
                            </MenuItem>
                        </Menu>
                    </React.Fragment>
                </div>
            </div>
            <Link to={`/profile/${activeUser.username}`} label="Profile"></Link>
        </div>
    );
}

export default Header;
