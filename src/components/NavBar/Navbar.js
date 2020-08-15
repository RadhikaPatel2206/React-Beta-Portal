import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

// StyleSheet import
import "./NavBar.css";

// Context API usage import
import { useStateValue } from "../../context/contextSetup";

const NavBar = () => {
    // History Control
    const history = useHistory();

    // Context API use
    const [{ user }, dispatch] = useStateValue();

    // Logout user
    const logoutUser = () => {
        dispatch({ type: "SET_USER", user: null });
        sessionStorage.clear();
        history.push("/");
    };

    // Redirect depending on user to different pages
    const redirectHome = (event) => {
        if (!user) {
            history.push("/");
        } else if (user.type === "doctor") {
            history.push("/patient-search");
        } else {
            history.push("patient-profile");
        }
    };

    // Render NavBar - ClassName using BEM
    return (
        <div className="navbar">
            <div className="navbar__logo" onClick={redirectHome}>
                Portal
            </div>
            <div className="navbar__options">
                {/* Check if user is logged in or not */}
                {/* If user is not logged in, provide LOGIN else provide LOGOUT */}
                {!user ? (
                    <Link className="navbar__link" to="/">
                        <Button className="navbar__button" variant="text">
                            Login
                        </Button>
                    </Link>
                ) : (
                    <Button
                        className="navbar__button"
                        variant="text"
                        onClick={logoutUser}
                    >
                        Logout
                    </Button>
                )}
            </div>
        </div>
    );
};

export default NavBar;
