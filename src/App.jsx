import './App.css'
import {Routes, Route, Navigate} from "react-router-dom";

import Navigation from "./components/navigation/Navigation.jsx";
import Homepage from "./pages/homepage/Homepage.jsx";
import Contact from "./pages/contact/Contact";
import Menu from "./pages/menu/Menu.jsx";
import Webshop from "./pages/webshop/Webshop";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile.jsx";
import {useContext} from "react";
import {AuthenticationContext} from "./context/AuthenticationContext.jsx";


function App() {
    const {isUser} = useContext(AuthenticationContext);

    return (
        <>
            <Navigation/>

            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/webshop" element={<Webshop/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={isUser ? <Profile/> : <Navigate to="/signup"/>} />
            </Routes>

        </>
    )
}

export default App
