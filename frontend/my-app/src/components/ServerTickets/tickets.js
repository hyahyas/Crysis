import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import Link and useParams for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TicketForm from "../CreateTickets/createtickets";
import { faSun, faMoon, faEnvelope, faBullhorn, faTicketAlt, faCloudMoon, faHome } from "@fortawesome/free-solid-svg-icons";

const Tickets = () => {
    const params = useParams();
    const [tickets, setTickets] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:5000/getAllTickets/${params.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response.data);
                setTickets(response.data);
            } catch (error) {
                console.error("Error fetching tickets: ", error);
            }
        };

        fetchTickets();
    }, [params.id]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const [selectedTab, setSelectedTab] = useState("tickets");

    const switchTab = (tab) => {
        setSelectedTab(tab);
    };

    const handleChat = () => {
        navigate(`/chat/${params.id}`);
    };
    const handleannouncements = () => {
        navigate(`/announcements/${params.id}`);
    };
    const handletickets = () => {
        navigate(`/tickets/${params.id}`);
    };

    const handleCreateTicket = (newTicket) => {
        setTickets((prevTickets) => [newTicket, ...prevTickets]);
        closeModal();
    };

    const handleHomeClick = () => {
        navigate("/home");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div>
            {/* Top header (black) */}
            <div className={`bg-${darkMode ? 'gray-900' : 'white-800'} text-white p-4`}>
                <div className="flex justify-between items-center">
                    <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>This Server's Tickets</h2>
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
            <div className={`bg-${darkMode ? 'gray-900' : 'white-800'} grid grid-cols-12 gap-6 h-screen`}>
                
                {/* Left Side Column */}
                {/* <div className="w-1/4 bg-gray-200">
                    <button
                        onClick={handleannouncements}
                        className={`w-full p-2 mb-2 rounded-md text-left ${
                            selectedTab === "announcements"
                                ? "bg-indigo-500 text-white"
                                : "hover:bg-gray-300"
                        }`}
                    >
                        Announcements
                    </button>
                    <button
                        onClick={handleChat}
                        className={`w-full p-2 mb-2 rounded-md text-left ${
                            selectedTab === "chat"
                                ? "bg-indigo-500 text-white"
                                : "hover:bg-gray-300"
                        }`}
                    >
                        Chat
                    </button>
                    <button
                        onClick={handletickets}
                        className={`w-full p-2 mb-2 rounded-md text-left ${
                            selectedTab === "tickets"
                                ? "bg-indigo-500 text-white"
                                : "hover:bg-gray-300"
                        }`}
                    >
                        Tickets
                    </button>
                </div> */}
                <div className="col-span-3 bg-gray-200">
                    <button
                        onClick={handleannouncements}
                        className="w-full p-2 mb-2 rounded-md text-left"
                    >
                        Announcements
                    </button>
                    <button
                        onClick={handleChat}
                        className="w-full p-2 mb-2 rounded-md text-left "
                    >
                        Chat
                    </button>
                    <button
                        onClick={handletickets}
                        className="w-full p-2 mb-2 rounded-md text-left bg-indigo-500 text-white"
                    >
                        Tickets
                    </button>
                </div>

                {/* Main Content */}
                <div className="col-span-9">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Tickets</h2>
                        <button
                            onClick={openModal}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-md end"
                        >
                            Create Ticket
                        </button>
                    </div>

                    {/* Tickets */}
                    <div className="flex flex-wrap">
                        {tickets.map((ticket, index) => (
                            <div
                                key={index}
                                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                            >
                                <div className="bg-white p-4 rounded-md shadow-md">
                                    <p className="font-semibold">
                                        Ticket {ticket.title}
                                    </p>
                                    <p className="text-gray-500 mt-2">
                                        Assignee: {ticket.assignee.name}
                                    </p>
                                    <p className="text-gray-500">
                                        Reporter: {ticket.reporter.name}
                                    </p>
                                    <p className="text-gray-500">Status: {ticket.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Ticket Creation Modal */}
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Create Ticket Modal"
                    >
                        {/* ... (TicketForm component) */}
                        <TicketForm
                            closeModal={closeModal}
                            handleCreateTicket={handleCreateTicket}
                            serverId={params.id}
                        />
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Tickets;
