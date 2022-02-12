import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
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
import { authService, signOut, firestore, ref, storage } from "../firebase";

import { getDownloadURL, uploadBytesResumable } from "firebase/storage";

function Header({ user, activeUser }) {
    let navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const linkStyle = {
        textDecoration: "none",
        color: "black",
    };

    const avatarStyle = {
        width: "20px",
        height: "20px",
    };

    const handleLogOut = async () => {
        try {
            signOut(authService);
            await navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    const [openUploadModal, setOpenUploadModal] = useState(false);
    const handleModalOpen = () => setOpenUploadModal(true);
    const handleModalClose = () => setOpenUploadModal(false);

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

    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleFileUpload = (image) => {
        if (!image) return;
        const imagesRef = ref(storage, `/images/${image.name}`);
        const postsRef = firestore.collection("posts");

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
                        file: downloadURL,
                        caption: caption,
                        createdAt:
                            firebase.firestore.FieldValue.serverTimestamp(),
                        uid: user.uid,
                        photoURL:
                            user.photoURL ||
                            "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png",
                        username: user.displayName,
                    });
                    setOpenUploadModal(false);
                    setProgress(0);
                    setImage(null);
                });
            }
        );
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
                    />
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

                            <i className="fas fa-inbox navbar-icons">
                                <div className="amount-of-unread-messages">
                                    9+
                                </div>
                            </i>
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
                            <i className="fas fa-heart navbar-icons" />
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={
                                        open ? "account-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                >
                                    <Avatar src={activeUser.profilePicture} style={avatarStyle}/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
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
                            <Link to="/profile" style={linkStyle}>
                                <MenuItem>
                                    <Avatar
                                        src={activeUser.profilePicture}
                                        alt="profile-pic"
                                    />
                                    Profile
                                </MenuItem>
                            </Link>
                            <MenuItem>
                                <Avatar src="https://cdn.iconscout.com/icon/premium/png-256-thumb/saved-2223099-1861901.png" />
                                Saved
                            </MenuItem>
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
            <Link to="profile" label="Profile"></Link>
        </div>
    );
}

export default Header;
