import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Avatar,
  IconButton,
  Dialog,
  DialogContent,
  TextField,
  Box,
  Chip
} from '@mui/material';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import HalifaxAccountPage from './HalifaxAccountPage'; // Import the existing account page component

// Sample user data
const initialUsers = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', role: 'admin', phone: '123-456-7890', address: '123 Main St, Anytown, AN 12345' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', role: 'sales', phone: '234-567-8901', address: '456 Oak Rd, Somewhere, SW 23456' },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com', role: 'staff', phone: '345-678-9012', address: '789 Pine Ave, Nowhere, NW 34567' },
];

const HalifaxAccountManagementPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenDialog = (user = null) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSaveUser = (updatedUser) => {
    if (updatedUser.id) {
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    } else {
      const newUser = { ...updatedUser, id: Math.max(...users.map(u => u.id)) + 1 };
      setUsers([...users, newUser]);
    }
    handleCloseDialog();
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Account Management
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          label="Search Users"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchOutlined style={{ color: 'action.active', marginRight: 8 }} />
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<PlusOutlined />}
          onClick={() => handleOpenDialog()}
        >
          Add New User
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        bgcolor: stringToColor(`${user.firstName} ${user.lastName}`),
                        mr: 2
                      }}
                    >
                      {getInitials(user.firstName, user.lastName)}
                    </Avatar>
                    {user.firstName} {user.lastName}
                  </Box>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={user.role} 
                    color={user.role === 'admin' ? 'error' : user.role === 'sales' ? 'primary' : 'default'}
                  />
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(user)}>
                    <EditOutlined />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user.id)}>
                    <DeleteOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <HalifaxAccountPage 
            initialUserData={selectedUser || {}}
            onSave={handleSaveUser}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default HalifaxAccountManagementPage;