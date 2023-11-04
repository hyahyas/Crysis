import React, { useState } from "react";
import axios from "axios";
import './signup.css'


const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/signUp/", {
                name,
                email,
                password 
            });
            console.log(response.data); // Handle the response data as needed
        } catch (error) {
            console.error("Error Signing up: ", error);
        }
    };

    return (
        <>
            <div className="container">
                <div className="Left">
                    <h5>Welcome to Crysis</h5>
                    {/* <br /> */}
                    <p>Got a crysis? Get Crysis</p>
                    <p>Sign up</p>

                </div>

                <div className="Right">
                    <h2>Signup</h2>
                    <form onSubmit={handleLogin} className="usersignup">
                        {/* Form inputs for email and password */}
                        <input
                            type="Name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div>
                            <button type="submit">Signup</button>
                        </div>
                    </form>
                </div>

            </div>

        </>
    );
};

export default Signup;
