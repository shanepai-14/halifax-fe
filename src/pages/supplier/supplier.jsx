import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Container, TablePagination, IconButton, Button, TextField,
  InputAdornment, Box
} from '@mui/material';
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined, SearchOutlined, ClearOutlined } from '@ant-design/icons';
import AddSupplierModal from '../inventory/addSupplierModal';

// Sample supplier data
const initialSupplierData = [
  { id: 1, name: 'GlassCo', contactPerson: 'John Doe', email: 'john@glassco.com', phone: '123-456-7890', address: '123 Glass St, Crystal City, GL 12345' },
  { id: 2, name: 'MetalWorks', contactPerson: 'Jane Smith', email: 'jane@metalworks.com', phone: '234-567-8901', address: '456 Steel Ave, Iron Town, MT 23456' },
  { id: 3, name: 'WoodCrafters', contactPerson: 'Bob Johnson', email: 'bob@woodcrafters.com', phone: '345-678-9012', address: '789 Oak Rd, Timber Village, WD 34567' },
  { id: 4, name: 'PlastiCorp', contactPerson: 'Alice Brown', email: 'alice@plasticorp.com', phone: '456-789-0123', address: '101 Polymer Blvd, Resin City, PL 45678' },
  { id: 5, name: 'BuilderSupplies', contactPerson: 'Charlie Davis', email: 'charlie@buildersupplies.com', phone: '567-890-1234', address: '202 Construction Way, Framework Town, BS 56789' },
];

const HalifaxSupplierPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [supplierData, setSupplierData] = useState(initialSupplierData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(supplierData);
  const [openAddSupplierModal, setOpenAddSupplierModal] = useState(false);

  useEffect(() => {
    const filtered = supplierData.filter(supplier => 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, supplierData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    setSupplierData(supplierData.filter((supplier) => supplier.id !== id));
  };

  const handleEdit = (id) => {
    console.log('Edit supplier', id);
    // Implement edit functionality
  };

  const handleView = (id) => {
    console.log('View supplier', id);
    // Implement view functionality
  };

  const handleOpenAddSupplierModal = () => {
    setOpenAddSupplierModal(true);
  };

  const handleCloseAddSupplierModal = () => {
    setOpenAddSupplierModal(false);
  };

  const handleAddSupplier = (newSupplier) => {
    const newId = Math.max(...supplierData.map(supplier => supplier.id)) + 1;
    setSupplierData([...supplierData, { ...newSupplier, id: newId }]);
  };

  const handleClearFilter = () => {
    setSearchTerm('');
  };

  return (
    <Container maxWidth="xxl" sx={{ mt: 0, px: '0!important' }}>
      <Typography variant="h4" gutterBottom>
        Suppliers
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <TextField
          placeholder="Search suppliers..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        />
        <Box>
          <Button 
            variant="text" 
            color="error" 
            sx={{mr: 1}} 
            onClick={handleClearFilter}
          >
            <ClearOutlined />
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<PlusOutlined />}
            onClick={handleOpenAddSupplierModal}
          >
            Add Supplier
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.contactPerson}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                  <TableCell>{supplier.address}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleView(supplier.id)}>
                      <EyeOutlined style={{ fontSize: 20 }} />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(supplier.id)}>
                      <EditOutlined style={{ fontSize: 20 }} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(supplier.id)}>
                      <DeleteOutlined style={{ fontSize: 20 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AddSupplierModal
        open={openAddSupplierModal}
        handleClose={handleCloseAddSupplierModal}
        handleAddSupplier={handleAddSupplier}
      />
    </Container>
  );
};

export default HalifaxSupplierPage;