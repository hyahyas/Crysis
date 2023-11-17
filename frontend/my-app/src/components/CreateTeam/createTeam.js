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

const CreateTeam = () => {
    const navigate = useNavigate();
    const [teamName, setTeamName] = useState("");
    const [teamDescription, setTeamDescription] = useState("");

    const handleCreateTeam = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:5000/createTeam",
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

            if (response.data.success) {
                navigate("/home");
            } else {
                console.log("Team creation failed:", response.data.message);
            }
        } catch (error) {
            console.error("Error creating team: ", error);
        }
    };

    const handleCancel = () => {
        navigate("/home");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Create Team/Server</h2>
                <form onSubmit={handleCreateTeam} className="space-y-4">
                    <div>
                        <label htmlFor="teamName" className="block text-sm font-medium text-gray-900">
                            Team/Server Name
                        </label>
                        <input
                            id="teamName"
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="teamDescription" className="block text-sm font-medium text-gray-900">
                            Team/Server Description
                        </label>
                        <textarea
                            id="teamDescription"
                            value={teamDescription}
                            onChange={(e) => setTeamDescription(e.target.value)}
                            rows="3"
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="w-1/2 bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
                        >
                            Create Team
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="w-1/2 bg-gray-300 text-gray-800 p-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-indigo-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTeam;