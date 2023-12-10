import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSun,
    faMoon,
    faEnvelope,
    faBullhorn,
    faTicketAlt,
    faCloudMoon,
    faHome,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import custom_header from "../Header/header";
import Modal from "react-modal";
import TicketForm from "../CreateTickets/createtickets";

const Announcements = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const params = useParams();
    const navigate = useNavigate();
    const itemsPerPage = 5; // pagenation
    const [announcements, setAnnouncements] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

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

    const [announcementDetails, setAnnouncementDetails] = useState({
        title: "",
        description: "",
    });
    const [message, setMessage] = useState({
        content: "",
        type: "", // "warning" or "success"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnnouncementDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleCreateAnnouncement = async () => {
        try {
            // Simulate success, replace with actual API call
            // For example purposes, always show a success message
            setMessage({
                content: "Announcement created successfully!",
                type: "success",
            });

            const token = localStorage.getItem("token");
            const response = await axios.post(
                `http://localhost:5000/announcements/`,
                {
                    title: announcementDetails.title,
                    description: announcementDetails.description,
                    serverId: params.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);

            // add announcement to the list
            setAnnouncements((prevAnnouncements) => [
                ...prevAnnouncements,
                response.data.newAnnouncement,
            ]);

            // After successful creation, close the modal and reset form
            setModalIsOpen(false);
            setAnnouncementDetails({
                title: "",
                description: "",
            });
        } catch (error) {
            // Simulate an error, replace with actual error handling
            setMessage({
                content: "Error creating announcement. Please try again.",
                type: "warning",
            });
            console.error("Error creating announcement: ", error);
        }
    };

    const handleDeleteClick = async (announcement) => {
        try {
            // Simulate success, replace with actual API call
            // For example purposes, always show a success message
            setMessage({
                content: "Announcement deleted successfully!",
                type: "success",
            });

            const token = localStorage.getItem("token");
            const response = await axios.delete(
                `http://localhost:5000/announcements/${announcement._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);

            // remove announcement from list
            setAnnouncements((prevAnnouncements) =>
                prevAnnouncements.filter(
                    (prevAnnouncement) =>
                        prevAnnouncement._id !== announcement._id
                )
            );

            // After successful creation, close the modal and reset form
            setModalIsOpen(false);
            setAnnouncementDetails({
                title: "",
                description: "",
            });
        } catch (error) {
            // Simulate an error, replace with actual error handling
            setMessage({
                content: "Error deleting announcement. Please try again.",
                type: "warning",
            });
            console.error("Error deleting announcement: ", error);
        }
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
            {custom_header(
                "This Server's Announcements",
                darkMode,
                toggleDarkMode,
                handleLogout,
                handleHomeClick
            )}

            {/* Content area */}
            <div
                className={`bg-${
                    darkMode ? "gray-900" : "white-800"
                } grid grid-cols-12 gap-6 h-screen`}
            >
                {/* Left column for chat, announcements, and tickets */}
                <div className="col-span-3 bg-gray-200">
                    <button
                        onClick={handleAnnouncementsClick}
                        className="w-full p-2 mb-2 rounded-md text-left bg-indigo-500 text-white"
                    >
                        Announcements
                    </button>
                    <button
                        onClick={handleChatClick}
                        className="w-full p-2 mb-2 rounded-md text-left "
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
                    <div className="flex justify-between items-center mb-4">
                        <h2
                            className={`text-2xl font-bold ${
                                darkMode ? "text-white" : "text-black"
                            }`}
                        >
                            Announcements
                        </h2>
                        <button
                            onClick={() => setModalIsOpen(true)}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-md mr-4"
                        >
                            Create Annnouncement
                        </button>
                    </div>

                    {/* Display Announcements */}
                    {announcements.map((announcement) => (
                        <div
                            key={announcement._id}
                            className="mb-8 bg-white p-6 rounded-md shadow-md"
                        >
                            <h3 className="text-xl font-bold mb-2">
                                {announcement.title}
                            </h3>
                            <p className="text-gray-500 mb-2">
                                {announcement.date}
                            </p>
                            <p className="text-gray-800">
                                {announcement.description}
                            </p>
                            <p className="text-gray-500 mt-2">
                                Created by: {announcement.createdBy.name}
                            </p>
                            <button
                                onClick={() => handleDeleteClick(announcement)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                            >
                                Delete Announcement
                            </button>
                        </div>
                    ))}

                    {/* Pagination */}
                    <div className="flex justify-center mt-4">
                        {Array.from(
                            {
                                length: Math.ceil(
                                    announcements.length / itemsPerPage
                                ),
                            },
                            (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`mx-1 px-3 py-2 rounded-md ${
                                        currentPage === index + 1
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-300 text-gray-700"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            )
                        )}
                    </div>

                    {/* Ticket Creation Modal */}
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => {
                            setModalIsOpen(false);
                            // Clear the message when the modal is closed
                            setMessage({
                                content: "",
                                type: "",
                            });
                        }}
                        contentLabel="Create Announcement Modal"
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold mb-4">
                                Create Announcement
                            </h2>
                            <button
                                onClick={() => {
                                    setModalIsOpen(false);
                                    setMessage({
                                        content: "",
                                        type: "",
                                    });
                                }}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="text-xl"
                                />
                            </button>
                        </div>
                        {message.content && (
                            <div
                                className={`mb-4 p-2 rounded-md ${
                                    message.type === "success"
                                        ? "bg-green-200 text-green-800"
                                        : "bg-red-200 text-red-800"
                                }`}
                            >
                                {message.content}
                            </div>
                        )}
                        <form>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="title"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={announcementDetails.title}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="description"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={announcementDetails.description}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleCreateAnnouncement}
                                className="bg-indigo-500 text-white px-4 py-2 rounded-md"
                            >
                                Create Announcement
                            </button>
                        </form>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Announcements;
