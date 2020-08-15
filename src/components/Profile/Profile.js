import React, { useEffect } from "react";

// StyleSheet import
import "./Profile.css";

// Context API usage import
import { useStateValue } from "../../context/contextSetup";

// DB import
import { db } from "../../firebase";

// Component import
import Error403 from "../Error/Error403";
import PatientProfile from "../PatientProfile/PatientProfile";
import DoctorProfile from "../DoctorProfile/DoctorProfile";

const Profile = () => {
    // Context API use
    const [{ user, patient, createStatus }, dispatch] = useStateValue();

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

    // Render Profile - ClassName using BEM
    return (
        <div className="profile">
            {/* If doctor came directly on this page */}
            {user?.type === "doctor" && !createStatus && !patient && (
                <Error403 />
            )}

            {/* If patient and userType is doctor */}
            {user?.type === "doctor" && (createStatus || patient) && (
                <DoctorProfile createStatus={createStatus} patient={patient} />
            )}

            {/* Patient screen */}
            {user?.type === "patient" && patient && (
                <PatientProfile patient={patient} />
            )}
        </div>
    );
};

export default Profile;
