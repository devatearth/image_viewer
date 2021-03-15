import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle(props) {
  if (props.module === "usernameUpdate") {
    var top = 45;
    var left = 40;
  } else {
    var top = 40;
    var left = 40;
  }
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
var updatedUsername = "";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function usernameUpdateHandler(props) {
  if (updatedUsername !== "") {
   props.performUpdate(updatedUsername);
  }
  console.log("name");
}
function storeName(event) {
  updatedUsername = event.target.value;
}
export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle(props));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateUsername = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <h2 id="simple-modal-title">Edit</h2>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="username" required>
            Full Name
          </InputLabel>
          <Input id="username" type="text" onChange={storeName} />
        </FormControl>
      </div>
      <div>
      <Button
        variant="contained"
        color="primary"
        onClick={usernameUpdateHandler(props)}
      >
        UPDATE
      </Button>
      </div>
    </div>
  );

  return (
    
    <div>
      {console.log("div")}
      <Modal
        open={props.open}
        onClose={props.closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {updateUsername}
      </Modal>
    </div>
  );
}