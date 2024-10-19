import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name should be at least 2 characters')
    .max(50, 'Name should not exceed 50 characters'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  address: Yup.string()
    .required('Address is required')
    .max(100, 'Address should not exceed 100 characters'),
  customerType: Yup.string()
    .oneOf(['regular', 'vip', 'wholesale'], 'Invalid customer type')
    .required('Customer type is required'),
});

const CustomerCreationModal = ({ open, handleClose, handleCreateCustomer }) => {
  const initialValues = {
    name: '',
    phone: '',
    address: '',

  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create New Customer</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleCreateCustomer(values);
          setSubmitting(false);
          resetForm();
          handleClose();
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <DialogContent>
              <Field
                as={TextField}
                margin="dense"
                name="name"
                label="Full Name"
                type="text"
                fullWidth
                helperText={touched.name && errors.name}
                error={touched.name && Boolean(errors.name)}
              />
              <Field
                as={TextField}
                margin="dense"
                name="phone"
                label="Phone Number"
                type="tel"
                fullWidth
                helperText={touched.phone && errors.phone}
                error={touched.phone && Boolean(errors.phone)}
              />
              <Field
                as={TextField}
                margin="dense"
                name="address"
                label="Address"
                type="text"
                fullWidth
                multiline
                rows={3}
                helperText={touched.address && errors.address}
                error={touched.address && Boolean(errors.address)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={isSubmitting}>
                Create
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default CustomerCreationModal;