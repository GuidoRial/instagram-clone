import React from "react";
import AppStoreLogo from "../assets/download-appStore.png";
import GooglePlayLogo from "../assets/get-it-on-GooglePlay.png";
import "./SignUp.css"

function SignUp() {
    return (
        <div className="sign-up-container">
            <div className="sign-up">
                <img
                    src="https://logos-marcas.com/wp-content/uploads/2020/04/Instagram-Logo.png"
                    alt="instagram-logo"
                    className="instagram-logo-text"
                />
                <div className="log-in-google">
                    <i class="fab fa-google" />
                    <p>Log in with Google</p>
                </div>
            </div>
            <div>
                <p>Get the app.</p>
                <div>
                    <img src={AppStoreLogo} alt="get-it-on-appstore"  className="log-in-icon"/>
                    <img src={GooglePlayLogo} alt="get-it-on-play-store" className="log-in-icon" />
                </div>
            </div>
        </div>
    );
}

export default SignUp;
