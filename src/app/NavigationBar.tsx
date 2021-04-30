import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import UploadButton from "app/UploadButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

const NavigationBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h6">
          PAL Save Editor
        </Typography>
        <UploadButton />
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
