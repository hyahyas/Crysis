// import React, { useState } from "react";
// import axios from "axios";
// import "./signup.css";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [name, setName] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:5000/signUp/", {
//                 name,
//                 email,
//                 password,
//             });
//             console.log(response.data); // Handle the response data as needed
//         } catch (error) {
//             console.error("Error Signing up: ", error);
//         }
//     };

//     const goToLogin = () => {
//         navigate("/");
//     };

//     return (
//         <>
//             <div className="container">
//                 <div className="Left">
//                     <h5>Welcome to Crysis</h5>
//                     <p>Got a crysis? Get Crysis</p>
//                 </div>

//                 <div className="Right">
//                     <h2>Signup</h2>
//                     <form onSubmit={handleLogin} className="usersignup">
//                         {/* Form inputs for email and password */}
//                         <input
//                             type="Name"
//                             placeholder="Name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                         />
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <div>
//                             <button type="submit">Signup</button>
//                         </div>
//                         <a onClick={goToLogin}>
//                             Already have an account? Login
//                         </a>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Signup;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/crysis_logo.png"

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/signUp/", {
                name,
                email,
                password,
            });
            console.log(response.data); // Handle the response data as needed
        } catch (error) {
            console.error("Error Signing up: ", error);
        }
    };

    const goToLogin = () => {
        navigate("/");
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Container with Logo */}
            <div className="hidden lg:flex flex-col items-center justify-center flex-1 bg-indigo-600 text-white">
                <img
                    className="h-32 w-32 mb-4"
                    src={logo}
                    alt="Crysis Logo"
                />
                <h5 className="text-2xl font-bold mb-4">Welcome to Crysis</h5>
                <p>Got a crisis? Get Crysis</p>
            </div>

            {/* Right Container */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-2xl font-bold leading-9 text-gray-900 mb-8">
                        Signup
                    </h2>
                    <form onSubmit={handleSignup} className="space-y-4">
                        {/* Form inputs for name, email, and password */}
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-indigo-300"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-indigo-300"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-indigo-300"
                        />
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
                            >
                                Signup
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 text-center">
                            Already have an account?{" "}
                            <span
                                className="text-indigo-600 cursor-pointer"
                                onClick={goToLogin}
                            >
                                Login
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;


