import { AppBar, Toolbar, Typography } from "@material-ui/core";

const NavigationBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">PAL Save Editor</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
