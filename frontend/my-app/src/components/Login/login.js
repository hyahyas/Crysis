// import React, { useState } from "react";
// import axios from "axios";
// import "./login.css";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const baseURL = "http://localhost:5000";

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(`${baseURL}/signIn`, {
//                 email,
//                 password,
//             });
//             console.log("dddddd", response.data);
//             if (response.data.message === "Sign in successful") {
//                 const token = response.data.accessToken;
//                 localStorage.setItem("token", token);
//                 navigate("/home");
//             } else {
//                 alert("Incorrect email or password");
//                 console.log("ssss", response.data);
//             }
//         } catch (error) {
//             console.error("Error logging in: ", error);
//             if (error.response.status === 400) {
//                 alert("Incorrect email or password");
//             }
//         }
//     };

//     const goToSignUp = () => {
//         navigate("/signup");
//     };

//     const goToForgotPassword = () => {
//         navigate("/forgotpassword");
//     };

//     return (
//         <>
//             <div className="container">
//                 <div className="Left">
//                     <h5>Welcome to Crysis</h5>
//                     <p>Got a crisis? Get Crysis</p>
//                 </div>

//                 <div className="Right">
//                     <h2>Login</h2>
//                     <form onSubmit={handleLogin} className="userlogin">
//                         {/* Form inputs for email and password */}
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
//                             <button type="submit">Login</button>
//                         </div>
//                     </form>
//                     {/* forgot password page and sign up page redirect buttons */}
//                     <div className="links">
//                         <button className="link" onClick={goToForgotPassword}>
//                             Forgot Password?
//                         </button>
//                         <br />
//                         <button className="link" onClick={goToSignUp}>
//                             Sign Up
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Login;



// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import logo from "../Assets/crysis_logo.png"

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const baseURL = "http://localhost:5000";

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(`${baseURL}/signIn`, {
//                 email,
//                 password,
//             });
//             console.log("dddddd", response.data);
//             if (response.data.message === "Sign in successful") {
//                 const token = response.data.accessToken;
//                 localStorage.setItem("token", token);
//                 navigate("/home");
//             } else {
//                 alert("Incorrect email or password");
//                 console.log("ssss", response.data);
//             }
//         } catch (error) {
//             console.error("Error logging in: ", error);
//             if (error.response.status === 400) {
//                 alert("Incorrect email or password");
//             }
//         }
//     };

//     const goToSignUp = () => {
//         navigate("/signup");
//     };

//     const goToForgotPassword = () => {
//         navigate("/forgotpassword");
//     };

//     return (
//         <>
//             <div className="flex min-h-screen">
//                 {/* Left Container */}
//                 <div className="hidden lg:flex flex-col items-center justify-center flex-1 bg-indigo-600 text-white">
//                     <img
//                         className="h-[20%] w-[20%] mb-4"
//                         src={logo}
//                         alt="Crises"
//                     />
//                     <h5 className="text-2xl font-bold mb-4">Welcome to Crysis</h5>
//                 <p>Got a crisis? Get Crysis</p>

//                 </div>

//                 {/* Right Container */}
//                 <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
//                     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//                         <h2 className="text-2xl font-bold leading-9 text-gray-900 mb-8">
//                             Login
//                         </h2>
//                         <form className="space-y-6" onSubmit={handleLogin}>
//                             <div>
//                                 <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
//                                     Email address
//                                 </label>
//                                 <div className="mt-2">
//                                     <input
//                                         id="email"
//                                         name="email"
//                                         type="email"
//                                         autoComplete="email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                     />
//                                 </div>
//                             </div>

//                             <div>
//                                 <div className="flex items-center justify-between">
//                                     <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
//                                         Password
//                                     </label>
//                                     <div className="text-sm">
//                                         <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
//                                             Forgot password?
//                                         </a>
//                                     </div>
//                                 </div>
//                                 <div className="mt-2">
//                                     <input
//                                         id="password"
//                                         name="password"
//                                         type="password"
//                                         autoComplete="current-password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         required
//                                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                     />
//                                 </div>
//                             </div>

//                             <div>
//                                 <button
//                                     type="submit"
//                                     className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                                 >
//                                     Sign in
//                                 </button>
//                             </div>
//                         </form>

//                         <p className="mt-10 text-center text-sm text-gray-500">
//                             {/* Not a member?  Signup{onclick={goToSignUp}} */}
//                             <a href="/signup"> Not a member? <span
//                                 className="text-indigo-600 cursor-pointer"
//                                 onClick={goToSignUp}
//                             >
//                                 Signup
//                             </span></a>
// //                         </p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Login;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdjust } from "@fortawesome/free-solid-svg-icons";
import logo from "../Assets/crysis_logo.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [darkMode, setDarkMode] = useState(true); // Track dark mode
    const navigate = useNavigate();

    const baseURL = "http://localhost:5000";

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseURL}/signIn`, {
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

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    

    return (
        <>
            <div className={`flex min-h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                    {/* Left Container */}
                <div className={`hidden lg:flex flex-col items-center justify-center flex-1 ${darkMode ? 'bg-indigo-600' : 'bg-gray-800'} text-white`}>
                    <img className="h-[20%] w-[20%] mb-4" src={logo} alt="Crises" />
                    <h5 className="text-2xl font-bold mb-4">Welcome to Crysis!</h5>
                    <p>Got a crisis? Get Crysis!</p>
                    </div>

                    {/* Right Container */}
                    <div className={`flex-1 flex flex-col items-center justify-center p-6 sm:p-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-md`}>
                    <div className="absolute left-4 bottom-4">
                        <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full ${darkMode ? 'bg-indigo-500' : 'bg-white'} hover:bg-indigo-400 focus:outline-none focus:ring focus:border-indigo-300`}
                        >
                        <FontAwesomeIcon icon={faAdjust} className={darkMode ? "text-white" : "text-gray-800"} />
                        </button>
                </div>

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className={`text-2xl font-bold leading-9 ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>
                            Login
                        </h2>
                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email" className={`block text-sm font-medium leading-6 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                    Email address
                                </label>
                                <div className="mt-2 text">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                <label htmlFor="password" className={`block text-sm font-medium leading-6 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className={`font-semibold text-indigo-600 hover:text-indigo-500 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            {/* Not a member?  Signup{onclick={goToSignUp}} */}
                            <a href="/signup"> Not a member? <span
                                className="text-indigo-600 cursor-pointer"
                                onClick={goToSignUp}
                            >
                                Signup
                            </span></a>
                         </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;


