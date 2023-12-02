import React, { useState } from "react";
import axios from "axios";

const TicketForm = ({ serverId, closeModal, handleCreateTicket }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("To Do"); // Default status
    const [assigneeEmail, setAssigneeEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:5000/createTicket",
                {
                    title,
                    description,
                    status,
                    serverId,
                    assigneeEmail,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.message === "Ticket created successfully") {
                handleCreateTicket(response.data.ticket);
            } else {
                console.error("Ticket creation failed:", response.data.message);
            }
        } catch (error) {
            console.error("Error creating ticket: ", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Create Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-900">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
                    />
                </div>

                <div>
                    <label htmlFor="assignee email" className="block text-sm font-medium text-gray-900">
                        Assignee Email
                    </label>
                    <input
                        id="assignee email"
                        type="email"
                        value={assigneeEmail}
                        onChange={(e) => setAssigneeEmail(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-900">
                        Status
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
                        required
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                        <option value="Abandoned">Abandoned</option>
                    </select>
                </div>

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="w-1/2 bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
                    >
                        Create Ticket
                    </button>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="w-1/2 bg-gray-300 text-gray-800 p-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-indigo-300"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TicketForm;
