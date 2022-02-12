import React, { useState } from "react";
import AppStoreLogo from "../assets/download-appStore.png";
import GooglePlayLogo from "../assets/get-it-on-GooglePlay.png";
import "./LogIn.css";
import LoginImg from "../assets/test.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "../firebase";
import * as openFunction from "../aux";
import { linkStyle } from "../aux";

function LogIn() {
    let navigate = useNavigate();


    const [emailAdress, setEmailAdress] = useState("");
    const [password, setPassword] = useState("");
    const demoUserEmailAdress = "demouser@gmail.com";
    const demoUserPassword = "demouser";
    const isInvalid = password === "" || emailAdress === "";

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            signInWithEmailAndPassword(authService, emailAdress, password);
            await navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    const handleLoginWithDemoUser = async () => {
        try {
            signInWithEmailAndPassword(
                authService,
                demoUserEmailAdress,
                demoUserPassword
            );
            await navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="log-in-container">
            <img className="login-img" src={LoginImg} alt="login-instagram" />
            <div className="second-container">
                <div className="form-container">
                    <div>
                        <img
                            src="https://logos-marcas.com/wp-content/uploads/2020/04/Instagram-Logo.png"
                            alt="instagram-logo"
                            className=" login-instagram-logo"
                        />
                        <form className="login-form" onSubmit={handleLogin}>
                            <input
                                type="text"
                                placeholder="Email"
                                className="data-input"
                                onChange={(e) => setEmailAdress(e.target.value)}
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
                                Log In
                            </button>
                            <button
                                type="submit"
                                className="login-button demo-user-button"
                                onClick={handleLoginWithDemoUser}
                            >
                                DEMO USER
                            </button>
                        </form>
                    </div>
                </div>
                <div className="log-in-question">
                    <p>Don't have an accout?</p>
                    <Link style={linkStyle} to="/signup" label="SignUp">
                        <p className="log-in-text">Sign up</p>
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
        </div>
    );
}

export default LogIn;
