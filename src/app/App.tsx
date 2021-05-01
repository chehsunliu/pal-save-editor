import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Header from "app/Header";
import { Container, Grid, Typography } from "@material-ui/core";
import StatCard from "app/StatCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 20,
    },
    main: {
      padding: 20,
    },
  })
);

const App = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Header />
      <div className={classes.main}>
        <Typography variant="h4" gutterBottom>
          Stats
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <StatCard name="李逍遙" />
          </Grid>
          <Grid item md={4}>
            <StatCard name="趙靈兒" />
          </Grid>
          <Grid item md={4}>
            <StatCard name="林月如" />
          </Grid>
          <Grid item md={4}>
            <StatCard name="巫后" />
          </Grid>
          <Grid item md={4}>
            <StatCard name="阿奴" />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default App;
