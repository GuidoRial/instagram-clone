import React from "react";

function Header() {
    return (
        <div>
            <div>
                <img
                    src="https://logos-marcas.com/wp-content/uploads/2020/04/Instagram-Logo.png"
                    alt="instagram-logo"
                />
            </div>
            <div>
                <input type="search" />
            </div>
            <div>
                <i className="fas fa-home" />
                <i className="fas fa-inbox" />
                <i className="fas fa-plus-circle" />
                <i className="fas fa-heart" />
                <i className="fas fa-user-alt" />
            </div>
        </div>
    );
}

export default Header;
