import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    FormControl,
    InputLabel,
    Input,
    Button,
    FormHelperText,
} from "@material-ui/core";
import KeyIcon from "@material-ui/icons/VpnKey";
import LockOpenIcon from "@material-ui/icons/LockOpen";

// DB import
import { db } from "../../firebase";

// StyleSheet import
import "./Login.css";

// Context API usage import
import { useStateValue } from "../../context/contextSetup";

const Login = () => {
    // History control
    const history = useHistory();

    // Context API use
    const [, dispatch] = useStateValue();

    // Controlled form input/data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [patient, setPatient] = useState(null);

    // Error Control
    const [emailError, setEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState("");

    // Doctor form submit check
    const docFormSubmit = (event) => {
        event.preventDefault();
        setEmailError(false);
        setEmailErrorText("");
        const re = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

        if (!email) {
            // Email provided or not
            setEmailError(true);
            setEmailErrorText("Email ID is required.");
        } else if (!re.test(email)) {
            // email format correct or not
            setEmailError(true);
            setEmailErrorText("Invalid Email ID provided.");
        } else {
            // Check whether email is present or not
            db.collection("users")
                .where("email", "==", email)
                .limit(1)
                .get()
                .then((docs) => {
                    if (docs.size === 0) {
                        setEmailError(true);
                        setEmailErrorText("Email ID not registred with us.");
                    } else {
                        docs.forEach((doc) => {
                            if (doc.data().type === "patient") {
                                setPatient({ id: doc.id, ...doc.data() });
                            } else {
                                dispatch({
                                    type: "SET_USER",
                                    user: { ...doc.data(), verified: true },
                                });
                                sessionStorage.setItem(
                                    "email",
                                    doc.data().email
                                );
                                sessionStorage.setItem("type", doc.data().type);
                                sessionStorage.setItem("verified", true);
                                history.push("/patient-search");
                            }
                        });
                    }
                })
                .catch((error) => console.log(error));
        }
    };

    // Patient form submit check
    const patientFormSubmit = (event) => {
        event.preventDefault();
        setPasswordError(false);
        setPasswordErrorText("");

        if (!password) {
            setPasswordError(true);
            setPasswordErrorText("Password is required.");
        } else if (password !== patient.password) {
            setPasswordError(true);
            setPasswordErrorText("Password is incorrect.");
        } else {
            dispatch({
                type: "SET_USER",
                user: {
                    email: patient.email,
                    type: patient.type,
                    verified: true,
                },
            });
            dispatch({ type: "SET_PATIENT", patient: patient });
            sessionStorage.setItem("email", patient.email);
            sessionStorage.setItem("type", patient.type);
            sessionStorage.setItem("verified", true);
            history.push("/patient-profile");
        }
    };

    // Render Login - ClassName using BEM
    return (
        <div className="login">
            <span className="login__title">Login</span>
            <form className="login__form">
                <FormControl required error={emailError}>
                    <InputLabel>Email ID</InputLabel>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormHelperText>{emailErrorText}</FormHelperText>
                </FormControl>
                {!patient ? (
                    <Button
                        className="login__button"
                        type="submit"
                        variant="contained"
                        onClick={docFormSubmit}
                    >
                        <KeyIcon />
                    </Button>
                ) : (
                    <>
                        <FormControl required error={passwordError}>
                            <InputLabel>Password</InputLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FormHelperText>{passwordErrorText}</FormHelperText>
                        </FormControl>
                        <Button
                            className="login__button"
                            type="submit"
                            variant="contained"
                            onClick={patientFormSubmit}
                        >
                            <LockOpenIcon />
                        </Button>
                    </>
                )}
            </form>
        </div>
    );
};

export default Login;
