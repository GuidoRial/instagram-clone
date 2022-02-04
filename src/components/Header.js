import React from "react";

function Header() {
    return (
        <div className="header">
            <div className="header-content">
                <div className="img-container">
                    <img
                        src="https://logos-marcas.com/wp-content/uploads/2020/04/Instagram-Logo.png"
                        alt="instagram-logo"
                        className="instagram-logo-text"
                    />
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
                    <i className="fas fa-home navbar-icons" />
                    <i className="fas fa-inbox navbar-icons">
                        <div className="amount-of-unread-messages">9+</div>
                    </i>
                    <i className="fas fa-plus-circle navbar-icons" />
                    <i className="fas fa-heart navbar-icons" />
                    <img
                        className="profile-picture"
                        src="https://lh3.googleusercontent.com/ogw/ADea4I5HaEHIjUpA_xJBph5dE9POzh0l_z62cJ5IACM6WVY=s83-c-mo"
                        alt="profile-pic"
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
