import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Divider,
  Avatar
} from '@mui/material';
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';

const roles = ['admin', 'sales', 'staff'];

const HalifaxAccountPage = ({ initialUserData, onSave, onCancel }) => {
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(!initialUserData.id);

  useEffect(() => {
    setUserData(initialUserData);
    setIsEditing(!initialUserData.id);
  }, [initialUserData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      onSave(userData);
    }
    setIsEditing(!isEditing);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const stringToColor = (string) => {
    if (!string) return '#000000'; // Default color if string is undefined
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

  return (
    <Container maxWidth="xxl" sx={{ mt: 0 ,p:"0!important" }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={3} sx={{p:"0!important"}} alignItems="center">
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar 
              sx={{ 
                width: 150, 
                height: 150, 
                fontSize: 60, 
                bgcolor: stringToColor(`${userData.firstName || ''} ${userData.lastName || ''}`)
              }}
            >
              {getInitials(userData.firstName, userData.lastName)}
            </Avatar>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {userData.firstName} {userData.lastName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {userData.email}
            </Typography>
          {userData.role &&          
          <Box 
          sx={{ 
            display: 'inline-block', 
            bgcolor: 'primary.main', 
            color: 'white', 
            px: 2, 
            py: 0.5, 
            borderRadius: 1,
            textTransform: 'capitalize'
          }}
        >
          {userData.role}
        </Box>}
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={userData.firstName || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={userData.lastName || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={userData.email || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth disabled={!isEditing}>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={userData.role || ''}
                onChange={handleInputChange}
                label="Role"
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role} sx={{ textTransform: 'capitalize' }}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={userData.phone || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={userData.address || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              multiline
              rows={2}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="outlined" 
            onClick={onCancel}
            startIcon={<CloseOutlined />}
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color={isEditing ? "success" : "primary"}
            onClick={handleEditToggle}
            startIcon={isEditing ? <SaveOutlined /> : <EditOutlined />}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default HalifaxAccountPage;