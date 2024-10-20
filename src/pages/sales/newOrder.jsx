import React, { useState, useEffect } from 'react';
import {
  Grid, Paper, TextField, Button, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TablePagination, Autocomplete, Dialog,
  DialogTitle, DialogContent, DialogActions, IconButton, Box,
  FormControl, InputLabel, Select, MenuItem 
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DeleteOutlined, SearchOutlined, PlusCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { format, addDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Updated mock data
const allProducts = [
  { id: 1, code: 'P001', name: 'Tempered Glass', price: 100, quantity: 0 },
  { id: 2, code: 'P002', name: 'Aluminum Frame', price: 50, quantity: 100 },
  { id: 3, code: 'P003', name: 'Wooden Door', price: 200, quantity: 25 },
  { id: 4, code: 'P004', name: 'Steel Reinforcement', price: 150, quantity: 40 },
  { id: 5, code: 'P005', name: 'Plastic Moldings', price: 20, quantity: 150 },
  { id: 6, code: 'P006', name: 'Glass Fiber', price: 80, quantity: 75 },
  { id: 7, code: 'P007', name: 'Cement', price: 120, quantity: 200 },
  { id: 8, code: 'P008', name: 'Iron Rods', price: 300, quantity: 35 },
  { id: 9, code: 'P009', name: 'PVC Pipes', price: 15, quantity: 250 },
  { id: 10, code: 'P010', name: 'Roofing Sheets', price: 500, quantity: 60 },
  { id: 11, code: 'P011', name: 'Glass Panels', price: 180, quantity: 45 },
  { id: 12, code: 'P012', name: 'Sliding Windows', price: 220, quantity: 30 },
  { id: 13, code: 'P013', name: 'Acrylic Sheets', price: 90, quantity: 120 },
  { id: 14, code: 'P014', name: 'Glass Adhesive', price: 12, quantity: 500 },
  { id: 15, code: 'P015', name: 'Aluminum Cladding', price: 250, quantity: 40 },
  { id: 16, code: 'P016', name: 'Glass Reinforced Plastic (GRP)', price: 60, quantity: 80 },
  { id: 17, code: 'P017', name: 'Aluminum Bars', price: 45, quantity: 150 },
  { id: 18, code: 'P018', name: 'Silicone Sealant', price: 10, quantity: 500 },
  { id: 19, code: 'P019', name: 'Mirror Glass', price: 200, quantity: 55 },
  { id: 20, code: 'P020', name: 'Partition Glass', price: 160, quantity: 70 },
  { id: 21, code: 'P021', name: 'Skylight Glass', price: 320, quantity: 20 },
  { id: 22, code: 'P022', name: 'Door Handles', price: 30, quantity: 500 },
  { id: 23, code: 'P023', name: 'Glass Hinges', price: 25, quantity: 300 },
  { id: 24, code: 'P024', name: 'Aluminum Sheets', price: 120, quantity: 90 },
  { id: 25, code: 'P025', name: 'Aluminum Windows', price: 400, quantity: 25 },
  { id: 26, code: 'P026', name: 'Tempered Laminated Glass', price: 350, quantity: 40 },
  { id: 27, code: 'P027', name: 'Glass Shelves', price: 70, quantity: 200 },
  { id: 28, code: 'P028', name: 'Aluminum Shutters', price: 300, quantity: 60 },
  { id: 29, code: 'P029', name: 'Polycarbonate Sheets', price: 150, quantity: 85 },
  { id: 30, code: 'P030', name: 'Glass Cleaner', price: 8, quantity: 600 },
  { id: 31, code: 'P031', name: 'Soundproof Glass', price: 420, quantity: 15 },
  { id: 32, code: 'P032', name: 'Double Glazing Units', price: 500, quantity: 50 },
  { id: 33, code: 'P033', name: 'Window Seals', price: 5, quantity: 800 },
  { id: 34, code: 'P034', name: 'Curtain Walling Systems', price: 600, quantity: 10 },
  { id: 35, code: 'P035', name: 'Frameless Glass', price: 350, quantity: 35 },
  { id: 36, code: 'P036', name: 'Bulletproof Glass', price: 1000, quantity: 5 },
  { id: 37, code: 'P037', name: 'Decorative Glass Film', price: 50, quantity: 120 },
  { id: 38, code: 'P038', name: 'Sandblasted Glass', price: 180, quantity: 40 },
  { id: 39, code: 'P039', name: 'Tempered Insulating Glass', price: 280, quantity: 30 },
  { id: 40, code: 'P040', name: 'Fire-Resistant Glass', price: 450, quantity: 25 }
];


const customers = [
  { id: 1, name: 'John Doe', phone: '1234567890', address: '123 Main St, Anytown, USA' },
  { id: 2, name: 'Jane Smith', phone: '9876543210', address: '456 Elm St, Othertown, USA' },
  { id: 3, name: 'Alice Johnson', phone: '1122334455', address: '789 Oak St, Sometown, USA' },
  { id: 4, name: 'Bob Williams', phone: '2233445566', address: '321 Pine St, Newtown, USA' },
  { id: 5, name: 'Charlie Brown', phone: '3344556677', address: '654 Cedar St, Oldtown, USA' },
  { id: 6, name: 'Eve Davis', phone: '4455667788', address: '987 Birch St, Hilltown, USA' },
  { id: 7, name: 'Frank Miller', phone: '5566778899', address: '159 Maple St, Rivertown, USA' },
  { id: 8, name: 'Grace Lee', phone: '6677889900', address: '753 Walnut St, Villagetown, USA' },
  { id: 9, name: 'Hank Green', phone: '7788990011', address: '951 Spruce St, Foresttown, USA' },
  { id: 10, name: 'Ivy White', phone: '8899001122', address: '357 Redwood St, Seaview, USA' },
];

const validationSchema = Yup.object().shape({
  customer: Yup.object().nullable().required('Customer is required'),
  phone: Yup.string().required('Phone is required'),
  address: Yup.string().required('Address is required'),
  salesType: Yup.string().required('Sales type is required'),
  orderDate: Yup.date().required('Order date is required'),
  deliveryDate: Yup.date().required('Delivery date is required').min(Yup.ref('orderDate'), 'Delivery date must be after order date'),
});


const NewOrderPage = () => {
  const [products, setProducts] = useState(allProducts);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [orderDate, setOrderDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(addDays(new Date(), 1));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  const [salesType, setSalesType] = useState('');
  const navigate = useNavigate();


  const initialValues = {
    customer: null,
    phone: '',
    address: '',
    salesType: '',
    orderDate: new Date(),
    deliveryDate: addDays(new Date(), 1),
  };

  useEffect(() => {
    const filteredProducts = allProducts.filter(
      product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 product.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
    setPage(0);
  }, [searchTerm]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleCustomerChange = (event, newValue) => {
    setCustomer(newValue);
    if (newValue) {
      setCustomerInfo({
        name: newValue.name,
        phone: newValue.phone,
        address: newValue.address
      });
    } else {
      setCustomerInfo({ name: '', phone: '', address: '' });
    }
  };
  const handleChange = (event) => {
    const value = event.target.value;
    setSalesType(value);
  
  };

  const handleAddProduct = (product) => {
    if (product.quantity > 0) {
      const existingItem = orderItems.find(item => item.id === product.id);
      if (existingItem) {
        setOrderItems(orderItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        setOrderItems([...orderItems, { ...product, quantity: 1 }]);
      }
      // Update the product quantity in the product list
      setProducts(products.map(p =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
      ));
    } else {
      setSelectedProduct(product);
      setDialogOpen(true);
    }
  };

  const handleRemoveProduct = (productId) => {
    const removedItem = orderItems.find(item => item.id === productId);
    setOrderItems(orderItems.filter(item => item.id !== productId));
    // Update the product quantity in the product list
    setProducts(products.map(p =>
      p.id === productId ? { ...p, quantity: p.quantity + removedItem.quantity } : p
    ));
  };

  const handleQuantityChange = (productId, change, newQuantity = null) => {
    setOrderItems(orderItems.map(item => {
      if (item.id === productId) {
        const oldQuantity = item.quantity;
        const updatedQuantity = newQuantity !== null ? newQuantity : Math.max(0, item.quantity + change);
        // Update the product quantity in the product list
        setProducts(products.map(p =>
          p.id === productId ? { ...p, quantity: p.quantity + (oldQuantity - updatedQuantity) } : p
        ));
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmitOrder = (values, { setSubmitting }) => {
    if (orderItems.length === 0) {
      alert('Please add at least one item to the order');
      setSubmitting(false);
      return;
    }

    const invoiceData = {
      salesType: values.salesType,
      customer: { ...values.customer, phone: values.phone, address: values.address },
      orderDate: values.orderDate,
      deliveryDate: values.deliveryDate,
      orderItems,
      totalPrice,
      invoiceNumber: "INV-"+232323, 
    };
    navigate('/app/sales/invoice-preview', { state: { invoiceData } });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Product List</Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by name or code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchOutlined />,
            }}
            sx={{ mb: 2 }}
          />
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Available</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.code}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell align="right">₱{product.price}</TableCell>
                      <TableCell align="right">{product.quantity}</TableCell>
                      <TableCell align="right">
                        <IconButton color={'success'} onClick={() => handleAddProduct(product)} disabled={product.quantity === 0}>
                          <PlusOutlined />
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
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>New Order</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitOrder}
          >
            {({ errors, touched, setFieldValue, values }) => (
              <Form>
                <Field
                  name="customer"
                  component={Autocomplete}
                  options={customers}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Customer"
                      error={touched.customer && !!errors.customer}
                      helperText={touched.customer && errors.customer}
                    />
                  )}
                  onChange={(_, value) => {
                    setFieldValue('customer', value);
                    setFieldValue('phone', value ? value.phone : '');
                    setFieldValue('address', value ? value.address : '');
                  }}
                />
                <Field
                  as={TextField}
                  name="phone"
                  label="Phone"
                  fullWidth
                  margin="normal"
                  error={touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                />
                <Field
                  as={TextField}
                  name="address"
                  label="Address"
                  fullWidth
                  margin="normal"
                  error={touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                />
                <FormControl fullWidth error={touched.salesType && !!errors.salesType}>
                  <InputLabel>Sales Type</InputLabel>
                  <Field
                    as={Select}
                    name="salesType"
                    label="Sales Type"
                  >
                    <MenuItem value="sales-invoice">Sales Invoice</MenuItem>
                    <MenuItem value="quotation-project">Quotation/Project</MenuItem>
                  </Field>
                  {touched.salesType && errors.salesType && (
                    <Typography color="error" variant="caption">{errors.salesType}</Typography>
                  )}
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: 2 }}>
                    <DatePicker
                      label="Order Date"
                      value={values.orderDate}
                      onChange={(date) => setFieldValue('orderDate', date)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={touched.orderDate && !!errors.orderDate}
                          helperText={touched.orderDate && errors.orderDate}
                        />
                      )}
                      readOnly
                    />
                    <DatePicker
                      label="Delivery Date"
                      value={values.deliveryDate}
                      onChange={(date) => setFieldValue('deliveryDate', date)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={touched.deliveryDate && !!errors.deliveryDate}
                          helperText={touched.deliveryDate && errors.deliveryDate}
                        />
                      )}
                    />
                  </Box>
                </LocalizationProvider>
          <Typography variant="h6" gutterBottom>Order Items</Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">₱{item.price}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => handleQuantityChange(item.id, -1)}>
                        <MinusCircleOutlined />
                      </IconButton>
                      <TextField
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, 0, parseInt(e.target.value) || 0)}
                        onKeyDown={(e) => {
                          if (e.key === 'ArrowLeft') handleQuantityChange(item.id, -1);
                          if (e.key === 'ArrowRight') handleQuantityChange(item.id, 1);
                        }}
                        inputProps={{ style: { textAlign: 'center', width: '40px' } }}
                      />
                      <IconButton size="small" onClick={() => handleQuantityChange(item.id, 1)}>
                        <PlusCircleOutlined />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">₱{item.price * item.quantity}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleRemoveProduct(item.id)}>
                        <DeleteOutlined />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h6" align="right" sx={{ mt: 2 }}>
            Total Price: ₱{totalPrice}
          </Typography>
          <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Submit Order
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Product Out of Stock</DialogTitle>
        <DialogContent>
          The product "{selectedProduct?.name}" is currently out of stock.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default NewOrderPage;