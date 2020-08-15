import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    FormControl,
    InputLabel,
    Input,
    Button,
    FormHelperText,
} from "@material-ui/core";

// StyleSheet import
import "./DoctorProfile.css";

// DB import
import { db } from "../../firebase";

// Context API usage import
import { useStateValue } from "../../context/contextSetup";

const DoctorProfile = ({ createStatus, patient }) => {
    // History use
    const history = useHistory();

    // Context API use
    const [, dispatch] = useStateValue();

    // Form Field Control
    const [email, setEmail] = useState(patient ? patient.email : "");
    const [fullName, setFullName] = useState(patient ? patient.fullName : "");
    const [phone, setPhone] = useState(patient ? patient.phone : "");
    const [address, setAddress] = useState(patient ? patient.address : "");
    const [city, setCity] = useState(patient ? patient.city : "");
    const [state, setState] = useState(patient ? patient.state : "");
    const [country, setCountry] = useState(patient ? patient.country : "");
    const [pincode, setPincode] = useState(patient ? patient.pincode : "");
    const [diagnosis, setDiagnosis] = useState(
        patient ? patient.diagnosis.toString() : ""
    );
    const [medication, setMedication] = useState(
        patient ? patient.medication.toString() : ""
    );

    // Error Control
    const [emailError, setEmailError] = useState(false);
    const [fullNameError, setFullNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [pincodeError, setPincodeError] = useState(false);
    const [diagnosisError, setDiagnosisError] = useState(false);
    const [medicineError, setMedicineError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState("");
    const [fullNameErrorText, setFullNameErrorText] = useState("");
    const [phoneErrorText, setPhoneErrorText] = useState("");
    const [pincodeErrorText, setPincodeErrorText] = useState("");
    const [diagnosisErrorText, setDiagnosisErrorText] = useState("");
    const [medicineErrorText, setMedicineErrorText] = useState("");

    // Validate form on submit and take action accordingly
    const validateForm = (event) => {
        event.preventDefault();
        const re = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
        setEmailError(false);
        setFullNameError(false);
        setPhoneError(false);
        setPincodeError(false);
        setDiagnosisError(false);
        setMedicineError(false);
        setEmailErrorText("");
        setFullNameErrorText("");
        setPhoneErrorText("");
        setPincodeErrorText("");
        setDiagnosisErrorText("");
        setMedicineErrorText("");

        switch (true) {
            case !email:
                setEmailError(true);
                setEmailErrorText("Email ID is required.");
                break;
            case !re.test(email):
                setEmailError(true);
                setEmailErrorText("Email ID is invalid.");
                break;
            case !fullName:
                setFullNameError(true);
                setFullNameErrorText("Full Name is required.");
                break;
            case !phone:
                setPhoneError(true);
                setPhoneErrorText("Phone Number is required");
                break;
            case isNaN(phone) || phone.length !== 10:
                setPhoneError(true);
                setPhoneErrorText("Please check the Phone Number provided");
                break;
            case !pincode:
                setPincodeError(true);
                setPincodeErrorText("Pincode is required");
                break;
            case isNaN(pincode) || pincode.length !== 6:
                setPincodeError(true);
                setPincodeErrorText("Please check the Pincode provided");
                break;
            case !diagnosis:
                setDiagnosisError(true);
                setDiagnosisErrorText("Diagnosis is required");
                break;
            case !medication:
                setMedicineError(true);
                setMedicineErrorText("Medication is required");
                break;
            default:
                const tempPatient = {
                    type: "patient",
                    email,
                    fullName,
                    phone,
                    address,
                    city,
                    state,
                    country,
                    pincode,
                    diagnosis: diagnosis.split(","),
                    medication: medication.split(","),
                };
                if (createStatus) {
                    db.collection("users").add({
                        ...tempPatient,
                        password: "healthecare",
                    });
                } else if (patient) {
                    db.collection("users")
                        .doc(patient.id)
                        .set({ ...tempPatient }, { merge: true });
                    dispatch({ type: "UPDATE_PATIENT", patient: tempPatient });
                }

                alert("Patient updated/created successfully.");
                history.push("/");
        }
    };

    // Delete a patient
    const deletePatient = (event) => {
        event.preventDefault();
        db.collection("users").doc(patient.id).delete();
        alert("Patient deleted successfully");
        history.push("/");
    };

    // Render Profile for Doctor - ClassName using BEM
    return (
        <form className="profile__doctorForm">
            <FormControl error={emailError} className="profile__doctorData">
                <InputLabel>Email ID</InputLabel>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormHelperText>{emailErrorText}</FormHelperText>
            </FormControl>
            <FormControl error={fullNameError} className="profile__doctorData">
                <InputLabel>Full Name</InputLabel>
                <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <FormHelperText>{fullNameErrorText}</FormHelperText>
            </FormControl>
            <FormControl error={phoneError} className="profile__doctorData">
                <InputLabel>Phone</InputLabel>
                <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <FormHelperText>{phoneErrorText}</FormHelperText>
            </FormControl>
            <FormControl className="profile__doctorData">
                <InputLabel>Address</InputLabel>
                <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </FormControl>
            <FormControl className="profile__doctorData">
                <InputLabel>City</InputLabel>
                <Input value={city} onChange={(e) => setCity(e.target.value)} />
            </FormControl>
            <FormControl className="profile__doctorData">
                <InputLabel>State</InputLabel>
                <Input
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            </FormControl>
            <FormControl className="profile__doctorData">
                <InputLabel>Country</InputLabel>
                <Input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </FormControl>
            <FormControl error={pincodeError} className="profile__doctorData">
                <InputLabel>Pincode</InputLabel>
                <Input
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                />
                <FormHelperText>{pincodeErrorText}</FormHelperText>
            </FormControl>
            <FormControl error={diagnosisError} className="profile__doctorData">
                <InputLabel>Diagnosis</InputLabel>
                <Input
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                />
                <FormHelperText>{diagnosisErrorText}</FormHelperText>
            </FormControl>
            <FormControl error={medicineError} className="profile__doctorData">
                <InputLabel>Medication</InputLabel>
                <Input
                    value={medication}
                    onChange={(e) => setMedication(e.target.value)}
                />
                <FormHelperText>{medicineErrorText}</FormHelperText>
            </FormControl>
            <div className="profile__doctorButton">
                <Button
                    type="submit"
                    className="doctor--color"
                    variant="contained"
                    onClick={validateForm}
                >
                    {createStatus ? "Create" : "Update"}
                </Button>
                {patient && (
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        onClick={deletePatient}
                    >
                        Delete
                    </Button>
                )}
            </div>
        </form>
    );
};

export default DoctorProfile;
