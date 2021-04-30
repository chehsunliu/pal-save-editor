import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import NavigationBar from "app/NavigationBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavigationBar />
    </div>
  );
};

export default App;
