import { borderRadius } from "@mui/system";
import React, { useState } from "react";
import { profilePhotosStyle, profilePhotosStyleOnHover } from "../aux";
import "./Profile.css";

function UserProfilePhoto({ src, amountOfLikes, amountOfComments }) {
    const [hoverStatus, setHoverStatus] = useState(false);

    return (
        <div
            className="photo-container"
            onMouseOver={() => setHoverStatus(true)}
            onMouseOut={() => setHoverStatus(false)}
        >
            <img src={src} alt="uploaded by user" className="profile-photos" />
            <div
                style={
                    hoverStatus ? profilePhotosStyleOnHover : profilePhotosStyle
                }
            >
                {amountOfComments >= 0 && amountOfLikes >= 0 ? (
                    <>
                        <p>
                            <i className="fas fa-heart" /> {amountOfLikes}
                        </p>
                        <p>
                            <i className="fas fa-comment" /> {amountOfComments}
                        </p>
                    </>
                ) : (
                    <p>loading...</p>
                )}
            </div>
        </div>
    );
}

export default UserProfilePhoto;
