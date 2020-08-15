export const initialState = {
    user: null,
    patient: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.user };
        case "SET_PATIENT":
            return { ...state, patient: action.patient };
        case "UPDATE_PWD":
            return {
                ...state,
                patient: { ...state.patient, password: action.password },
            };
        default:
            return state;
    }
};

export default reducer;
