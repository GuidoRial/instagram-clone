import React, { useState, useContext, useEffect } from "react";
import AppStoreLogo from "../assets/download-appStore.png";
import GooglePlayLogo from "../assets/get-it-on-GooglePlay.png";
import "./LogIn.css";
import LoginImg from "../assets/login-photo.png";
import { FirebaseContext } from "../firebase";
import { useNavigate } from "react-router-dom";

function LogIn() {
    //const navigate = useNavigate();
    const firebase = useContext(FirebaseContext);

    const [emailAdress, setEmailAdress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const isInvalid = password === "" || emailAdress === "";

    const handleLogin = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        document.title = "Login - Instagram Clone";
    }, []);

    return (
        <div className="log-in-container">
            <img className="login-img" src={LoginImg} alt="login-instagram" />
            <div className="second-container">
                <div className="form-container">
                    <div>
                        <img
                            src="https://logos-marcas.com/wp-content/uploads/2020/04/Instagram-Logo.png"
                            alt="instagram-logo"
                            className="instagram-logo-text login-instagram-logo"
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
                        </form>
                    </div>
                </div>
                <div className="log-in-question">
                    <p>Don't have an accout?</p>
                    <p className="log-in-text">Sign up</p>
                </div>

                <div>
                    <p>Get the app.</p>
                    <div>
                        <img
                            src={AppStoreLogo}
                            alt="get-it-on-appstore"
                            className="log-in-icon"
                        />
                        <img
                            src={GooglePlayLogo}
                            alt="get-it-on-play-store"
                            className="log-in-icon"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
