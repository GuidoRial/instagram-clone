import React, { useEffect, useState } from "react";
import AppStoreLogo from "../assets/download-appStore.png";
import GooglePlayLogo from "../assets/get-it-on-GooglePlay.png";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import * as openFunction from "../aux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebase, firestore } from "../firebase";

import { linkStyle } from "../aux";

function SignUp({ userName, setUserName, fullName, setFullName, activeUser }) {
    let navigate = useNavigate();

    const [emailAdress, setEmailAdress] = useState("");
    const [password, setPassword] = useState("");

    const isInvalid =
        password === "" ||
        emailAdress === "" ||
        fullName === "" ||
        userName === "";

    if (activeUser.userId) navigate("/");

    const handleSignUp = async (e) => {
        try {
            e.preventDefault();
            const createdUserResult = await firebase
                .auth()
                .createUserWithEmailAndPassword(emailAdress, password);

            await createdUserResult.user.updateProfile({
                displayName: userName,
                photoURL:
                    "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png",
            });

            await firestore.collection("users").add({
                userId: createdUserResult.user.uid,
                username: userName.toLowerCase(),
                fullName: fullName,
                emailAdress: emailAdress.toLowerCase(),
                following: [],
                followers: [],
                dateCreated: Date.now(),
                description: "",
                profilePicture:
                    "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png",
            });
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="main-container">
            <div className="superior-container">
                <img
                    src="https://logos-marcas.com/wp-content/uploads/2020/04/Instagram-Logo.png"
                    alt="instagram-logo"
                    className="instagram-logo-text login-instagram-logo"
                />

                <p className="message">
                    Sign up to see photos and videos from your friends.
                </p>

                <form className="sign-up-form" onSubmit={handleSignUp}>
                    <input
                        type="text"
                        placeholder="Email"
                        className="data-input"
                        onChange={(e) => setEmailAdress(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="data-input"
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        className="data-input"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="data-input"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        disabled={isInvalid}
                        type="submit"
                        className="login-button"
                        style={{ opacity: isInvalid ? "0.5" : "1" }}
                    >
                        Sign up
                    </button>
                </form>

                <div>
                    <p className="disclaimer">
                        By signing up, you agree to our
                        <span
                            className="disclaimer-links"
                            onClick={openFunction.openTerms}
                        >
                            Terms
                        </span>
                        ,
                        <span
                            className="disclaimer-links"
                            onClick={openFunction.openData}
                        >
                            Data Policy
                        </span>
                        and
                        <span
                            className="disclaimer-links"
                            onClick={openFunction.openCookies}
                        >
                            Cookies Policy
                        </span>
                        .
                    </p>
                </div>
            </div>
            <div className="sign-in-question">
                <p>Have an account?</p>
                <Link style={linkStyle} to="/login" label="LogIn">
                    <p>Log in</p>
                </Link>
            </div>
            <div>
                <p>Get the app.</p>
                <div>
                    <img
                        src={AppStoreLogo}
                        alt="get-it-on-appstore"
                        className="log-in-icon"
                        onClick={openFunction.openAppStore}
                    />
                    <img
                        src={GooglePlayLogo}
                        alt="get-it-on-play-store"
                        className="log-in-icon"
                        onClick={openFunction.openPlayStore}
                    />
                </div>
            </div>
        </div>
    );
}

export default SignUp;
