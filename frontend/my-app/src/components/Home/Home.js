import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();
    const [teamsAdmin, setTeamsAdmin] = useState([]);
    const [teamsMember, setTeamsMember] = useState([]);

    useEffect(() => {
        // Fetch data for teams
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const responseAdmin = await axios.get(
                    "http://localhost:5000/getMyServers/?role=admin",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const responseMember = await axios.get(
                    "http://localhost:5000/getMyServers?role=user",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setTeamsAdmin(responseAdmin.data);
                setTeamsMember(responseMember.data);
            } catch (error) {
                console.error("Error fetching teams: ", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run the effect only once on mount

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleNewTeam = () => {
        navigate("/newteam");
    };

    return (
        <div className="home-container">
            <div className="top-bar">
                <div className="top-left">
                    <button onClick={() => console.log("Settings clicked")}>
                        Settings
                    </button>
                </div>
                <div className="top-center">
                    <h2>Welcome to Crysis</h2>
                </div>
                <div className="top-right">
                    <button onClick={handleNewTeam}>New Team</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>

            <div className="teams-container">
                {/* Teams Admin */}
                <div className="team-row">
                    <h5>Your Servers (Admin)</h5>
                    <div className="team-tiles">
                        {teamsAdmin.map((team) => (
                            <div key={team.id} className="team-tile">
                                <p>{team.name}</p>
                                <button>View</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Teams Member */}
                <div className="team-row">
                    <h5>Joined Servers (Member)</h5>
                    <div className="team-tiles">
                        {teamsMember.map((team) => (
                            <div key={team.id} className="team-tile">
                                <p>{team.name}</p>
                                <button>View</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
