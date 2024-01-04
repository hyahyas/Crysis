import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import custom_header from "../Header/header";
import axios from "axios";
import Modal from "react-modal";

const MemberAdminManagement = () => {
    const [members, setMembers] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);

    const handleMenuOpen = (event, member) => {
        setAnchorEl(event.currentTarget);
        setSelectedMember(member);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedMember(null);
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [email, setEmail] = useState("");

    const handleRoleChange = async (newRole) => {
        setMembers((prevMembers) =>
            prevMembers.map((member) =>
                member.member._id === selectedMember.member._id
                    ? { ...member, isAdmin: newRole === "Admin" ? true : false }
                    : member
            )
        );

        console.log(selectedMember);

        const response = await axios.patch(
            `http://localhost:5000/server/${params.id}/updateMember`,
            {
                member: selectedMember.member._id,
                admin: newRole === "Admin" ? true : false,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        console.log(response.data);

        handleMenuClose();
    };

    const handleRemoveMember = () => {
        setMembers((prevMembers) =>
            prevMembers.filter(
                (member) => member.member._id !== selectedMember.member._id
            )
        );

        console.log(selectedMember);

        const response = axios.patch(
            `http://localhost:5000/server/${params.id}/removeMember`,
            {
                member: selectedMember.member._id,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        console.log(response.data);

        handleMenuClose();
    };

    const handleAddMember = async (e) => {
        e.preventDefault();

        const response = await axios.patch(
            `http://localhost:5000/server/${params.id}/addMember`,
            {
                email,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        console.log(response.data);

        setMembers((prevMembers) => [
            ...prevMembers,
            {
                member: {
                    _id: response.data.member._id,
                    name: response.data.member.name,
                },
                isAdmin: false,
            },
        ]);

        setModalIsOpen(false);
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
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }

        const fetchMembers = async () => {
            const response = await axios.get(
                `http://localhost:5000/server/${params.id}/getUsers`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("herre", response);
            const data = await response.data;
            setMembers(data);
        };
        fetchMembers();
    }, []);
    return (
        <>
            {custom_header(
                "Manage Members of XYZ Server",
                handleLogout,
                handleHomeClick
            )}
            <div className="flex justify-between items-center right">
                <button
                    onClick={() => setModalIsOpen(true)}
                    className={`bg-indigo-500 px-3 py-1.5 text-white rounded-md float-right ${"dark:bg-gray-600"}`}
                >
                    <FontAwesomeIcon icon={faUserPlus} />
                </button>
            </div>
            <div className="p-4">
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {/* <TableCell>ID</TableCell> */}
                                <TableCell>Name</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {members.map((member) => (
                                <TableRow key={member._id}>
                                    {/* <TableCell>{member._id}</TableCell> */}
                                    <TableCell>{member.member.name}</TableCell>
                                    <TableCell>
                                        {member.isAdmin
                                            .toString()
                                            .charAt(0)
                                            .toUpperCase() +
                                            member.isAdmin.toString().slice(1)}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={(event) =>
                                                handleMenuOpen(event, member)
                                            }
                                            aria-controls="actions-menu"
                                            aria-haspopup="true"
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="actions-menu"
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem
                                                onClick={() =>
                                                    handleRoleChange("Admin")
                                                }
                                            >
                                                Make Admin
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    handleRoleChange("Member")
                                                }
                                            >
                                                Make Member
                                            </MenuItem>
                                            <MenuItem
                                                onClick={handleRemoveMember}
                                            >
                                                Remove Member
                                            </MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Add Member"
                >
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold mb-4">Add Member</h2>
                    </div>
                    <form onSubmit={handleAddMember} className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-1/2 bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300 ${
                                darkMode ? "dark:bg-gray-600" : ""
                            }`}
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setModalIsOpen(false);
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
        </>
    );
};

export default MemberAdminManagement;
