import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Container, TablePagination, IconButton, Button, Modal, Box,
  TextField, Checkbox, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel,
  Select, MenuItem, InputAdornment
} from '@mui/material';
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined, SearchOutlined , CalendarOutlined ,ClearOutlined } from '@ant-design/icons';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CustomerCreationModal from './CustomerCreationModal';
import { Link as RouterLink } from 'react-router-dom';
// Updated sample data
const initialSalesData = [
    { id: 1, invoiceNumber: 'INV-001', customer: 'John Doe', product: 'Tempered Glass', quantity: 150, revenue: 15000, dateOrder: '2024-03-01', dateDelivery: '2024-03-05', customerType: 'quotation/project' },
    { id: 2, invoiceNumber: 'INV-002', customer: 'Jane Smith', product: 'Aluminum Frames', quantity: 200, revenue: 10000, dateOrder: '2024-03-02', dateDelivery: '2024-03-07', customerType: 'sales-invoice' },
    { id: 3, invoiceNumber: 'INV-003', customer: 'Bob Johnson', product: 'Glass Shower Doors', quantity: 75, revenue: 22500, dateOrder: '2024-03-03', dateDelivery: '2024-03-10', customerType: 'quotation/project' },
    { id: 4, invoiceNumber: 'INV-004', customer: 'Alice Brown', product: 'Mirrors', quantity: 100, revenue: 5000, dateOrder: '2024-03-04', dateDelivery: '2024-03-06', customerType: 'sales-invoice' },
    { id: 5, invoiceNumber: 'INV-005', customer: 'Charlie Davis', product: 'Window Panes', quantity: 300, revenue: 9000, dateOrder: '2024-03-05', dateDelivery: '2024-03-12', customerType: 'quotation/project' },
    { id: 6, invoiceNumber: 'INV-006', customer: 'Eve Wilson', product: 'Glass Tabletops', quantity: 50, revenue: 7500, dateOrder: '2024-03-06', dateDelivery: '2024-03-09', customerType: 'sales-invoice' },
    { id: 7, invoiceNumber: 'INV-007', customer: 'Frank Miller', product: 'Aluminum Siding', quantity: 180, revenue: 13500, dateOrder: '2024-03-07', dateDelivery: '2024-03-14', customerType: 'quotation/project' },
    { id: 8, invoiceNumber: 'INV-008', customer: 'Grace Lee', product: 'Glass Partitions', quantity: 25, revenue: 18750, dateOrder: '2024-03-08', dateDelivery: '2024-03-15', customerType: 'quotation/project' },
    { id: 9, invoiceNumber: 'INV-009', customer: 'Henry Taylor', product: 'Tempered Glass', quantity: 100, revenue: 10000, dateOrder: '2024-03-09', dateDelivery: '2024-03-11', customerType: 'sales-invoice' },
    { id: 10, invoiceNumber: 'INV-010', customer: 'Ivy Moore', product: 'Aluminum Frames', quantity: 150, revenue: 7500, dateOrder: '2024-03-10', dateDelivery: '2024-03-13', customerType: 'quotation/project' },
    { id: 11, invoiceNumber: 'INV-011', customer: 'Jack Robinson', product: 'Glass Shower Doors', quantity: 60, revenue: 18000, dateOrder: '2024-03-11', dateDelivery: '2024-03-18', customerType: 'quotation/project' },
    { id: 12, invoiceNumber: 'INV-012', customer: 'Karen White', product: 'Mirrors', quantity: 80, revenue: 4000, dateOrder: '2024-03-12', dateDelivery: '2024-03-14', customerType: 'sales-invoice' },
    { id: 13, invoiceNumber: 'INV-013', customer: 'Liam Harris', product: 'Window Panes', quantity: 250, revenue: 7500, dateOrder: '2024-03-13', dateDelivery: '2024-03-20', customerType: 'quotation/project' },
    { id: 14, invoiceNumber: 'INV-014', customer: 'Mia Clark', product: 'Glass Tabletops', quantity: 40, revenue: 6000, dateOrder: '2024-03-14', dateDelivery: '2024-03-17', customerType: 'sales-invoice' },
    { id: 15, invoiceNumber: 'INV-015', customer: 'Noah Lewis', product: 'Aluminum Siding', quantity: 200, revenue: 15000, dateOrder: '2024-03-15', dateDelivery: '2024-03-22', customerType: 'quotation/project' },
    { id: 16, invoiceNumber: 'INV-016', customer: 'Olivia Walker', product: 'Glass Partitions', quantity: 30, revenue: 22500, dateOrder: '2024-03-16', dateDelivery: '2024-03-23', customerType: 'quotation/project' },
    { id: 17, invoiceNumber: 'INV-017', customer: 'Peter Hall', product: 'Tempered Glass', quantity: 120, revenue: 12000, dateOrder: '2024-03-17', dateDelivery: '2024-03-19', customerType: 'sales-invoice' },
    { id: 18, invoiceNumber: 'INV-018', customer: 'Quinn Adams', product: 'Aluminum Frames', quantity: 180, revenue: 9000, dateOrder: '2024-03-18', dateDelivery: '2024-03-21', customerType: 'quotation/project' },
    { id: 19, invoiceNumber: 'INV-019', customer: 'Rachel Turner', product: 'Glass Shower Doors', quantity: 70, revenue: 21000, dateOrder: '2024-03-19', dateDelivery: '2024-03-26', customerType: 'quotation/project' },
    { id: 20, invoiceNumber: 'INV-020', customer: 'Samuel Green', product: 'Mirrors', quantity: 90, revenue: 4500, dateOrder: '2024-03-20', dateDelivery: '2024-03-22', customerType: 'sales-invoice' },
    { id: 21, invoiceNumber: 'INV-021', customer: 'Tara Campbell', product: 'Window Panes', quantity: 280, revenue: 8400, dateOrder: '2024-03-21', dateDelivery: '2024-03-28', customerType: 'quotation/project' },
    { id: 22, invoiceNumber: 'INV-022', customer: 'Ulysses King', product: 'Glass Tabletops', quantity: 45, revenue: 6750, dateOrder: '2024-03-22', dateDelivery: '2024-03-25', customerType: 'sales-invoice' },
    { id: 23, invoiceNumber: 'INV-023', customer: 'Victoria Scott', product: 'Aluminum Siding', quantity: 220, revenue: 16500, dateOrder: '2024-03-23', dateDelivery: '2024-03-30', customerType: 'quotation/project' },
    { id: 24, invoiceNumber: 'INV-024', customer: 'William Baker', product: 'Glass Partitions', quantity: 35, revenue: 26250, dateOrder: '2024-03-24', dateDelivery: '2024-03-31', customerType: 'quotation/project' },
    { id: 25, invoiceNumber: 'INV-025', customer: 'Xander Morris', product: 'Tempered Glass', quantity: 130, revenue: 13000, dateOrder: '2024-03-25', dateDelivery: '2024-03-27', customerType: 'sales-invoice' },
    { id: 26, invoiceNumber: 'INV-026', customer: 'Yasmin Reed', product: 'Aluminum Frames', quantity: 190, revenue: 9500, dateOrder: '2024-03-26', dateDelivery: '2024-03-29', customerType: 'quotation/project' },
    { id: 27, invoiceNumber: 'INV-027', customer: 'Zachary Cook', product: 'Glass Shower Doors', quantity: 80, revenue: 24000, dateOrder: '2024-03-27', dateDelivery: '2024-04-03', customerType: 'quotation/project' },
    { id: 28, invoiceNumber: 'INV-028', customer: 'Abigail Ward', product: 'Mirrors', quantity: 110, revenue: 5500, dateOrder: '2024-03-28', dateDelivery: '2024-03-30', customerType: 'sales-invoice' },
    { id: 29, invoiceNumber: 'INV-029', customer: 'Benjamin Ross', product: 'Window Panes', quantity: 320, revenue: 9600, dateOrder: '2024-03-29', dateDelivery: '2024-04-05', customerType: 'quotation/project' },
    { id: 30, invoiceNumber: 'INV-030', customer: 'Chloe Long', product: 'Glass Tabletops', quantity: 55, revenue: 8250, dateOrder: '2024-03-30', dateDelivery: '2024-04-02', customerType: 'sales-invoice' }
  ];




const HalifaxSalesPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [salesData, setSalesData] = useState(initialSalesData);
    const [openModal, setOpenModal] = useState(false);
    const [customerModal, setCustomerModal] = useState(false);
    const [newOrder, setNewOrder] = useState({ 
      invoiceNumber: '', customer: '', product: '', quantity: '', revenue: '', 
      dateOrder: '', dateDelivery: '', customerType: 'walk-in' 
    });
    const [selected, setSelected] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filteredData, setFilteredData] = useState(salesData);
    const [dateRange, setDateRange] = useState([null, null]);

    useEffect(() => {
        const filtered = salesData.filter(item => 
          (item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
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

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenCustomerModal = () =>  setCustomerModal(true);
  const handleCloseCustomerModal = () => setCustomerModal(false);
  const handleCreateCustomer = (customerData) => {
    // Handle the new customer data here
    console.log('New customer:', customerData);
    // You might want to add this to your state or send it to an API
  };

  const handleClearFilter = () => {
    setSearchTerm('');
    setFilterType('all');
    setDateRange([null, null]);
    setFilteredData(salesData);
  }

  const handleNewOrderChange = (event) => {
    setNewOrder({ ...newOrder, [event.target.name]: event.target.value });
  };

  const handleAddNewOrder = () => {
    const newId = Math.max(...salesData.map((item) => item.id)) + 1;
    const newInvoiceNumber = `INV-₱{String(newId).padStart(3, '0')}`;
    setSalesData([...salesData, { id: newId, invoiceNumber: newInvoiceNumber, ...newOrder, quantity: parseInt(newOrder.quantity), revenue: parseFloat(newOrder.revenue) }]);
    setNewOrder({ invoiceNumber: '', customer: '', product: '', quantity: '', revenue: '', dateOrder: '', dateDelivery: '', customerType: 'walk-in' });
    handleCloseModal();
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

  const totalSalesInRange = filteredData.reduce((sum, item) => sum + item.revenue, 0);

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
        <FormControl sx={{ ml: 1,mr:1, minWidth: 120 }} size="small">
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
            slotProps={{ textField: { InputProps: { endAdornment: <CalendarOutlined />,size: 'small'  } } }}
          />
        </LocalizationProvider>
        <Button variant="text" color="error" sx={{ml:1 ,padding:0 ,minWidth:0}}  onClick={handleClearFilter}>
        <ClearOutlined />
      </Button>

      </Box>
      <Box>
      <Button variant="contained" 
      component={RouterLink}
      to="/sales/newOrder" color="error" sx={{mr:1}} startIcon={<PlusOutlined />} >
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
              <TableCell>Product</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Revenue (₱)</TableCell>
              <TableCell>Date Order</TableCell>
              <TableCell>Date Delivery</TableCell>
              <TableCell>Sales Type</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              const isItemSelected = isSelected(row.id);
              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell>{row.invoiceNumber}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">₱{row.revenue.toLocaleString()}</TableCell>
                  <TableCell>{row.dateOrder}</TableCell>
                  <TableCell>{row.dateDelivery}</TableCell>
                  <TableCell>{row.customerType}</TableCell>
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
              );
            })}
            <TableRow>
            <TableCell colSpan={5} align="right">
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