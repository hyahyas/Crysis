import React, { useState } from "react";
//import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Login from "./components/Login/login";
import Login2 from "./components/Login/login2"
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp/signup";
import Test from "./components/Test/Test";
import CreateTeam from "./components/CreateTeam/createTeam";
import ServerTickets from "./components/ServerTickets/tickets";
import CreateTickets from "./components/CreateTickets/createtickets"
import ServerAnnouncements from "./components/ServerAnnouncements/announcements"
import SeverChat from "./components/ServerChat/chat"


function App() {
    return (
        <>
            <div className="App">
                <div className="App-header">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/login2" element={<Login2 />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/test" element={<Test />} />
                            <Route path="/newteam" element={<CreateTeam />} />
                            <Route path="/tickets/:id" element={<ServerTickets />} />
                            <Route path="/chat" element={<SeverChat />} />
                            <Route path="/announcements/:id" element={<ServerAnnouncements />} />
                            <Route path="/createticket" element={<CreateTickets />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </>
    );
}

export default App;
