import React from "react";

// Context API usage import
import { useStateValue } from "../../context/contextSetup";

// Component Import
import Error403 from "../Error/Error403";

const PatientSearch = () => {
    // Context API use
    const [{ user }] = useStateValue();

    // Render Patient Search - ClassName using BEM
    return (
        <div className="search">{user?.type === "patient" && <Error403 />}</div>
    );
};

export default PatientSearch;
