import React, { useEffect, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import "./App.css";
import db from "./firebase";
import firebase from "firebase";
import Todo from "./Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // when apps loads, listen to database and fetch new todos as they're added/ removed
  useEffect(() => {
    // this code fires when app.js loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="app">
      <div className="app__header">
        <h1>Planner</h1>
        <form>
          <FormControl>
            <InputLabel>Write a Todo</InputLabel>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </FormControl>

          <Button
            disabled={!input}
            type="submit"
            onClick={addTodo}
            variant="contained"
            color="primary"
          >
            Add Todo
          </Button>
        </form>
      </div>

      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
