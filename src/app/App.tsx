import React, { Suspense } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Header from "app/feature/header/Header";
import { Container } from "@material-ui/core";
import GameProgress from "app/feature/gameProgress/GameProgress";
import Characters from "app/feature/characters/Characters";
import Inventory from "app/feature/inventory/Inventory";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
    main: {
      padding: theme.spacing(2),
    },
    loading: {
      margin: theme.spacing(1),
    },
  })
);

const Loading = () => {
  const classes = useStyles();
  return <div className={classes.loading}>Loading...</div>;
};

const App = () => {
  const classes = useStyles();

  return (
    <Suspense fallback={<Loading />}>
      <Container maxWidth="lg" className={classes.root}>
        <Header />
        <div className={classes.main}>
          <GameProgress />
          <Characters />
          <Inventory />
        </div>
      </Container>
    </Suspense>
  );
};

export default App;
