import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";

// Context API usage import
import { useStateValue } from "../../context/contextSetup";

// Component Import
import Error403 from "../Error/Error403";
import PatientCard from "../PatientCard/PatientCard";

// StyleSheet import
import "./PatientSearch.css";

// DB import
import { db } from "../../firebase";

const PatientSearch = () => {
    // History use
    const history = useHistory();

    // Context API use
    const [
        { user, patients, patient, createStatus },
        dispatch,
    ] = useStateValue();

    console.log(patient);

    // Form Field/Flow Control
    const [search, setSearch] = useState("");
    const [searched, setSearched] = useState(false);
    const [resultText, setResultText] = useState("");

    useEffect(() => {
        dispatch({ type: "SET_PATIENT", patient: null });
        dispatch({ type: "CREATE_PATIENT", status: false });
    }, [dispatch, patient, createStatus]);

    // Search for Patients
    const searchSubmit = (event) => {
        event.preventDefault();
        setSearched(false);
        setResultText("");
        let list = [];

        db.collection("users")
            .where("type", "==", "patient")
            .get()
            .then((docs) => {
                docs.forEach((doc) => {
                    const string =
                        doc.data().fullName.toLowerCase() +
                        doc.data().diagnosis.toString().toLowerCase() +
                        doc.data().medication.toString().toLowerCase();

                    if (string.includes(search.toLowerCase())) {
                        list.push({ id: doc.id, ...doc.data() });
                    }

                    dispatch({ type: "SET_PATIENT_LIST", patients: list });
                    if (list.length > 0) {
                        setResultText("Loading...");
                    } else {
                        setResultText("No patients found");
                    }
                });
            })
            .catch((error) => console.log(error));

        setSearch("");
        setSearched(true);
    };

    // Render Patients List
    const renderList = patients.map((patient) => {
        return <PatientCard key={patient.id} patient={patient} />;
    });

    // Render Patient Search - ClassName using BEM
    return (
        <div className="search">
            {/* Error if userType is Patient */}
            {user?.type === "patient" && <Error403 />}

            {/* Doctor Screen */}
            {user?.type === "doctor" && (
                <form className="search__form">
                    <TextField
                        className="search__input"
                        label="Search Patients"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button type="submit" onClick={searchSubmit}>
                        <SearchIcon />
                    </Button>
                </form>
            )}

            {/* Display search list */}
            {searched ? (
                patients.length > 0 ? (
                    <div className="search__list">{renderList}</div>
                ) : (
                    <div className="search__notFound">{resultText}</div>
                )
            ) : (
                <></>
            )}

            {/* Create new Patient */}
            <IconButton
                onClick={(e) => {
                    dispatch({ type: "CREATE_PATIENT", status: true });
                    history.push("/patient-profile");
                }}
                className="search__create"
            >
                <AddIcon />
            </IconButton>
        </div>
    );
};

export default PatientSearch;
