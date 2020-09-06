import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
// import Logo from "../../assets/logo.png";

const Header = ({ setVisible, visible, pathname, ...props }) => {
    return (
        <div className="header-nav">
            <Link to="/search">
                <Icon
                    disabled={pathname === "/search" ? true : false}
                    className={
                        pathname === "/search"
                            ? "invisible"
                            : "header-nav__icon"
                    }
                    name="search"
                    size="big"
                />
            </Link>
            <Link to="/">
                <h1 className="header-nav__title">iTongue</h1>
            </Link>
            
            <div onClick={() => setVisible(!visible)}>
                <Icon className="header-nav__icon" name="sidebar" size="big" />
            </div>
        </div>
    );
};

export default Header;

// <img src={Logo} className="header-nav__logo" alt="logo iTongue" />
