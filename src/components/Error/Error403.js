import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

// StyleSheet import
import "./Error403.css";

const Error403 = () => {
    // Render 404 page - ClassName using BEM
    return (
        <div className="error403">
            <span className="error403__title">403</span>
            <span>Access Forbidden</span>
            <Link className="error403__link" to="/">
                <Button variant="outlined" className="error403__button">
                    Go Back
                </Button>
            </Link>
        </div>
    );
};

export default Error403;
