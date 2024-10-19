import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Container, TablePagination, Button, TextField,
  InputAdornment, Box
} from '@mui/material';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import AddCategoryModal from './addCategoryModal';
import AddProductModal from './addProductModal';

// Sample data
const initialProductData = [
  { id: 1, code: 'P001', name: 'Tempered Glass', category: 'Glass' },
  { id: 2, code: 'P002', name: 'Aluminum Frame', category: 'Metal' },
  { id: 3, code: 'P003', name: 'Wooden Door', category: 'Wood' },
  { id: 4, code: 'P004', name: 'Steel Reinforcement', category: 'Metal' },
  { id: 5, code: 'P005', name: 'Plastic Moldings', category: 'Plastic' },
];

const ProductPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productData, setProductData] = useState(initialProductData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(productData);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [categories, setCategories] = useState(['Glass', 'Metal', 'Wood', 'Plastic']);

  useEffect(() => {
    const filtered = productData.filter(item => 
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, productData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenAddCategoryModal = () => {
    setOpenAddCategoryModal(true);
  };

  const handleCloseAddCategoryModal = () => {
    setOpenAddCategoryModal(false);
  };

  const handleOpenAddProductModal = () => {
    setOpenAddProductModal(true);
  };

  const handleCloseAddProductModal = () => {
    setOpenAddProductModal(false);
  };

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory.name]);
    // You might want to update this to also add the category to your backend
  };

  const handleAddProduct = (newProduct) => {
    const newId = Math.max(...productData.map(item => item.id)) + 1;
    setProductData([...productData, { ...newProduct, id: newId }]);
    // You might want to update this to also add the product to your backend
  };

  return (
    <Container maxWidth="xxl" sx={{ mt: 0,p:"0!important"}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <TextField
          placeholder="Search products..."
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
            variant="contained" 
            onClick={handleOpenAddProductModal} 
            startIcon={<PlusOutlined />}
              color="error"
              
          >
           
            Add Product
          </Button>
          <Button 
            variant="contained" 
            onClick={handleOpenAddCategoryModal} 
            startIcon={<PlusOutlined />}
            sx={{ ml: 1 }}
            color="info"
          >
            Add Category
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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.category}</TableCell>
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
    <AddCategoryModal
      open={openAddCategoryModal}
      handleClose={handleCloseAddCategoryModal}
      handleAddCategory={handleAddCategory}
    />
    <AddProductModal
      open={openAddProductModal}
      handleClose={handleCloseAddProductModal}
      handleAddProduct={handleAddProduct}
      categories={categories}
    />
    </Container>
  );
};

export default ProductPage;