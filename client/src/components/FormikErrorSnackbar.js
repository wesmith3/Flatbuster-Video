import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const FormikErrorSnackbar = ({ formFields, onSubmit, errors }) => {
  const [open, setOpen] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (errors) {
      setOpen(true);
    } else {
      onSubmit();
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>{formFields}</form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="error">There are errors in the form.</Alert>
      </Snackbar>
    </div>
  );
};

export default FormikErrorSnackbar;
