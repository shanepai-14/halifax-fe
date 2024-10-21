import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Box, 
  Button,
  Grid,
  Divider
} from '@mui/material';
import { PrinterOutlined } from '@ant-design/icons';

const SignatureField = ({ label, value }) => (
  <Box sx={{ mt: 0, mb:0 }}>
    <Typography variant="body2">{label}</Typography>
    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{value || '_________________'}</Typography>
  </Box>
);

const InvoicePreview = () => {
  const location = useLocation();
  const invoiceData = location.state?.invoiceData;
  const contentRef = useRef(null);
   console.log(invoiceData);
  const handlePrint = useReactToPrint({
    contentRef,
  });

  if (!invoiceData) {
    return <Typography>No invoice data available.</Typography>;
  }

  // Assume we have the current user's name for the Cashier field
  const currentUserName = "John Doe"; // Replace with actual logged-in user's name

  return (
    <Box>
      <Box ref={contentRef} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
          <Box>
            <Typography variant="h4" gutterBottom>Halifax Glass and Aluminum Supply Inc.</Typography>
            <Typography>Saavedra Bldg., Times Beach, Matina Aplaya,</Typography>
            <Typography>Davao City, Philippines</Typography>
            <Typography>Phone: 0939 924 3876</Typography>
            <Typography>Email: glasshalifax@gmail.com</Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h5" gutterBottom>{invoiceData.salesType === 'sales-invoice' ? 'Invoice' : 'Quotation'}</Typography>
            <Typography>Date: {new Date(invoiceData.orderDate).toLocaleDateString()}</Typography>
            <Typography>Delivery Date: {new Date(invoiceData.deliveryDate).toLocaleDateString()}</Typography>
            <Typography>Invoice #: {invoiceData.invoiceNumber}</Typography>
            <Typography>Cashier : {currentUserName}</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>Bill To:</Typography>
          <Typography>{invoiceData.customer.name}</Typography>
          <Typography>{invoiceData.customer.address}</Typography>
          <Typography>Phone: {invoiceData.customer.phone}</Typography>
        </Box>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceData.orderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">₱{item.price.toFixed(2)}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">₱{(item.price * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right"><strong>Total:</strong></TableCell>
                <TableCell align="right"><strong>₱{invoiceData.totalPrice.toFixed(2)}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mb: 4, display:'flex', justifyContent:'space-between', alignItems:'end',gap:3 }}>
       
          <SignatureField label="Checked by" />
          <SignatureField label="Released by" />
          <SignatureField label="Delivered by" />
          <SignatureField label="Received by" />

        </Box>

      
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" startIcon={<PrinterOutlined />} onClick={handlePrint}>
          Print Invoice
        </Button>
      </Box>
    </Box>
  );
};

export default InvoicePreview;