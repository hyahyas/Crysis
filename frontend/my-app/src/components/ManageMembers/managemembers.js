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
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import custom_header from "../Header/header";
import axios from "axios";

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
            </div>
        </>
    );
};

export default MemberAdminManagement;
