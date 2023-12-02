import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faEnvelope, faBullhorn, faTicketAlt, faCloudMoon, faHome } from "@fortawesome/free-solid-svg-icons";
import custom_header from "../Header/header";
import axios from "axios";



const Chats = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate()
    const itemsPerPage = 5; // pagenation
    const params = useParams();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [darkMode, setDarkMode] = useState(false);
    const [chat, setChat] = useState([]);

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:5000/getHistory/${params.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response.data);
                setChat(response.data.chats);
            } catch (error) {
                console.error("Error fetching chat: ", error);
            }
        };

        fetchChat();
    }, [params.id]);

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
            {/* <div className={`bg-${darkMode ? 'gray-900' : 'white-800'} text-white p-4`}>
                <div className="flex justify-between items-center">
                    <h2 className={`text-lg font-bold ${darkMode ? 'text-black' : 'text-black'}`}>this Server's Chat</h2>
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
            {custom_header("Chat", darkMode, toggleDarkMode, handleLogout, handleHomeClick)}


            {/* Content area */}
            <div className={`bg-${darkMode ? 'gray-900' : 'white-800'} grid grid-cols-12 gap-6 h-screen`}>
                {/* Left column for chat, announcements, and tickets */}
                <div className="col-span-3 bg-gray-200">
                    <button
                        onClick={handleAnnouncementsClick}
                        className="w-full p-2 mb-2  text-left"
                    >
                        Announcements
                    </button>
                    <button
                        onClick={handleChatClick}
                        className="w-full p-2 mb-2  text-left bg-indigo-500 text-white"
                    >
                        Chat
                    </button>
                    <button
                        onClick={handleTicketsClick}
                        className="w-full p-2 mb-2  text-left"
                    >
                        Tickets
                    </button>
                </div>

                {/* Main content area */}
                <div className="col-span-9">
                    <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Chat</h2>

                    {/* Display Announcements */}
                    {chat.map((message) => (
                        <div key={message._id} className="mb-8 bg-white p-6 rounded-md shadow-md">
                            {/* Capitalize first letter of the name */}
                            <h3 className="text-xl mb-2">{message.sender.name.charAt(0).toUpperCase() + message.sender.name.slice(1)}</h3>
                            <p className="text-gray-400 mt-2 text-xs">{message.createdAt}</p>
                            <p className="text-gray-800 mt-2">{message.body}</p>
                        </div>
                    ))}

                    {/* Pagination */}
                    {/* <div className="flex justify-center mt-4">
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
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Chats;