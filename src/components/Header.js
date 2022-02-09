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
import { authService, signOut } from "../firebase";

function Header({ user }) {
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
                            <i className="fas fa-plus-circle navbar-icons" />
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
                                    <Avatar
                                        sx={{ width: 32, height: 32 }}
                                        src="https://lh3.googleusercontent.com/ogw/ADea4I5HaEHIjUpA_xJBph5dE9POzh0l_z62cJ5IACM6WVY=s83-c-mo"
                                        alt="profile-pic"
                                        style={avatarStyle}
                                    ></Avatar>
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
                                        src="https://lh3.googleusercontent.com/ogw/ADea4I5HaEHIjUpA_xJBph5dE9POzh0l_z62cJ5IACM6WVY=s83-c-mo"
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
