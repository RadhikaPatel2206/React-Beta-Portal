import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

// StyleSheet import
import "./Error404.css";

const Error404 = () => {
    // Render 404 page - ClassName using BEM
    return (
        <div className="error404">
            <span className="error404__title">404</span>
            <span>We couldn't find the page</span>
            <Link className="error404__link" to="/">
                <Button variant="outlined" className="error404__button">
                    Go Back
                </Button>
            </Link>
        </div>
    );
};

export default Error404;
