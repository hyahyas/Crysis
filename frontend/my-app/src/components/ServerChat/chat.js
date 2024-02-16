import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSun,
    faMoon,
    faEnvelope,
    faBullhorn,
    faTicketAlt,
    faCloudMoon,
    faHome,
} from "@fortawesome/free-solid-svg-icons";
import custom_header from "../Header/header";
import axios from "axios";
import { useSelector } from "react-redux";

const Chats = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const itemsPerPage = 5; // pagenation
    const params = useParams();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [darkMode, setDarkMode] = useState(false);
    const [chat, setChat] = useState([]);

    const serverName = useSelector((state) => state.serverName);

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
            </div> */}
            {custom_header(`${serverName}`, handleLogout, handleHomeClick)}

            {/* Content area */}
            <div className={`bg-gray-900 grid grid-cols-12 gap-6 h-screen`}>
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
                    <h2 className={`text-2xl font-bold mb-4 text-white`}>
                        Chat
                    </h2>

                    {/* Display Announcements */}
                    {chat.map((message) => (
                        <div
                            key={message._id}
                            className="mb-8 bg-white p-6 rounded-md shadow-md"
                        >
                            {/* Capitalize first letter of the name */}
                            <h3 className="text-xl mb-2">
                                {message.sender.name.charAt(0).toUpperCase() +
                                    message.sender.name.slice(1)}
                            </h3>
                            <p className="text-gray-400 mt-2 text-xs">
                                {message.createdAt}
                            </p>
                            <p className="text-gray-800 mt-2">{message.body}</p>
                        </div>
                    ))}

                    {/* Input box */}
                    <div class="py-80">
                        <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                            <div>
                                <button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
                                    <svg
                                        class="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            <div class="flex-grow ml-4">
                                <div class="relative w-full">
                                    <input
                                        type="text"
                                        class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                    />
                                    <button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                                        <svg
                                            class="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="ml-4">
                                <button class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                                    <span>Send</span>
                                    <span class="ml-2">
                                        <svg
                                            class="w-4 h-4 transform rotate-45 -mt-px"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                            ></path>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

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
