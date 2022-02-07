import React, { useState } from "react";
import AppStoreLogo from "../assets/download-appStore.png";
import GooglePlayLogo from "../assets/get-it-on-GooglePlay.png";
import { Link } from "react-router-dom";
import "./SignUp.css";
import * as openFunction from "../aux";

function SignUp() {
    const linkStyle = {
        textDecoration: "none",
    };

    const [emailAdress, setEmailAdress] = useState("");
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const isInvalid =
        password === "" ||
        emailAdress === "" ||
        fullName === "" ||
        userName === "";

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

                <form className="sign-up-form">
                    <input
                        type="text"
                        placeholder="Email"
                        className="data-input"
                    />
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="data-input"
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        className="data-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="data-input"
                    />
                    <button
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
