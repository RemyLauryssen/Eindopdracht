import './App.css'
import {Routes, Route} from "react-router-dom";

import Navigation from "./components/navigation/Navigation.jsx";
import Homepage from "./pages/homepage/Homepage.jsx";
import Contact from "./pages/contact/Contact";
import Menu from "./pages/menu/Menu";
import Webshop from "./pages/webshop/Webshop";
import Login from "./pages/login/Login";


function App() {
    return (
        <>
            <Navigation/>

            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/webshop" element={<Webshop/>}/>
                <Route path="login" element={<Login/>}/>
            </Routes>

        </>
    )
}

export default App
