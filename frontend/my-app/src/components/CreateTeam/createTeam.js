import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createTeam.css";

const CreateTeam = () => {
    const navigate = useNavigate();
    const [teamName, setTeamName] = useState("");
    const [organization, setOrganization] = useState("");
    const [teamMembers, setTeamMembers] = useState([]);

    const handleAddTeamMember = () => {
        console.log("Adding team member");
    };

    const handleCreateTeam = () => {
        console.log("Creating team", { teamName, organization, teamMembers });
    };

    const handleClose = () => {
        navigate("/home");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="create-team-container">
            <div className="top-bar">
                <div className="top-left">
                    <button onClick={() => console.log("Settings clicked")}>
                        Settings
                    </button>
                </div>
                <div className="top-center">
                    <h2>Crysis</h2>
                </div>
                <div className="top-right">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="form-container">
                <div className="close-button" onClick={handleClose}>
                    X
                </div>
                <h4>Create Team</h4>
                <form>
                    <label htmlFor="teamName">Team Name:</label>
                    <input
                        type="text"
                        id="teamName"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />

                    <label htmlFor="organization">Organization:</label>
                    <input
                        type="text"
                        id="organization"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                    />

                    <label htmlFor="teamMembers">Team Members:</label>
                    <textarea
                        id="teamMembers"
                        value={teamMembers}
                        onChange={(e) => setTeamMembers(e.target.value)}
                    />

                    <button type="button" onClick={handleAddTeamMember}>
                        Add Team Member
                    </button>

                    <div className="create-button-container">
                        <button type="button" onClick={handleCreateTeam}>
                            Create Team
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTeam;
