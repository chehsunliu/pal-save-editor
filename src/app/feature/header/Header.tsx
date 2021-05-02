import { ButtonGroup, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import UploadButton from "app/feature/header/UploadButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

const Header = () => {
  const classes = useStyles();

  return (
    <Toolbar>
      <Typography className={classes.title} variant="h3">
        仙劍奇俠傳1 存檔修改器
      </Typography>
      <ButtonGroup variant="contained" color="primary">
        <UploadButton />
      </ButtonGroup>
    </Toolbar>
  );
};

export default Header;
