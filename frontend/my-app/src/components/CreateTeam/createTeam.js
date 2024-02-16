// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./createTeam.css";

// const CreateTeam = () => {
//     const navigate = useNavigate();
//     const [teamName, setTeamName] = useState("");
//     const [organization, setOrganization] = useState("");
//     const [teamMembers, setTeamMembers] = useState([]);

//     const handleAddTeamMember = () => {
//         console.log("Adding team member");
//     };

//     const handleCreateTeam = () => {
//         console.log("Creating team", { teamName, organization, teamMembers });
//     };

//     const handleClose = () => {
//         navigate("/home");
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/");
//     };

//     return (
//         <div className="create-team-container">
//             <div className="top-bar">
//                 <div className="top-left">
//                     <button onClick={() => console.log("Settings clicked")}>
//                         Settings
//                     </button>
//                 </div>
//                 <div className="top-center">
//                     <h2>Crysis</h2>
//                 </div>
//                 <div className="top-right">
//                     <button onClick={handleLogout}>Logout</button>
//                 </div>
//             </div>
//             <div className="form-container">
//                 <div className="close-button" onClick={handleClose}>
//                     X
//                 </div>
//                 <h4>Create Team</h4>
//                 <form>
//                     <label htmlFor="teamName">Team Name:</label>
//                     <input
//                         type="text"
//                         id="teamName"
//                         value={teamName}
//                         onChange={(e) => setTeamName(e.target.value)}
//                     />

//                     <label htmlFor="organization">Organization:</label>
//                     <input
//                         type="text"
//                         id="organization"
//                         value={organization}
//                         onChange={(e) => setOrganization(e.target.value)}
//                     />

//                     <label htmlFor="teamMembers">Team Members:</label>
//                     <textarea
//                         id="teamMembers"
//                         value={teamMembers}
//                         onChange={(e) => setTeamMembers(e.target.value)}
//                     />

//                     <button type="button" onClick={handleAddTeamMember}>
//                         Add Team Member
//                     </button>

//                     <div className="create-button-container">
//                         <button type="button" onClick={handleCreateTeam}>
//                             Create Team
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateTeam;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CreateTeam = ({
    onClose,
    darkMode,
    toggleDarkMode,
    setTeamsAdmin,
    teamsAdmin,
}) => {
    const navigate = useNavigate();
    const [teamName, setTeamName] = useState("");
    const [teamDescription, setTeamDescription] = useState("");

    const updateTeams = (team) => {
        try {
            setTeamsAdmin([...teamsAdmin, team]);
        } catch (error) {
            console.error("Error updating teams: ", error);
        }
    };

    const handleCreateTeam = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:5000/createServer",
                {
                    name: teamName,
                    description: teamDescription,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.message === "Server created successfully") {
                console.log("Server created successfully");
                updateTeams(response.data.server);
                onClose(); // Close the modal
                // setModalIsOpen(false);
            } else {
                console.log("Server creation failed:", response.data.message);
            }
        } catch (error) {
            console.error("Error creating server: ", error);
        }
    };

    const handleCancel = () => {
        onClose(); // Close the modal
        // setModalIsOpen(false);
    };

    return (
        // <div
        //     className={`fixed inset-0 flex items-center justify-center ${
        //         darkMode ? "bg-black bg-opacity-50" : "bg-white bg-opacity-50"
        //     }`}
        // >
        // <div
        //     className={`max-w-md w-full bg-white p-4 rounded-md shadow-md ${
        //         darkMode ? "dark:bg-gray-700" : ""
        //     }`}
        // >

        <div className="p-4">
            <h2
                className={`text-2xl font-bold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                }`}
            >
                Create Team/Server
            </h2>
            <form onSubmit={handleCreateTeam} className="space-y-4">
                <div>
                    <label
                        htmlFor="teamName"
                        className={`block text-sm font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                        }`}
                    >
                        Server Name
                    </label>
                    <input
                        id="teamName"
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-300 ${
                            darkMode
                                ? "dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                : ""
                        }`}
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="teamDescription"
                        className={`block text-sm font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                        }`}
                    >
                        Server Description
                    </label>
                    <textarea
                        id="teamDescription"
                        value={teamDescription}
                        onChange={(e) => setTeamDescription(e.target.value)}
                        rows="3"
                        className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-300 ${
                            darkMode
                                ? "dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                : ""
                        }`}
                    />
                </div>

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className={`w-1/2 bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300 ${
                            darkMode ? "dark:bg-gray-600" : ""
                        }`}
                    >
                        Create Team
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className={`w-1/2 bg-gray-300 text-gray-800 p-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-indigo-300 ${
                            darkMode ? "dark:bg-gray-600" : ""
                        }`}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
        // </div>
        // </div>
    );
};

export default CreateTeam;
