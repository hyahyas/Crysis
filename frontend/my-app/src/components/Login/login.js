import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/signIn/", {
                email,
                password,
            });
            console.log("dddddd", response.data);
            if (response.data.message === "Sign in successful") {
                const token = response.data.accessToken;
                localStorage.setItem("token", token);
                navigate("/home");
            } else {
                alert("Incorrect email or password");
                console.log("ssss", response.data);
            }
        } catch (error) {
            console.error("Error logging in: ", error);
            if (error.response.status === 400) {
                alert("Incorrect email or password");
            }
        }
    };

    const goToSignUp = () => {
        navigate("/signup");
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
                    {/* need to beautify this looks ugly */}
                    <a onClick={goToSignUp}>Dont have an account? Sign Up</a>
                </div>
            </div>
        </>
    );
};

export default Login;
