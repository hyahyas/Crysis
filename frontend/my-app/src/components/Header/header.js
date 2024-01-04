import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import logo from "../Assets/crysis_logo.png";

const custom_header = (heading, handleLogout, handleHomeClick) => {
    return (
        <div>
            <div className={`bg-${"gray-900"} text-white p-4`}>
                <div className="flex justify-between items-center">
                    <img className="h-12 w-auto" src={logo} alt="Crysis" />
                    <h1 className={`text-2xl font-bold ${"text-white"}`}>
                        {heading}
                    </h1>
                    <div className="flex space-x-4">
                        {/* <button
                                onClick={()=>alert("This feature is not available yet")}
                                className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md float-right ${"dark:bg-gray-600"}`}
                        >
                            <FontAwesomeIcon icon={faUserPlus} />
                        </button> */}

                        <button
                            onClick={handleLogout}
                            className={`bg-red-500 px-4 py-2 rounded-md ${"dark:bg-red-600"}`}
                        >
                            Logout
                        </button>
                        <button
                            onClick={handleHomeClick}
                            className={`bg-red-500 px-4 py-2 rounded-md ${"dark:bg-red-600"}`}
                        >
                            <FontAwesomeIcon
                                icon={faHome}
                                className="text-white"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default custom_header;
