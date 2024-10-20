import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Container, TablePagination, IconButton, Button, Box,
  TextField, Checkbox, Select, MenuItem, InputAdornment, Collapse, FormControl
} from '@mui/material';
import { 
  DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined, SearchOutlined, 
  CalendarOutlined, ClearOutlined, DownOutlined, UpOutlined 
} from '@ant-design/icons';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CustomerCreationModal from './CustomerCreationModal';
import { Link as RouterLink } from 'react-router-dom';

// Updated sample data structure with unit price
const initialSalesData = [
  {
    id: 1,
    invoiceNumber: 'INV-001',
    customer: 'John Doe',
    dateOrder: '2024-03-01',
    dateDelivery: '2024-03-05',
    customerType: 'quotation/project',
    totalRevenue: 25000,
    products: [
      { id: 1, name: 'Tempered Glass', category: 'Glass', quantity: 150, unitPrice: 100, revenue: 15000 },
      { id: 2, name: 'Aluminum Frames', category: 'Frames', quantity: 200, unitPrice: 50, revenue: 10000 }
    ]
  },
  {
    id: 2,
    invoiceNumber: 'INV-002',
    customer: 'Jane Smith',
    dateOrder: '2024-03-02',
    dateDelivery: '2024-03-07',
    customerType: 'sales-invoice',
    totalRevenue: 18500,
    products: [
      { id: 3, name: 'Shower Enclosure', category: 'Glass', quantity: 5, unitPrice: 2000, revenue: 10000 },
      { id: 4, name: 'Mirror', category: 'Glass', quantity: 15, unitPrice: 300, revenue: 4500 },
      { id: 5, name: 'Glass Shelves', category: 'Glass', quantity: 20, unitPrice: 200, revenue: 4000 }
    ]
  },
  {
    id: 3,
    invoiceNumber: 'INV-003',
    customer: 'Acme Corporation',
    dateOrder: '2024-03-03',
    dateDelivery: '2024-03-10',
    customerType: 'quotation/project',
    totalRevenue: 75000,
    products: [
      { id: 6, name: 'Double Glazed Windows', category: 'Windows', quantity: 50, unitPrice: 1000, revenue: 50000 },
      { id: 7, name: 'Aluminium Door Frames', category: 'Frames', quantity: 25, unitPrice: 800, revenue: 20000 },
      { id: 8, name: 'Glass Balustrades', category: 'Glass', quantity: 10, unitPrice: 500, revenue: 5000 }
    ]
  },
  {
    id: 4,
    invoiceNumber: 'INV-004',
    customer: 'Bob Johnson',
    dateOrder: '2024-03-04',
    dateDelivery: '2024-03-06',
    customerType: 'sales-invoice',
    totalRevenue: 3500,
    products: [
      { id: 9, name: 'Glass Coffee Table', category: 'Furniture', quantity: 1, unitPrice: 2500, revenue: 2500 },
      { id: 10, name: 'Glass Vase', category: 'Decor', quantity: 5, unitPrice: 200, revenue: 1000 }
    ]
  },
  {
    id: 5,
    invoiceNumber: 'INV-005',
    customer: 'Global Constructions Ltd.',
    dateOrder: '2024-03-05',
    dateDelivery: '2024-03-20',
    customerType: 'quotation/project',
    totalRevenue: 150000,
    products: [
      { id: 11, name: 'Curtain Wall System', category: 'Glass', quantity: 1, unitPrice: 100000, revenue: 100000 },
      { id: 12, name: 'Structural Glass Panels', category: 'Glass', quantity: 20, unitPrice: 2500, revenue: 50000 }
    ]
  },
  {
    id: 6,
    invoiceNumber: 'INV-006',
    customer: 'Sarah Williams',
    dateOrder: '2024-03-06',
    dateDelivery: '2024-03-08',
    customerType: 'sales-invoice',
    totalRevenue: 1200,
    products: [
      { id: 13, name: 'Bathroom Mirror', category: 'Glass', quantity: 2, unitPrice: 400, revenue: 800 },
      { id: 14, name: 'Glass Soap Dispenser', category: 'Accessories', quantity: 4, unitPrice: 100, revenue: 400 }
    ]
  },
  {
    id: 7,
    invoiceNumber: 'INV-007',
    customer: 'Luxury Hotels Inc.',
    dateOrder: '2024-03-07',
    dateDelivery: '2024-03-25',
    customerType: 'quotation/project',
    totalRevenue: 200000,
    products: [
      { id: 15, name: 'Decorative Glass Panels', category: 'Glass', quantity: 30, unitPrice: 3000, revenue: 90000 },
      { id: 16, name: 'Mirrored Walls', category: 'Glass', quantity: 10, unitPrice: 5000, revenue: 50000 },
      { id: 17, name: 'Glass Chandeliers', category: 'Lighting', quantity: 15, unitPrice: 4000, revenue: 60000 }
    ]
  },
  {
    id: 8,
    invoiceNumber: 'INV-008',
    customer: 'David Lee',
    dateOrder: '2024-03-08',
    dateDelivery: '2024-03-11',
    customerType: 'sales-invoice',
    totalRevenue: 5500,
    products: [
      { id: 18, name: 'Glass Dining Table', category: 'Furniture', quantity: 1, unitPrice: 3500, revenue: 3500 },
      { id: 19, name: 'Glass Side Tables', category: 'Furniture', quantity: 2, unitPrice: 1000, revenue: 2000 }
    ]
  },
  {
    id: 9,
    invoiceNumber: 'INV-009',
    customer: 'Modern Offices Co.',
    dateOrder: '2024-03-09',
    dateDelivery: '2024-03-18',
    customerType: 'quotation/project',
    totalRevenue: 80000,
    products: [
      { id: 20, name: 'Glass Partitions', category: 'Glass', quantity: 15, unitPrice: 3000, revenue: 45000 },
      { id: 21, name: 'Frosted Glass Doors', category: 'Doors', quantity: 10, unitPrice: 2500, revenue: 25000 },
      { id: 22, name: 'Glass Whiteboards', category: 'Office Supplies', quantity: 20, unitPrice: 500, revenue: 10000 }
    ]
  },
  {
    id: 10,
    invoiceNumber: 'INV-010',
    customer: 'Emily Brown',
    dateOrder: '2024-03-10',
    dateDelivery: '2024-03-12',
    customerType: 'sales-invoice',
    totalRevenue: 2800,
    products: [
      { id: 23, name: 'Glass Picture Frames', category: 'Decor', quantity: 10, unitPrice: 150, revenue: 1500 },
      { id: 24, name: 'Glass Coasters', category: 'Accessories', quantity: 20, unitPrice: 25, revenue: 500 },
      { id: 25, name: 'Glass Candle Holders', category: 'Decor', quantity: 8, unitPrice: 100, revenue: 800 }
    ]
  }
];

const HalifaxSalesPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [salesData, setSalesData] = useState(initialSalesData);
  const [customerModal, setCustomerModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filteredData, setFilteredData] = useState(salesData);
  const [dateRange, setDateRange] = useState([null, null]);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const filtered = salesData.filter(item => 
      (item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.products.some(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (filterType === 'all' || item.customerType === filterType) &&
      (!dateRange[0] || new Date(item.dateOrder) >= dateRange[0]) &&
      (!dateRange[1] || new Date(item.dateOrder) <= dateRange[1])
    );
    setFilteredData(filtered);
  }, [searchTerm, filterType, salesData, dateRange]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    setSalesData(salesData.filter((item) => item.id !== id));
    setSelected(selected.filter(selectedId => selectedId !== id));
  };

  const handleEdit = (id) => {
    console.log('Edit item', id);
  };

  const handleView = (id) => {
    console.log('View item', id);
  };

  const handleOpenCustomerModal = () => setCustomerModal(true);
  const handleCloseCustomerModal = () => setCustomerModal(false);
  const handleCreateCustomer = (customerData) => {
    console.log('New customer:', customerData);
  };

  const handleClearFilter = () => {
    setSearchTerm('');
    setFilterType('all');
    setDateRange([null, null]);
    setFilteredData(salesData);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const totalSalesInRange = filteredData.reduce((sum, item) => sum + item.totalRevenue, 0);

  const handleExpandRow = (id) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Container maxWidth="xxl" sx={{ mt: 0, px: '0!important' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            placeholder="Search..."
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
          <FormControl sx={{ ml: 1, mr: 1, minWidth: 120 }} size="small">
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="sales-invoice">Sales Invoice</MenuItem>
              <MenuItem value="quotation/project">Quotation/Project</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Start Date"
              endText="End Date"
              value={dateRange}
              onChange={(newValue) => setDateRange(newValue)}
              slotProps={{ textField: { InputProps: { endAdornment: <CalendarOutlined />, size: 'small' } } }}
            />
          </LocalizationProvider>
          <Button variant="text" color="error" sx={{ml:1, padding:0, minWidth:0}} onClick={handleClearFilter}>
            <ClearOutlined />
          </Button>
        </Box>
        <Box>
          <Button variant="contained" component={RouterLink} to="/app/sales/newOrder" color="error" sx={{mr:1}} startIcon={<PlusOutlined />}>
            New Order
          </Button>
          <Button variant="contained" color="info" startIcon={<PlusOutlined />} onClick={handleOpenCustomerModal}>
            Add Customer
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < filteredData.length}
                  checked={filteredData.length > 0 && selected.length === filteredData.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell align="right">Total Revenue (₱)</TableCell>
              <TableCell>Date Order</TableCell>
              <TableCell>Date Delivery</TableCell>
              <TableCell>Sales Type</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              const isItemSelected = isSelected(row.id);
              const isExpanded = expandedRows[row.id] || false;
              return (
                <React.Fragment key={row.id}>
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} />
                    </TableCell>
                    <TableCell>{row.invoiceNumber}</TableCell>
                    <TableCell>{row.customer}</TableCell>
                    <TableCell align="right">₱{row.totalRevenue.toLocaleString()}</TableCell>
                    <TableCell>{row.dateOrder}</TableCell>
                    <TableCell>{row.dateDelivery}</TableCell>
                    <TableCell>{row.customerType}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleExpandRow(row.id)}>
                        {isExpanded ? <UpOutlined /> : <DownOutlined />}
                      </IconButton>
                      <IconButton onClick={() => handleView(row.id)}>
                        <EyeOutlined />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(row.id)}>
                        <EditOutlined />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row.id)}>
                        <DeleteOutlined />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Typography variant="h6" gutterBottom component="div">
                            Products
                          </Typography>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Unit Price (₱)</TableCell>
                                <TableCell align="right">Revenue (₱)</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {row.products.map((product) => (
                                <TableRow key={product.id}>
                                  <TableCell component="th" scope="row">
                                    {product.name}
                                  </TableCell>
                                  <TableCell>{product.category}</TableCell>
                                  <TableCell align="right">{product.quantity}</TableCell>
                                  <TableCell align="right">₱{product.unitPrice.toLocaleString()}</TableCell>
                                  <TableCell align="right">₱{product.revenue.toLocaleString()}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
            <TableRow>
              <TableCell colSpan={3} align="right">
                <Typography variant="subtitle1">Total Sales in Range:</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1">₱{totalSalesInRange.toLocaleString()}</Typography>
              </TableCell>
              <TableCell colSpan={4} />
            </TableRow>
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
      <CustomerCreationModal
        open={customerModal} 
        handleClose={handleCloseCustomerModal}
        handleCreateCustomer={handleCreateCustomer}
      />
    </Container>
  );
};

export default HalifaxSalesPage;