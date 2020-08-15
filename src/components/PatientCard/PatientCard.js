import React from "react";
import { useHistory } from "react-router-dom";

// StyleSheet import
import "./PatientCard.css";

// Context API usage import
import { useStateValue } from "../../context/contextSetup";

const PatientCard = ({ patient }) => {
    // History use
    const history = useHistory();

    // Context API use
    const [, dispatch] = useStateValue();

    // Redirect to patient profile to edit
    const editPatient = (event) => {
        dispatch({ type: "SET_PATIENT", patient: patient });
        history.push("/patient-profile");
    };

    // Render Cards - ClassName using BEM
    return (
        <div onClick={editPatient} key={patient.id} className="card">
            <span className="card__label">Patient Name: </span>
            <span>{patient.fullName}</span>
        </div>
    );
};

export default PatientCard;
