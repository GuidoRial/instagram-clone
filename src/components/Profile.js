import React from "react";
import Header from "./Header";
import "./Profile.css";

function Profile({ user }) {
    return (
        <div className="profile-container">
            <div className="profile-resume">
                <div className="profile-pic-container">
                    <img
                        className="main-profile-pic"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        alt="user-avatar"
                    />
                </div>
                <div className="profile-right">
                    <div className="profile-first">
                        <p className="bold-text">{user.displayName}</p>
                        <button className="edit-profile-button">
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
                        <p className="bold-text">
                            {user.fullName || "Full Name"}
                        </p>
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
