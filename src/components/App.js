import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Context API usage import
import { useStateValue } from "../context/contextSetup";

// Components import
import NavBar from "./NavBar/Navbar";
import Login from "./Login/Login";
import PatientSearch from "./PatientSearch/PatientSearch";
import Profile from "./Profile/Profile";
import Error404 from "./Error/Error404";

const App = () => {
    // Context API use
    const [, dispatch] = useStateValue();

    // Load session info in Context API
    useEffect(() => {
        if (sessionStorage.getItem("verified")) {
            dispatch({
                type: "SET_USER",
                user: {
                    email: sessionStorage.getItem("email"),
                    type: sessionStorage.getItem("type"),
                    verified: sessionStorage.getItem("verified"),
                },
            });
        }
    }, [dispatch]);

    return (
        <BrowserRouter>
            {/* Navigation Bar/Header */}
            {/* NavBar Component will be visible on all pages as it outsite the switch-route pair */}
            <NavBar />

            {/* Setting up routes */}
            {/* Switch will cause only the first matching route to be selected/executed */}
            <Switch>
                <Route exact path="/patient-search" component={PatientSearch} />
                <Route exact path="/patient-profile" component={Profile} />
                <Route exact path="/" component={Login} />
                <Route component={Error404} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
