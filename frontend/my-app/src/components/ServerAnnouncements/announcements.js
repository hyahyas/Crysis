import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faEnvelope, faBullhorn, faTicketAlt, faCloudMoon, faHome } from "@fortawesome/free-solid-svg-icons";
import custom_header from "../Header/header";


const Announcements = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const params = useParams();
    const navigate = useNavigate()
    const itemsPerPage = 5; // pagenation
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:5000/announcements/${params.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response.data);
                setAnnouncements(response.data);
            } catch (error) {
                console.error("Error fetching announcements: ", error);
            }
        };

        fetchAnnouncements();
    }, [params.id]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentAnnouncements = placeholderAnnouncements.slice(indexOfFirstItem, indexOfLastItem);
    const [darkMode, setDarkMode] = useState(false);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleChatClick = () => {
        navigate(`/chat/${params.id}`);
    };

    const handleAnnouncementsClick = () => {
        // No need to navigate, as the announcements are already on this page
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
            {/* <div className={`bg-${darkMode ? 'gray-900' : 'white-800'} text-white p-4`}>
                <div className="flex justify-between items-center">
                    <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>This Server's Announcements</h2>
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
            </div> */}
            {custom_header("Announcements", darkMode, toggleDarkMode, handleLogout, handleHomeClick)}


            {/* Content area */}
            <div className={`bg-${darkMode ? 'gray-900' : 'white-800'} grid grid-cols-12 gap-6 h-screen`}>
                {/* Left column for chat, announcements, and tickets */}
                <div className="col-span-3 bg-gray-200">
                    <button
                        onClick={handleAnnouncementsClick}
                        className="w-full p-2 mb-2  text-left bg-indigo-500 text-white"
                    >
                        Announcements
                    </button>
                    <button
                        onClick={handleChatClick}
                        className="w-full p-2 mb-2  text-left "
                    >
                        Chat
                    </button>
                    <button
                        onClick={handleTicketsClick}
                        className="w-full p-2 mb-2  text-left "
                    >
                        Tickets
                    </button>
                </div>

                {/* Main content area */}
                <div className="col-span-9">
                    <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Announcements</h2>

                    {/* Display Announcements */}
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="mb-8 bg-white p-6 rounded-md shadow-md">
                            <h3 className="text-xl font-bold mb-2">{announcement.title}</h3>
                            <p className="text-gray-500 mb-2">{announcement.date}</p>
                            <p className="text-gray-800">{announcement.description}</p>
                            <p className="text-gray-500 mt-2">Created by: {announcement.createdBy.name}</p>
                        </div>
                    ))}

                    {/* Pagination */}
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: Math.ceil(announcements.length / itemsPerPage) }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`mx-1 px-3 py-2 rounded-md ${
                                    currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Announcements;