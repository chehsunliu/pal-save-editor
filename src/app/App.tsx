import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Header from "app/feature/header/Header";
import { Container } from "@material-ui/core";
import GameProgress from "app/feature/gameProgress/GameProgress";
import Characters from "app/feature/characters/Characters";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
    main: {
      padding: theme.spacing(2),
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
        <Characters />
      </div>
    </Container>
  );
};

export default App;
