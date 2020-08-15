import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

// StyleSheet import
import "./NavBar.css";

const NavBar = () => {
    // Render NavBar - ClassName using BEM
    return (
        <div className="navbar">
            <div className="navbar__logo">Portal</div>
            <div className="navbar__options">
                <Link className="navbar__link" to="/">
                    <Button className="navbar__button" variant="text">
                        Login
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default NavBar;
