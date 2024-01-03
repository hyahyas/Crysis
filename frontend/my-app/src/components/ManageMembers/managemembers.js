import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import custom_header from "../Header/header"

const MemberAdminManagement = () => {
  const [members, setMembers] = useState([
    { id: 1, name: 'John Doe', role: 'Member' },
    { id: 2, name: 'Jane Doe', role: 'Admin' },
    // Add more members as needed
  ]);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();


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

  const handleRoleChange = (newRole) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === selectedMember.id ? { ...member, role: newRole } : member
      )
    );
    handleMenuClose();
  };

  const handleRemoveMember = () => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== selectedMember.id)
    );
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
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.id}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={(event) => handleMenuOpen(event, member)}
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
                    <MenuItem onClick={() => handleRoleChange('Admin')}>Make Admin</MenuItem>
                    <MenuItem onClick={() => handleRoleChange('Member')}>Make Member</MenuItem>
                    <MenuItem onClick={handleRemoveMember}>Remove Member</MenuItem>
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
