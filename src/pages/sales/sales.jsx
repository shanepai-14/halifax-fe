import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Container, TablePagination, IconButton, Button, Modal, Box, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

// Sample data for the sales table
const initialSalesData = [
  { id: 1, customer: 'John Doe', product: 'Tempered Glass', quantity: 150, revenue: 15000 },
  { id: 2, customer: 'Jane Smith', product: 'Aluminum Frames', quantity: 200, revenue: 10000 },
  { id: 3, customer: 'Bob Johnson', product: 'Glass Shower Doors', quantity: 75, revenue: 22500 },
  { id: 4, customer: 'Alice Brown', product: 'Mirrors', quantity: 100, revenue: 5000 },
  { id: 5, customer: 'Charlie Davis', product: 'Window Panes', quantity: 300, revenue: 9000 },
  // Add more rows to demonstrate pagination
  { id: 6, customer: 'Eve Wilson', product: 'Glass Tabletops', quantity: 50, revenue: 7500 },
  { id: 7, customer: 'Frank Miller', product: 'Aluminum Siding', quantity: 180, revenue: 13500 },
  { id: 8, customer: 'Grace Lee', product: 'Glass Partitions', quantity: 25, revenue: 18750 },
];

const HalifaxSalesPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [salesData, setSalesData] = useState(initialSalesData);
  const [openModal, setOpenModal] = useState(false);
  const [newOrder, setNewOrder] = useState({ customer: '', product: '', quantity: '', revenue: '' });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    setSalesData(salesData.filter(item => item.id !== id));
  };

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log('Edit item', id);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleNewOrderChange = (event) => {
    setNewOrder({ ...newOrder, [event.target.name]: event.target.value });
  };

  const handleAddNewOrder = () => {
    const newId = Math.max(...salesData.map(item => item.id)) + 1;
    setSalesData([...salesData, { id: newId, ...newOrder, quantity: parseInt(newOrder.quantity), revenue: parseFloat(newOrder.revenue) }]);
    setNewOrder({ customer: '', product: '', quantity: '', revenue: '' });
    handleCloseModal();
  };

  const totalSalesToday = salesData.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Button 
        variant="contained" 
        startIcon={<AddIcon />} 
        onClick={handleOpenModal}
        sx={{ mb: 2 }}
      >
        New Order
      </Button>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Product</TableCell>
              <TableCell align="right">Quantity Sold</TableCell>
              <TableCell align="right">Revenue ($)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">${row.revenue.toLocaleString()}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(row.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} align="right">
                <Typography variant="subtitle1">Total Sales Today:</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1">${totalSalesToday.toLocaleString()}</Typography>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={salesData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="new-order-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" component="h2" gutterBottom>
            New Order
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Customer Name"
            name="customer"
            value={newOrder.customer}
            onChange={handleNewOrderChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Product"
            name="product"
            value={newOrder.product}
            onChange={handleNewOrderChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Quantity"
            name="quantity"
            type="number"
            value={newOrder.quantity}
            onChange={handleNewOrderChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Revenue"
            name="revenue"
            type="number"
            value={newOrder.revenue}
            onChange={handleNewOrderChange}
          />
          <Button variant="contained" onClick={handleAddNewOrder} sx={{ mt: 2 }}>
            Add Order
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default HalifaxSalesPage;