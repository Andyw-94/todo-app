import { Button, List, ListItem, ListItemText, Modal } from "@material-ui/core";
import React, { useState } from "react";
import "./Todo.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import db from "./firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const updateTodo = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );

    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>Edit</h1>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={updateTodo}>Update Todo</Button>
        </div>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemText primary={props.todo.todo} secondary="Duties" />
        </ListItem>
        <div className="todo__icons">
          <button onClick={(e) => setOpen(true)}>Edit</button>
          <DeleteIcon
            onClick={(e) =>
              db.collection("todos").doc(props.todo.id).delete()
            }
          />
        </div>
      </List>
    </>
  );
}

export default Todo;
