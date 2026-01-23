import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom";
import AuthenticationContextProvider, {AuthenticationContext} from "./context/AuthenticationContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <AuthenticationContextProvider>
            <App/>
            </AuthenticationContextProvider>
        </Router>
    </React.StrictMode>,
)
