import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Header from "app/Header";
import { Container } from "@material-ui/core";
import GameProgress from "app/gameProgress/GameProgress";

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
        <GameProgress />
      </div>
    </Container>
  );
};

export default App;
