import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Login from "./components/Login/login";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp/signup";

function App() {
    return (
        <>
            <div className="App">
                <div className="App-header">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/signup" element={<SignUp />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </>
    );
}

export default App;
