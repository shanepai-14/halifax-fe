import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AddItemModal = ({ open, handleClose, handleAddItem, categories, suppliers , productName }) => {
  const [newItem, setNewItem] = useState({
    code: '',
    name: '',
    category: '',
    supplier: '',
    price: '',
    quantity: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddItem({
      ...newItem,
      price: parseFloat(newItem.price),
      quantity: parseInt(newItem.quantity)
    });
    handleClose();
    setNewItem({
      code: '',
      name: '',
      category: '',
      supplier: '',
      price: '',
      quantity: ''
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-item-modal-title"
    >
      <Box sx={style}>
        <Typography id="add-item-modal-title" variant="h6" component="h2" gutterBottom>
          Add New Item
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Code"
                name="code"
                value={newItem.code}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Product Name</InputLabel>
                <Select
                  name="name"
                  value={newItem.name}
                  onChange={handleChange}
                  label="Product Name"
                >
                  {productName.map((productNames) => (
                    <MenuItem key={productNames} value={productNames}>
                      {productNames}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={newItem.category}
                  onChange={handleChange}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Supplier</InputLabel>
                <Select
                  name="supplier"
                  value={newItem.supplier}
                  onChange={handleChange}
                  label="Supplier"
                >
                  {suppliers.map((supplier) => (
                    <MenuItem key={supplier} value={supplier}>
                      {supplier}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={newItem.price}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <Typography>₱</Typography>
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={newItem.quantity}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button onClick={handleClose} variant="outlined">
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Add Item
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AddItemModal;