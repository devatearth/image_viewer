import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

function getModalStyle(props) {
  var top,left;
  if (props.module === "usernameUpdate") {
     top = 45;
     left = 40;
  } else {
     top = 40;
     left = 40;
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
function storeName(event) {
  updatedUsername = event.target.value;
}
export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle(props));
  const [open] = React.useState(false);

  const usernameUpdateHandler = () => {
    if (updatedUsername !== "") {
      props.performUpdate(updatedUsername + " ");
    }
    console.log(open);
  }
  const getpost = () => {
    let number_of_posts = props.posts.length;
    for (let i = 0; i < number_of_posts; i++) {
      if (props.posts[i].id === props.currentId) {
        return props.posts[i];
      }
    }
  }
  var post = getpost(props.currentId);
  console.log(post);
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
      <br />
      <br />
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={usernameUpdateHandler}
        >
          UPDATE
      </Button>
      </div>
    </div>
  );

  var updateImageModal = (

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
      <br />
      <br />
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={usernameUpdateHandler}
        >
          UPDATE
      </Button>
      </div>
    </div>
  )

  return (

    <div>
      <Modal
        open={props.open}
        onClose={props.closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >

        {props.currentModal === "usernameUpdate" ? updateUsername : updateImageModal}
      </Modal>
    </div>
  );
}
