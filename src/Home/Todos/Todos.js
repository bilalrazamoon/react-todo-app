import firebase from "firebase/app";
import "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import "./Todos.css";

function addTodo(title) {
  const todo = { title, description: "", checked: false };

  return firebase.firestore().collection("/new-todos").add(todo);
}

function listenTodos(successCallback, errorCallback) {
  return firebase
    .firestore()
    .collection("/new-todos")
    .onSnapshot(
      (data) => {
        const todos = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        successCallback(todos);
      },
      (error) => {
        console.log("error", error);
        errorCallback(error);
      }
    );
}

function checkTodo(id, checked) {
  firebase
    .firestore()
    .doc("/new-todos/" + id)
    .update({ checked });
}

export function Todos() {
  const [todos, setTodos] = useState([]);

  const [title, setTitle] = useState("");

  let { url } = useRouteMatch();

  useEffect(() => {
    console.log("todos mount");

    const unsubs = listenTodos(
      (_todos) => {
        setTodos(_todos);
      },
      (error) => {}
    );

    return () => {
      console.log("todos unmount");

      unsubs();
    };
  }, []);

  function onCheck(todo, event) {
    event.preventDefault();

    checkTodo(todo.id, !todo.checked);
  }

  function onSubmit(event) {
    event.preventDefault();

    if (title) {
      addTodo(title);

      setTitle("");
    }
  }

  function onTitleChange(event) {
    const target = event.target;

    setTitle(target.value);
  }

  return (
    <div className="Todos">
      <form onSubmit={onSubmit}>
        <input type="text" value={title} onChange={onTitleChange}></input>

        <button type="submit">Add</button>
      </form>

      <div className="list">
        {todos.map((todo) => (
          <div className="item" key={todo.id}>
            <Link to={url + "/" + todo.id}>
              <span>{todo.title}</span>

              <button onClick={(event) => onCheck(todo, event)}>
                {todo.checked ? "✔" : ""}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
