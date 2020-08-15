import React, { createContext, useContext, useReducer } from "react";

// Data layer
export const StateContext = createContext();

// Provider
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// For using state value in component
export const useStateValue = () => useContext(StateContext);
