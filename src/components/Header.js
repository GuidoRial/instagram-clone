import React from "react";

function Header() {
    return (
        <div className="header">
            <div className="img-container">
                <img
                    src="https://logos-marcas.com/wp-content/uploads/2020/04/Instagram-Logo.png"
                    alt="instagram-logo"
                    className="instagram-logo-text"
                />
            </div>
            <div className="search-bar-container">
                <i className="fas fa-search search-icon" />
                <input type="search" className="search-bar" />
            </div>
            <div className="icon-container">
                <i className="fas fa-home navbar-icons" />
                <i className="fas fa-inbox navbar-icons">
                    <div className="amount-of-unread-messages">9+</div>
                </i>
                <i className="fas fa-plus-circle navbar-icons" />
                <i className="fas fa-heart navbar-icons" />
                <i className="fas fa-user-alt navbar-icons" />
            </div>
        </div>
    );
}

export default Header;
