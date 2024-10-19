import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const AddCategoryModal = ({ open, handleClose, handleAddCategory }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Category</DialogTitle>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleAddCategory(values);
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
                name="name"
                label="Category Name"
                fullWidth
                error={touched.name && errors.name}
                helperText={touched.name && errors.name}
              />
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

export default AddCategoryModal;