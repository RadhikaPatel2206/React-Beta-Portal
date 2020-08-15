import React, { useEffect, useState } from "react";
import {
    TextField,
    FormControl,
    InputLabel,
    Input,
    Button,
    FormHelperText,
} from "@material-ui/core";

// StyleSheet import
import "./PatientProfile.css";

// Context API usage import
import { useStateValue } from "../../context/contextSetup";

// DB import
import { db } from "../../firebase";

const PatientProfile = () => {
    // Context API use
    const [{ user, patient }, dispatch] = useStateValue();

    // Form Field Control
    const [password, setPassword] = useState("");

    // Error Control
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState("");

    // Fetch patient if redirected from 404 page - only is userType is Patient
    useEffect(() => {
        if (user?.type === "patient" && !patient) {
            db.collection("users")
                .where("email", "==", user.email)
                .limit(1)
                .get()
                .then((docs) => {
                    docs.forEach((doc) => {
                        dispatch({
                            type: "SET_PATIENT",
                            patient: { id: doc.id, ...doc.data() },
                        });
                    });
                })
                .catch((error) => console.log(error));
        }
    }, [user, patient, dispatch]);

    // Update password for a patient
    const updatePassword = (event) => {
        event.preventDefault();
        setPasswordError(false);
        setPasswordErrorText("");
        const re = RegExp(/(?=[A-Za-z]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.{8,}).*$/);

        if (!password) {
            setPasswordError(true);
            setPasswordErrorText(
                "No password provided. Please provide a password."
            );
        } else if (!re.test(password)) {
            setPasswordError(true);
            setPasswordErrorText(
                "Password must - include 1 UpperCase, include 1 LowerCase, be at least 8 characters long"
            );
        } else {
            db.collection("users")
                .doc(patient.id)
                .set({ password: password }, { merge: true });
            dispatch({ type: "UPDATE_PWD", password: password });
            setPassword("");
            alert("Password updated successfully");
        }
    };

    // Render Patient Profile - ClassName using BEM
    return (
        <div className="profile">
            {/* Patient screen */}
            {user?.type === "patient" && patient && (
                <>
                    <TextField
                        className="profile__patientData"
                        disabled
                        label="Email ID"
                        value={patient.email}
                    />
                    <TextField
                        className="profile__patientData"
                        disabled
                        label="Full Name"
                        value={patient.fullName}
                    />
                    <TextField
                        className="profile__patientData"
                        disabled
                        label="Phone Number"
                        value={patient.phone}
                    />
                    <TextField
                        className="profile__patientData"
                        disabled
                        label="Address"
                        value={patient.address}
                    />
                    <TextField
                        className="profile__patientData"
                        disabled
                        label="City"
                        value={patient.city}
                    />
                    <TextField
                        className="profile__patientData"
                        disabled
                        label="State"
                        value={patient.state}
                    />
                    <TextField
                        className="profile__patientData"
                        disabled
                        label="Country"
                        value={patient.country}
                    />
                    <TextField
                        className="profile__patientData"
                        disabled
                        label="PinCode"
                        value={patient.pincode}
                    />
                    <TextField
                        className="profile__patientData"
                        disabled
                        label="Diagnosis"
                        value={patient.diagnosis}
                    />
                    <TextField
                        className="profile__patientData"
                        disabled
                        label="Medication"
                        value={patient.medication}
                    />
                    <form className="profile__patientForm">
                        <FormControl
                            className="profile__patientPassword"
                            error={passwordError}
                        >
                            <InputLabel>Update Password</InputLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FormHelperText>{passwordErrorText}</FormHelperText>
                        </FormControl>
                        <Button
                            type="submit"
                            className="profile__patientButton"
                            variant="contained"
                            onClick={updatePassword}
                        >
                            Update
                        </Button>
                    </form>
                </>
            )}
        </div>
    );
};

export default PatientProfile;
