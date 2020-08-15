import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

// Context API imports
import { StateProvider } from "./context/contextSetup";
import reducer, { initialState } from "./context/reducers";

ReactDOM.render(
    <React.StrictMode>
        {/* Context API wrapper over the entire App */}
        <StateProvider initialState={initialState} reducer={reducer}>
            <App />
        </StateProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
