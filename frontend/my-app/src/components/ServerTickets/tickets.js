import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import Link and useParams for navigation
import custom_header from "../Header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faHome } from "@fortawesome/free-solid-svg-icons";
import TicketForm from "../CreateTickets/createtickets";

const Tickets = () => {
    const params = useParams();
    const [tickets, setTickets] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpenstatus, setModalIsOpenstatus] = useState(false);
    const [modalIsOpenAddMember, setModalIsOpenAddMember] = useState(false); // New state for Add Member modal
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [newAssignee, setNewAssignee] = useState("");
    const [newMemberEmail, setNewMemberEmail] = useState(""); // New state for handling new member email

    const handleTicketClick = (ticket) => {
        setSelectedTicket(ticket);
    };

    const handleDeleteClick = async (ticket) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(
                `http://localhost:5000/ticket/${ticket._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            setTickets((prevTickets) =>
                prevTickets.filter(
                    (prevTicket) => prevTicket._id !== ticket._id
                )
            );
        } catch (error) {
            console.error("Error deleting ticket: ", error);
        }
    };

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

    const openModalstatus = () => {
        setModalIsOpenstatus(true);
    };

    const closeModalstatus = () => {
        setModalIsOpenstatus(false);
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
    };
    const handleUpdateStatus = async () => {
        try {
            console.log("Reached here");
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:5000/changeTicketStatus/`,
                {
                    status: newStatus,
                    ticketId: selectedTicket._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (
                response.data.message === "Ticket status updated successfully"
            ) {
                // Update the status in the local state
                const updatedTickets = tickets.map((ticket) =>
                    ticket._id === selectedTicket._id
                        ? { ...ticket, status: newStatus }
                        : ticket
                );

                setTickets(updatedTickets);
            } else {
                console.error(
                    "Ticket status update failed:",
                    response.data.message
                );
            }
        } catch (error) {
            console.error("Error updating ticket status: ", error);
        }

        // Close the modal after updating status
        setSelectedTicket(null);
        // const servername

        const handleCreateTicket = (newTicket) => {
            setTickets((prevTickets) => [newTicket, ...prevTickets]);
            closeModal();
        };
    };

    return (
        <div>
            {custom_header(
                "Tickets",
                darkMode,
                toggleDarkMode,
                handleLogout,
                handleHomeClick
            )}

            <div
                className={`bg-${
                    darkMode ? "gray-900" : "white-800"
                } grid grid-cols-12 gap-6 h-screen`}
            >
                <div className="col-span-3 bg-gray-200">
                    <button
                        onClick={handleannouncements}
                        className="w-full p-2 mb-2  text-left"
                    >
                        Announcements
                    </button>
                    <button
                        onClick={handleChat}
                        className="w-full p-2 mb-2  text-left "
                    >
                        Chat
                    </button>
                    <button
                        onClick={handletickets}
                        className="w-full p-2 mb-2  text-left bg-indigo-500 text-white"
                    >
                        Tickets
                    </button>
                </div>

                {/* Main Content */}
                <div className="col-span-9">
                    <div className="flex justify-between items-center mb-4">
                        <h2
                            className={`text-2xl font-bold ${
                                darkMode ? "text-white" : "text-black"
                            }`}
                        >
                            Tickets
                        </h2>
                        <button
                            onClick={openModal}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-md mr-4"
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
                                        {ticket.title}
                                    </p>
                                    <p className="text-gray-500 mt-2">
                                        Assignee: {ticket.assignee.name}
                                    </p>
                                    <p className="text-gray-500">
                                        Reporter: {ticket.reporter.name}
                                    </p>
                                    <p className="text-gray-500">
                                        Status: {ticket.status}
                                    </p>
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() =>
                                                handleTicketClick(ticket)
                                            }
                                            className="mt-4 bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
                                        >
                                            Edit Status
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteClick(ticket)
                                            }
                                            className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                                        >
                                            Delete Ticket
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Update Status Modal */}
                        {selectedTicket && (
                            <Modal
                                isOpen={openModalstatus}
                                onRequestClose={() => setSelectedTicket(null)}
                                contentLabel="Update Ticket Status Modal"
                            >
                                <div className="p-4">
                                    <h2 className="text-2xl font-bold mb-4">
                                        Update Ticket Status
                                    </h2>
                                    <div>
                                        <label
                                            htmlFor="status"
                                            className="block text-sm font-medium text-gray-900"
                                        >
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            value={newStatus}
                                            onChange={(e) =>
                                                setNewStatus(e.target.value)
                                            }
                                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
                                            required
                                        >
                                            <option value="To Do">To Do</option>
                                            <option value="In Progress">
                                                In Progress
                                            </option>
                                            <option value="Done">Done</option>
                                            <option value="Abandoned">
                                                Abandoned
                                            </option>
                                        </select>
                                    </div>

                                    <div className="flex justify-between mt-4">
                                        <button
                                            onClick={handleUpdateStatus}
                                            className="w-1/2 bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
                                        >
                                            Update Status
                                        </button>
                                        <button
                                            onClick={() =>
                                                setSelectedTicket(null)
                                            }
                                            className="w-1/2 bg-gray-300 text-gray-800 p-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-indigo-300"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </Modal>
                        )}

                        <div
                            className={`bg-${
                                darkMode ? "gray-900" : "white-800"
                            } grid grid-cols-12 gap-6 h-screen`}
                        >
                            <div className="col-span-9">
                                {/* Ticket Creation Modal */}
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    contentLabel="Create Ticket Modal"
                                >
                                    {/* TicketForm component */}
                                    <TicketForm
                                        handleCreateTicket={handleCreateTicket}
                                        closeModal={closeModal}
                                        serverId={params.id}
                                    />
                                </Modal>

                                {/* Update Status Modal */}
                                {selectedTicket && (
                                    <Modal
                                        isOpen={modalIsOpen}
                                        onRequestClose={() =>
                                            setSelectedTicket(null)
                                        }
                                        contentLabel="Update Ticket Status Modal"
                                    >
                                        {/* Update status content */}
                                    </Modal>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tickets;
