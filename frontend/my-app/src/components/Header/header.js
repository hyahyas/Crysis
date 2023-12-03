import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faHome, faUserPlus } from "@fortawesome/free-solid-svg-icons";


const custom_header = (heading, darkMode, toggleDarkMode, handleLogout, handleHomeClick) => {
    return (
        <div>
            <div className={`bg-${darkMode ? 'gray-900' : 'white-800'} text-white p-4`}>
                <div className="flex justify-between items-center">
                    <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>{heading}</h2>
                    <div className="flex space-x-4">
                        <button
                                onClick={()=>alert("This feature is not available yet")}
                                className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md float-right ${
                                    darkMode ? "dark:bg-gray-600" : ""
                                }`}
                        >
                            <FontAwesomeIcon icon={faUserPlus} />
                        </button>
                        <button onClick={toggleDarkMode} className={`bg-indigo-500 px-4 py-2 rounded-md ${darkMode ? 'dark:bg-black-700' : ''}`}>
                            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="text-white" />
                        </button>
                        <button onClick={handleLogout} className={`bg-red-500 px-4 py-2 rounded-md ${darkMode ? 'dark:bg-red-600' : ''}`}>
                            Logout
                        </button>
                        <button onClick={handleHomeClick} className={`bg-red-500 px-4 py-2 rounded-md ${darkMode ? 'dark:bg-red-600' : ''}`}>
                            <FontAwesomeIcon icon={darkMode ? faHome:faHome} className="text-white" />
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default custom_header;