import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Avatar,
  Box,
  Grid,
  Card,
  Divider,
  CardContent,
  Container,
} from "@mui/material";

import RefreshOutlined from "@mui/icons-material/RefreshOutlined";
import { Formik, Form, Field } from "formik";

import { CircularProgress } from "@mui/material";
import { userPasswordChangeRules } from "../validators";
import Notification from "../components/Notification";

const ChangePasswordDialogForm = (props) => {
  const { passwordDialogForm, setPasswordDialogForm } = props;

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const initialValues = {
    username: passwordDialogForm.userName ? passwordDialogForm.userName : "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  };

  return (
    <Dialog open={passwordDialogForm.isOpen}>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth="xs">
          <Card>
            <Notification notify={notify} setNotify={setNotify} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ mt: 1, mb: 1, bgcolor: "secondary.main" }}>
                <RefreshOutlined />
              </Avatar>
              <div>
                <Typography component="h1" variant="h3">
                  Password Change Form
                </Typography>
              </div>
            </Box>

            <Formik
              initialValues={initialValues}
              onSubmit={async (values, props) => {
                try {
                  const user = await changePassword({
                    variables: values,
                  });
                  if (user.data.changePassword) {
                    setNotify({
                      isOpen: true,
                      message: user.data.changePassword.message,
                      type: "success",
                    });
                    setTimeout(() => {
                      setPasswordDialogForm({ isOpen: false });
                      setNotify({
                        isOpen: false,
                      });
                    }, 2000);
                  }
                } catch (error) {
                  if (error.graphQLErrors) {
                    error.graphQLErrors.map(({ message, extensions }) => {
                      setNotify({
                        isOpen: true,
                        message: message,
                        type: "error",
                      });
                    });
                    props.setSubmitting(false);
                    props.resetForm();
                  } else {
                    setNotify({
                      isOpen: true,
                      message: JSON.stringify(err),
                      type: "error",
                    });
                    props.setSubmitting(false);
                    props.resetForm();
                  }
                }
              }}
              validationSchema={userPasswordChangeRules}
            >
              {(props) => (
                <Form>
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item md={12} xs={12}>
                        <Field
                          error={
                            props.touched.username &&
                            Boolean(props.errors.username)
                          }
                          as={TextField}
                          variant="standard"
                          margin="normal"
                          autoComplete="off"
                          placeholder="Enter your Username"
                          required
                          disabled={passwordDialogForm.userName ? true : false}
                          fullWidth
                          id="username"
                          label="Username"
                          name="username"
                          helperText={
                            props.touched.username && props.errors.username
                          }
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Field
                          error={
                            props.touched.password &&
                            Boolean(props.errors.password)
                          }
                          as={TextField}
                          variant="standard"
                          autoFocus
                          margin="normal"
                          autoComplete="off"
                          placeholder="Enter your Previous Password"
                          required
                          fullWidth
                          name="password"
                          label="Old Password"
                          type="password"
                          id="password"
                          helperText={
                            props.touched.password && props.errors.password
                          }
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Field
                          error={
                            props.touched.newPassword &&
                            Boolean(props.errors.newPassword)
                          }
                          as={TextField}
                          variant="standard"
                          margin="normal"
                          autoComplete="off"
                          placeholder="Enter your new Password"
                          required
                          fullWidth
                          name="newPassword"
                          label="New Password"
                          type="password"
                          id="newPassword"
                          helperText={
                            props.touched.newPassword &&
                            props.errors.newPassword
                          }
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Field
                          error={
                            props.touched.confirmPassword &&
                            Boolean(props.errors.confirmPassword)
                          }
                          as={TextField}
                          variant="standard"
                          margin="normal"
                          autoComplete="off"
                          placeholder="Confirm your new Password"
                          required
                          fullWidth
                          name="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          id="confirmPassword"
                          helperText={
                            props.touched.confirmPassword &&
                            props.errors.confirmPassword
                          }
                        />
                      </Grid>
                    </Grid>
                  </CardContent>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      pt: 0,
                      pb: 3,
                      pl: 2,
                      pr: 2,
                    }}
                  >
                    <Grid item md={12} xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                      >
                        {props.isSubmitting ? (
                          <CircularProgress
                            size={25}
                            color="inherit"
                            thickness={4}
                          />
                        ) : (
                          "Update Password"
                        )}
                      </Button>
                    </Grid>
                  </Box>
                </Form>
              )}
            </Formik>
          </Card>
        </Container>
      </Box>
    </Dialog>
  );
};

export default ChangePasswordDialogForm;
