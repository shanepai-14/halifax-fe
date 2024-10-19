import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Container, TablePagination, IconButton, Button, TextField,
  Select, MenuItem, InputAdornment, Box, FormControl, InputLabel
} from '@mui/material';
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined, SearchOutlined, ClearOutlined } from '@ant-design/icons';
import AddItemModal from './addItemModal'
import AddSupplierModal from './addSupplierModal';

// Sample data
const initialInventoryData = [
  { id: 1, code: 'P001', name: 'Tempered Glass', price: 100, quantity: 50, category: 'Glass', supplier: 'GlassCo' },
  { id: 2, code: 'P002', name: 'Aluminum Frame', price: 50, quantity: 100, category: 'Metal', supplier: 'MetalWorks' },
  { id: 3, code: 'P003', name: 'Wooden Door', price: 200, quantity: 25, category: 'Wood', supplier: 'WoodCrafters' },
  { id: 4, code: 'P004', name: 'Steel Reinforcement', price: 150, quantity: 40, category: 'Metal', supplier: 'SteelMasters' },
  { id: 5, code: 'P005', name: 'Plastic Moldings', price: 20, quantity: 150, category: 'Plastic', supplier: 'PlastiCorp' },
  { id: 6, code: 'P006', name: 'Glass Fiber', price: 80, quantity: 75, category: 'Glass', supplier: 'FiberTech' },
  { id: 7, code: 'P007', name: 'Cement', price: 120, quantity: 0, category: 'Construction', supplier: 'BuilderSupplies' },
  { id: 8, code: 'P008', name: 'Iron Rods', price: 300, quantity: 35, category: 'Metal', supplier: 'MetalWorks' },
];

const HalifaxInventoryPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [inventoryData, setInventoryData] = useState(initialInventoryData);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [quantitySort, setQuantitySort] = useState('none');
  const [filteredData, setFilteredData] = useState(inventoryData);
  const [openAddItemModal, setOpenAddItemModal] = useState(false);
  const [openAddSupplierModal, setOpenAddSupplierModal] = useState(false);


  useEffect(() => {
    let filtered = inventoryData.filter(item => 
      (item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === 'all' || item.category === categoryFilter) &&
      (supplierFilter === 'all' || item.supplier === supplierFilter)
    );

    if (quantitySort === 'asc') {
      filtered.sort((a, b) => a.quantity - b.quantity);
    } else if (quantitySort === 'desc') {
      filtered.sort((a, b) => b.quantity - a.quantity);
    }

    setFilteredData(filtered);
  }, [searchTerm, categoryFilter, supplierFilter, quantitySort, inventoryData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    setInventoryData(inventoryData.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    console.log('Edit item', id);
  };

  const handleView = (id) => {
    console.log('View item', id);
  };

  const handleOpenAddItemModal = () => {
    setOpenAddItemModal(true);
  };

  const handleCloseAddItemModal = () => {
    setOpenAddItemModal(false);
  }

  const handleOpenAddSupplierModal = () => {
    setOpenAddSupplierModal(true);
  };

  const handleCloseAddSupplierModal = () => {
    setOpenAddSupplierModal(false);
  };

  const handleAddSupplier = (newSupplier) => {
    // setSuppliers([...suppliers, newSupplier]);
    console.log(newSupplier);
  };
  const handleAddItem = (newItem) => {
    const newId = Math.max(...inventoryData.map(item => item.id)) + 1;
    setInventoryData([...inventoryData, { ...newItem, id: newId }]);
  };


  const handleClearFilter = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setSupplierFilter('all');
    setQuantitySort('none');
  };

  const categories = [...new Set(inventoryData.map(item => item.category))];
  const suppliers = [...new Set(inventoryData.map(item => item.supplier))];

  return (
    <Container maxWidth="xxl" sx={{ mt: 0, px: '0!important' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            placeholder="Search by code or name..."
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
          <FormControl sx={{ ml: 1, minWidth: 120 }} size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              label="Category"
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ ml: 1, minWidth: 120 }} size="small">
            <InputLabel>Supplier</InputLabel>
            <Select
              value={supplierFilter}
              onChange={(e) => setSupplierFilter(e.target.value)}
              label="Supplier"
            >
              <MenuItem value="all">All Suppliers</MenuItem>
              {suppliers.map(supplier => (
                <MenuItem key={supplier} value={supplier}>{supplier}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ ml: 1, minWidth: 120 }} size="small">
            <InputLabel>Quantity</InputLabel>
            <Select
              value={quantitySort}
              onChange={(e) => setQuantitySort(e.target.value)}
              label="Quantity"
            >
              <MenuItem value="none">No Sort</MenuItem>
              <MenuItem value="asc">Low to High</MenuItem>
              <MenuItem value="desc">High to Low</MenuItem>
            </Select>
          </FormControl>
          <Button variant="text" color="error" sx={{ml:1, padding:0, minWidth:0}} onClick={handleClearFilter}>
            <ClearOutlined />
          </Button>
        </Box>
        <Box>
          <Button variant="contained"  onClick={handleOpenAddItemModal} color="error" sx={{mr:1}} startIcon={<PlusOutlined />}>
            Add Item
          </Button>
          <Button variant="contained" color="secondary"    onClick={handleOpenAddSupplierModal} startIcon={<PlusOutlined />}>
            Add Supplier
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell align="right">Price (₱)</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.supplier}</TableCell>
                <TableCell align="right">₱{row.price.toLocaleString()}</TableCell>
                <TableCell align="right" style={{ color: row.quantity === 0 ? 'red' : 'inherit' }}>
                  {row.quantity}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleView(row.id)}>
                    <EyeOutlined style={{ fontSize: 20 }} />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(row.id)}>
                    <EditOutlined style={{ fontSize: 20 }} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row.id)}>
                    <DeleteOutlined style={{ fontSize: 20 }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        <AddItemModal
        open={openAddItemModal}
        handleClose={handleCloseAddItemModal}
        handleAddItem={handleAddItem}
        categories={categories}
        suppliers={suppliers}
      />
       <AddSupplierModal
        open={openAddSupplierModal}
        handleClose={handleCloseAddSupplierModal}
        handleAddSupplier={handleAddSupplier}
      />
    </Container>
  );
};

export default HalifaxInventoryPage;