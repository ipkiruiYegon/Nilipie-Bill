import React, { useState, useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  Card,
  Divider,
  CardContent,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Helmet } from "react-helmet-async";
import { Formik, Form, Field } from "formik";
import { userAuthenticationRules } from "../validators";
import CircularProgress from "@mui/material/CircularProgress";
import ChangePasswordDialogForm from "../components/PasswordChangeForm";
import Notification from "../components/Notification";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/ipkiruiYegon">
        Yegon Kipkirui Geoffrey
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const SignIn = () => {
  const navigate = useNavigate();
  // const [authProfile, setAuthProfile] = useRecoilState(userProfile);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [passwordDialogForm, setPasswordDialogForm] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    userName: "",
  });

  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <>
      <Helmet>
        <title>Login | H-Bill</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="xs">
          <Card raised={true} sx={{ mt: 10, mb: 2, mr: 2, ml: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ mt: 2, mb: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography color="textPrimary" variant="h2">
                  H-Bill Login
                </Typography>
              </Box>

              <Notification notify={notify} setNotify={setNotify} />
              <ChangePasswordDialogForm
                passwordDialogForm={passwordDialogForm}
                setPasswordDialogForm={setPasswordDialogForm}
              />
            </Box>
            <CardContent sx={{ mr: 1, ml: 1 }}>
              <Formik
                initialValues={initialValues}
                onSubmit={async (values, props) => {
                  try {
                    const user = await authenticateUser({ variables: values });

                    if (user.data.authenticateUser) {
                      sessionStorage.removeItem("token");
                      dispatch({
                        type: "LOGIN",
                        payload: user.data.authenticateUser.User,
                      });

                      navigate("/app/dashboard", { replace: true });
                    }
                  } catch (error) {
                    if (error.graphQLErrors) {
                      error.graphQLErrors.map(({ message, extensions }) => {
                        if (message === "User required to change password") {
                          setPasswordDialogForm({
                            isOpen: true,
                            userName: values.username,
                          });
                        } else {
                          setNotify({
                            isOpen: true,
                            message: message,
                            type: "error",
                          });
                        }
                      });
                      props.setSubmitting(false);
                      props.resetForm();
                    } else if (error.networkError) {
                      setNotify({
                        isOpen: true,
                        message:
                          "Network error, could not connect to the server",
                        type: "error",
                      });
                    } else {
                      setNotify({
                        isOpen: true,
                        message: "Internal Server error",
                        type: "error",
                      });
                      props.setSubmitting(false);
                      props.resetForm();
                    }
                  }
                }}
                validationSchema={userAuthenticationRules}
              >
                {(props) => (
                  <Form>
                    <Field
                      error={
                        props.touched.username && Boolean(props.errors.username)
                      }
                      as={TextField}
                      variant="outlined"
                      values={props.values.username}
                      color="success"
                      margin="normal"
                      autoComplete="off"
                      placeholder="Enter your Username"
                      required
                      autoFocus={true}
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      helperText={
                        props.touched.username && props.errors.username
                      }
                    />
                    <Field
                      error={
                        props.touched.password && Boolean(props.errors.password)
                      }
                      as={TextField}
                      variant="outlined"
                      values={props.values.password}
                      color="success"
                      margin="normal"
                      autoComplete="off"
                      placeholder="Enter your Password"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      helperText={
                        props.touched.password && props.errors.password
                      }
                    />
                    <Box sx={{ py: 2 }}>
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
                          "Sign In"
                        )}
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>

              <Typography color="textSecondary" variant="body1">
                Forgot Your Password?{" "}
                <Link component={RouterLink} to="/reset" variant="h6">
                  Reset Here
                </Link>
              </Typography>
            </CardContent>
            <Divider />
            <Copyright sx={{ mt: 2, mb: 3 }} />
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default SignIn;
