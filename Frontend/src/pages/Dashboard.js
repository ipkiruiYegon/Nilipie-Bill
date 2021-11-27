import React from "react";
import { Helmet } from "react-helmet-async";
import { Box, Container, Grid } from "@mui/material";

const Dashboard = () => (
  <>
    <Helmet>
      <title>HbillApp | Dashboard</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}></Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}></Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}></Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}></Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}></Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}></Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
