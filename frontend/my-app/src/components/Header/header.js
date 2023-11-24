import React from "react";
import { Link } from "react-router-dom";


const header = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">this Server's Chat</h2>
                <div className="flex space-x-4">
                    <button className="bg-indigo-500 px-4 py-2 rounded-md">
                        <FontAwesomeIcon icon={faSun} className="text-white" />
                    </button>
                    <button className="bg-red-500 px-4 py-2 rounded-md">
                        Logout
                    </button>
                    <button className="bg-red-500 px-4 py-2 rounded-md">
                        <FontAwesomeIcon icon={faHome} className="text-white" />
                    </button>
                    
                </div>
            </div>
        </div>
    );
}