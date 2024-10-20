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
    // Glass Category
    { id: 1, code: 'P001', name: 'Tempered Glass', category: 'Glass' },
    { id: 2, code: 'P002', name: 'Insulated Glass', category: 'Glass' },
    { id: 3, code: 'P003', name: 'Laminated Glass', category: 'Glass' },
    { id: 4, code: 'P004', name: 'Frosted Glass', category: 'Glass' },
    { id: 5, code: 'P005', name: 'Soundproof Glass', category: 'Glass' },
  
    // Aluminum Category
    { id: 6, code: 'P006', name: 'Aluminum Sheet', category: 'Aluminum' },
    { id: 7, code: 'P007', name: 'Aluminum Cladding', category: 'Aluminum' },
    { id: 8, code: 'P008', name: 'Aluminum Bars', category: 'Aluminum' },
    { id: 9, code: 'P009', name: 'Aluminum Window Frames', category: 'Aluminum' },
    { id: 10, code: 'P010', name: 'Aluminum Doors', category: 'Aluminum' },
  
    // Breezeway Category
    { id: 11, code: 'P011', name: 'Breezeway Louver Windows', category: 'Breezeway' },
    { id: 12, code: 'P012', name: 'Breezeway Ventilation Panels', category: 'Breezeway' },
    { id: 13, code: 'P013', name: 'Breezeway Sunshades', category: 'Breezeway' },
  
    // Jalousies Frame Category
    { id: 14, code: 'P014', name: 'Jalousie Window Frame', category: 'Jalousies Frame' },
    { id: 15, code: 'P015', name: 'Adjustable Jalousie Frame', category: 'Jalousies Frame' },
    { id: 16, code: 'P016', name: 'Fixed Jalousie Frame', category: 'Jalousies Frame' },
  
    // UPVC Category
    { id: 17, code: 'P017', name: 'UPVC Window', category: 'UPVC' },
    { id: 18, code: 'P018', name: 'UPVC Door', category: 'UPVC' },
    { id: 19, code: 'P019', name: 'UPVC Cladding', category: 'UPVC' },
    { id: 20, code: 'P020', name: 'UPVC Fascia Board', category: 'UPVC' },
  
    // Services Category
    { id: 21, code: 'S001', name: 'Glass Installation Service', category: 'Services' },
    { id: 22, code: 'S002', name: 'Aluminum Fabrication Service', category: 'Services' },
    { id: 23, code: 'S003', name: 'Window Repair Service', category: 'Services' },
    { id: 24, code: 'S004', name: 'Custom UPVC Design', category: 'Services' },
  
    // Other Category
    { id: 25, code: 'P021', name: 'Silicone Sealant', category: 'Other' },
    { id: 26, code: 'P022', name: 'Glass Cleaner', category: 'Other' },
    { id: 27, code: 'P023', name: 'Installation Tools Kit', category: 'Other' }
  ];
  

const ProductPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productData, setProductData] = useState(initialProductData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(productData);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [categories, setCategories] = useState(['Glass', 'Aluminum', 'Breezeway', 'Jalousies Frame','UPVC','Services','Other']);

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