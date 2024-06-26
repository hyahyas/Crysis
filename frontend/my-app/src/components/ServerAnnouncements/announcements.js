import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import custom_header from "../Header/header";
import Modal from "react-modal";
import { useSelector } from "react-redux";

const Announcements = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const params = useParams();
    const navigate = useNavigate();
    const itemsPerPage = 5; // pagenation
    const [announcements, setAnnouncements] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const serverName = useSelector((state) => state.serverName);

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
            {custom_header(`${serverName}`, handleLogout, handleHomeClick)}

            <div className={`bg-gray-900 grid grid-cols-12 gap-6 h-screen`}>
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

                <div className="col-span-9">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className={`text-2xl font-bold text-white`}>
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
                            <p className="text-gray-500">
                                {new Date(announcement.date).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                )}
                            </p>
                            <p className="text-gray-500">
                                Created by: {announcement.createdBy.name}
                            </p>
                            <p className="text-gray-800 mt-2 mb-4">
                                Description: {announcement.description}
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
                            {/* <button
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
                            </button> */}
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
                                className={`w-1/2 bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300 dark:bg-gray-600`}
                            >
                                Create Team
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setModalIsOpen(false);
                                    setMessage({
                                        content: "",
                                        type: "",
                                    });
                                }}
                                className={`w-1/2 bg-gray-300 text-gray-800 p-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-indigo-300 ${
                                    darkMode ? "dark:bg-gray-600" : ""
                                }`}
                            >
                                Cancel
                            </button>
                        </form>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Announcements;
