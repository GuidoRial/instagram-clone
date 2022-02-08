import React from "react";
import Header from "./Header";
import "./Profile.css";

function Profile() {
    return (
        <div className="profile-container">
            <div className="profile-resume">
                <div className="profile-pic-container">
                    <img
                        className="main-profile-pic"
                        src="https://lh3.googleusercontent.com/ogw/ADea4I5HaEHIjUpA_xJBph5dE9POzh0l_z62cJ5IACM6WVY=s83-c-mo"
                        alt="user-avatar"
                    />
                </div>
                <div className="profile-right">
                    <div className="profile-first">
                        <p className="bold-text">gui2rial</p>
                        <button className="edit-profile-button">
                            Edit Profile
                        </button>
                    </div>
                    <div className="profile-second">
                        <div className="profile-amounts">
                            <p className="bold-text">7</p>
                            <span> posts</span>
                        </div>
                        <div className="profile-amounts">
                            <p className="bold-text">806</p>
                            <span> followers</span>
                        </div>
                        <div className="profile-amounts">
                            <p className="bold-text">570</p>
                            <span> following</span>
                        </div>
                    </div>
                    <div className="profile-third">
                        <p className="bold-text">Guido Rial</p>
                        <p>Doing my best.</p>
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
