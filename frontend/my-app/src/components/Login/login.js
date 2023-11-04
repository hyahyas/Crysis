import React, { useState } from "react";
import axios from "axios";
import './login.css'


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/signIn/", {
                email,
                password,
            });
            console.log(response.data); // Handle the response data as needed
        } catch (error) {
            console.error("Error logging in: ", error);
        }
    };

    return (
        <>
            <div className="container">
                <div className="Left">
                    <h5>Welcome to Crysis</h5>
                    {/* <br /> */}
                    <p>Got a crysis? Get Crysis</p>

                </div>

                <div className="Right">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin} className="userlogin">
                        {/* Form inputs for email and password */}
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
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>

            </div>

        </>
    );
};

export default Login;
