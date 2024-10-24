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
    // Glass Category
    { id: 1, code: 'P001', name: 'Tempered Glass', price: 100, quantity: 50, category: 'Glass', supplier: 'GlassCo' },
    { id: 2, code: 'P002', name: 'Insulated Glass', price: 120, quantity: 40, category: 'Glass', supplier: 'GlassMasters' },
    { id: 3, code: 'P003', name: 'Laminated Glass', price: 130, quantity: 30, category: 'Glass', supplier: 'SafeGlass' },
    { id: 4, code: 'P004', name: 'Frosted Glass', price: 90, quantity: 60, category: 'Glass', supplier: 'GlassCo' },
    { id: 5, code: 'P005', name: 'Soundproof Glass', price: 150, quantity: 20, category: 'Glass', supplier: 'SoundTech' },
  
    // Aluminum Category
    { id: 6, code: 'P006', name: 'Aluminum Sheet', price: 80, quantity: 100, category: 'Aluminum', supplier: 'AluMetals' },
    { id: 7, code: 'P007', name: 'Aluminum Cladding', price: 70, quantity: 50, category: 'Aluminum', supplier: 'CladWorks' },
    { id: 8, code: 'P008', name: 'Aluminum Bars', price: 60, quantity: 75, category: 'Aluminum', supplier: 'AluSupply' },
    { id: 9, code: 'P009', name: 'Aluminum Window Frames', price: 200, quantity: 20, category: 'Aluminum', supplier: 'WindowFramesCo' },
    { id: 10, code: 'P010', name: 'Aluminum Doors', price: 250, quantity: 15, category: 'Aluminum', supplier: 'DoorsCo' },
  
    // Breezeway Category
    { id: 11, code: 'P011', name: 'Breezeway Louver Windows', price: 180, quantity: 10, category: 'Breezeway', supplier: 'BreezewayTech' },
    { id: 12, code: 'P012', name: 'Breezeway Ventilation Panels', price: 70, quantity: 30, category: 'Breezeway', supplier: 'VentPanelsInc' },
    { id: 13, code: 'P013', name: 'Breezeway Sunshades', price: 90, quantity: 25, category: 'Breezeway', supplier: 'SunshadeSupply' },
  
    // Jalousies Frame Category
    { id: 14, code: 'P014', name: 'Jalousie Window Frame', price: 120, quantity: 50, category: 'Jalousies Frame', supplier: 'FrameWorks' },
    { id: 15, code: 'P015', name: 'Adjustable Jalousie Frame', price: 130, quantity: 30, category: 'Jalousies Frame', supplier: 'AdjustFrameTech' },
    { id: 16, code: 'P016', name: 'Fixed Jalousie Frame', price: 110, quantity: 40, category: 'Jalousies Frame', supplier: 'FixedFrameCo' },
  
    // UPVC Category
    { id: 17, code: 'P017', name: 'UPVC Window', price: 300, quantity: 20, category: 'UPVC', supplier: 'UPVCWindowsInc' },
    { id: 18, code: 'P018', name: 'UPVC Door', price: 350, quantity: 15, category: 'UPVC', supplier: 'UPVCDoorMasters' },
    { id: 19, code: 'P019', name: 'UPVC Cladding', price: 100, quantity: 45, category: 'UPVC', supplier: 'CladUPVC' },
    { id: 20, code: 'P020', name: 'UPVC Fascia Board', price: 80, quantity: 60, category: 'UPVC', supplier: 'FasciaUPVC' },
  
    // Services Category
    { id: 21, code: 'S001', name: 'Glass Installation Service', price: 500, quantity: 0, category: 'Services', supplier: 'GlassInstallers' },
    { id: 22, code: 'S002', name: 'Aluminum Fabrication Service', price: 700, quantity: 0, category: 'Services', supplier: 'AluFabTech' },
    { id: 23, code: 'S003', name: 'Window Repair Service', price: 300, quantity: 0, category: 'Services', supplier: 'WindowRepairCo' },
    { id: 24, code: 'S004', name: 'Custom UPVC Design', price: 1000, quantity: 0, category: 'Services', supplier: 'CustomDesignUPVC' },
  
    // Other Category
    { id: 25, code: 'P021', name: 'Silicone Sealant', price: 25, quantity: 100, category: 'Other', supplier: 'SealantSupply' },
    { id: 26, code: 'P022', name: 'Glass Cleaner', price: 10, quantity: 200, category: 'Other', supplier: 'CleanersInc' },
    { id: 27, code: 'P023', name: 'Installation Tools Kit', price: 150, quantity: 20, category: 'Other', supplier: 'ToolKitsCo' }
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
  const productName = [...new Set(inventoryData.map(item => item.name))];

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
              <TableCell align="right">Unit Price (₱)</TableCell>
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
        productName={productName}
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