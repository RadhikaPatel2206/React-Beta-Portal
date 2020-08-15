import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Components import
import NavBar from "./NavBar/Navbar";
import Login from "./Login/Login";
import PatientSearch from "./PatientSearch/PatientSearch";
import PatientProfile from "./PatientProfile/PatientProfile";
import Error404 from "./Error/Error404";

const App = () => {
    return (
        <BrowserRouter>
            {/* Navigation Bar/Header */}
            {/* NavBar Component will be visible on all pages as it outsite the switch-route pair */}
            <NavBar />

            {/* Setting up routes */}
            {/* Switch will cause only the first matching route to be selected/executed */}
            <Switch>
                <Route exact path="/patient-search" component={PatientSearch} />
                <Route
                    exact
                    path="/patient-profile"
                    component={PatientProfile}
                />
                <Route exact path="/" component={Login} />
                <Route component={Error404} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
