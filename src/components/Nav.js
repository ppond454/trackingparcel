import { useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";


import { ThemeContext } from "../App";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Nav() {
  const classes = useStyles();

  const { darkmode ,setDarkMode } = useContext(ThemeContext)


  const handleChange = async () => {
   setDarkMode(!darkmode)
   localStorage.setItem("theme",JSON.stringify(!darkmode))
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <FormControlLabel
              control={
                <Switch
                  checked={darkmode}
                  onChange={handleChange}
                  color="default"
                />
              }
              label={darkmode ? "Light Mode" : "Dark Mode"}
            />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Tracking Parcel
          </Typography>
          <Button color="inherit">ABOUT</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
