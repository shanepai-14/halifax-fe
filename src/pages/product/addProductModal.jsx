import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .matches(/^P\d{3}$/, 'Must be in format P001')
    .required('Required'),
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  category: Yup.string()
    .required('Required'),
});

const AddProductModal = ({ open, handleClose, handleAddProduct, categories }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <Formik
        initialValues={{ code: '', name: '', category: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleAddProduct(values);
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
                name="code"
                label="Product Code"
                fullWidth
                margin="normal"
                error={touched.code && errors.code}
                helperText={touched.code && errors.code}
              />
              <Field
                as={TextField}
                name="name"
                label="Product Name"
                fullWidth
                margin="normal"
                error={touched.name && errors.name}
                helperText={touched.name && errors.name}
              />
              <Field
                as={TextField}
                select
                name="category"
                label="Category"
                fullWidth
                margin="normal"
                error={touched.category && errors.category}
                helperText={touched.category && errors.category}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Field>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>Add</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddProductModal;