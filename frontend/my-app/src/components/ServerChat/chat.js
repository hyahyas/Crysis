import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faEnvelope, faBullhorn, faTicketAlt, faCloudMoon, faHome } from "@fortawesome/free-solid-svg-icons";


const Chats = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate()
    const itemsPerPage = 5; // pagenation
    const params = useParams();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [darkMode, setDarkMode] = useState(false);

    const handleChatClick = () => {
        // No need to navigate, as the announcements are already on this page
    };

    const handleAnnouncementsClick = () => {
        navigate(`/announcements/${params.id}`);
    };

    const handleTicketsClick = () => {
        navigate(`/tickets/${params.id}`);
    };
    const handleHomeClick = () => {
        navigate("/home");
    };
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div>
            {/* Top header (black) */}
            <div className={`bg-${darkMode ? 'gray-900' : 'white-800'} text-white p-4`}>
                <div className="flex justify-between items-center">
                    <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>This Server's Chat</h2>
                    <div className="flex space-x-4">
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


            {/* Content area */}
            <div className={`bg-${darkMode ? 'gray-900' : 'white-800'} grid grid-cols-12 gap-6 h-screen`}>
                {/* Left column for chat, announcements, and tickets */}
                <div className="col-span-3 bg-gray-200">
                    <button
                        onClick={handleAnnouncementsClick}
                        className="w-full p-2 mb-2 rounded-md text-left"
                    >
                        Announcements
                    </button>
                    <button
                        onClick={handleChatClick}
                        className="w-full p-2 mb-2 rounded-md text-left bg-indigo-500 text-white"
                    >
                        Chat
                    </button>
                    <button
                        onClick={handleTicketsClick}
                        className="w-full p-2 mb-2 rounded-md text-left "
                    >
                        Tickets
                    </button>
                </div>

                {/* Main content area */}
                <div className="col-span-9">
                    <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Chats</h2>

                    
                    
                </div>
            </div>
        </div>
    );
};

export default Chats;