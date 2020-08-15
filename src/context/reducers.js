export const initialState = {
    user: null,
    patient: null,
    patients: [],
    createStatus: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.user };
        case "SET_PATIENT":
            return { ...state, patient: action.patient };
        case "UPDATE_PATIENT":
            return {
                ...state,
                patient: { ...state.patient, ...action.patient },
            };
        case "SET_PATIENT_LIST":
            return { ...state, patients: action.patients };
        case "CREATE_PATIENT":
            return { ...state, createStatus: action.status };
        default:
            return state;
    }
};

export default reducer;
