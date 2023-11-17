// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Home.css";

// const Home = () => {
//     const navigate = useNavigate();
//     const [teamsAdmin, setTeamsAdmin] = useState([]);
//     const [teamsMember, setTeamsMember] = useState([]);

//     useEffect(() => {
//         // Fetch data for teams
//         const fetchData = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 const responseAdmin = await axios.get(
//                     "http://localhost:5000/getMyServers/?role=admin",
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );
//                 const responseMember = await axios.get(
//                     "http://localhost:5000/getMyServers?role=user",
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );

//                 setTeamsAdmin(responseAdmin.data);
//                 setTeamsMember(responseMember.data);
//             } catch (error) {
//                 console.error("Error fetching teams: ", error);
//             }
//         };

//         fetchData();
//     }, []); // Empty dependency array to run the effect only once on mount

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/");
//     };

//     const handleNewTeam = () => {
//         navigate("/newteam");
//     };

//     return (
//         <div className="home-container">
//             <div className="top-bar">
//                 <div className="top-left">
//                     <button onClick={() => console.log("Settings clicked")}>
//                         Settings
//                     </button>
//                 </div>
//                 <div className="top-center">
//                     <h2>Welcome to Crysis</h2>
//                 </div>
//                 <div className="top-right">
//                     <button onClick={handleNewTeam}>New Team</button>
//                     <button onClick={handleLogout}>Logout</button>
//                 </div>
//             </div>

//             <div className="teams-container">
//                 {/* Teams Admin */}
//                 <div className="team-row">
//                     <h5>Your Servers (Admin)</h5>
//                     <div className="team-tiles">
//                         {teamsAdmin.map((team) => (
//                             <div key={team.id} className="team-tile">
//                                 <p>{team.name}</p>
//                                 <button>View</button>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Teams Member */}
//                 <div className="team-row">
//                     <h5>Joined Servers (Member)</h5>
//                     <div className="team-tiles">
//                         {teamsMember.map((team) => (
//                             <div key={team.id} className="team-tile">
//                                 <p>{team.name}</p>
//                                 <button>View</button>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        <div className="flex flex-col min-h-screen">
            <div className="bg-gray-800 text-white p-4">
                <div className="flex justify-between items-center">
                    <button onClick={() => console.log("Settings clicked")}>
                        Settings
                    </button>
                    <h2>Welcome to Crysis</h2>
                    <div className="flex space-x-4">
                        <button onClick={handleNewTeam} className="bg-indigo-500 px-4 py-2 rounded-md">
                            New Team
                        </button>
                        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-md">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-grow p-4">
                {/* Teams Admin */}
                <div className="mb-8">
                    <h5 className="text-lg font-bold">Your Servers (Admin)</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {teamsAdmin.map((team) => (
                            <div key={team.id} className="bg-white p-4 rounded-md shadow-md">
                                <p className="font-semibold">{team.name}</p>
                                <button className="mt-2 bg-indigo-500 px-3 py-1.5 text-white rounded-md">View</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Teams Member */}
                <div>
                    <h5 className="text-lg font-bold">Joined Servers (Member)</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {teamsMember.map((team) => (
                            <div key={team.id} className="bg-white p-4 rounded-md shadow-md">
                                <p className="font-semibold">{team.name}</p>
                                <button className="mt-2 bg-indigo-500 px-3 py-1.5 text-white rounded-md">View</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
