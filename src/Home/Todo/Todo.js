import firebase from "firebase/app";
import "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Todo.css";

function updateTitle(id, title) {
  firebase
    .firestore()
    .doc("/new-todos/" + id)
    .update({ title });
}

function updateDescription(id, description) {
  firebase
    .firestore()
    .doc("/new-todos/" + id)
    .update({ description });
}

function checkTodo(id, checked) {
  firebase
    .firestore()
    .doc("/new-todos/" + id)
    .update({ checked });
}

function listenTodo(id, successCallback, errorCallback) {
  return firebase
    .firestore()
    .doc(`/new-todos/${id}`)
    .onSnapshot(
      (doc) => {
        const todo = doc.data();
        successCallback(todo);
      },
      (error) => {
        console.log("error", error);
        errorCallback(error);
      }
    );
}

export function Todo() {
  let { id } = useParams();

  const [todo, setTodo] = useState();

  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState("");

  const [editDescription, setEditDescription] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log("todo mount");

    const unsubs = listenTodo(
      id,
      (_todo) => {
        setTodo(_todo);
      },
      (error) => {}
    );

    return () => {
      console.log("todo unmount");

      unsubs();
    };
  }, [id]);

  function onCheck(event) {
    checkTodo(id, !todo.checked);
  }

  function onEditTitle() {
    setEditTitle(true);
    setTitle(todo.title);
  }

  function onTitleChange(event) {
    const target = event.target;
    setTitle(target.value);
  }

  function onTitleKeyPress(event) {
    if (title && event.key === "Enter") {
      setEditTitle(false);
      updateTitle(id, title);
    }
  }

  function onEditDescription() {
    setEditDescription(true);
    setDescription(todo.description);
  }

  function onDescriptionChange(event) {
    const target = event.target;
    setDescription(target.value);
  }

  function onDescriptionKeyPress(event) {
    if (event.shiftKey && event.key === "Enter") {
      setEditDescription(false);
      updateDescription(id, description);
    }
  }

  return (
    <div className="Todo">
      {todo ? (
        <>
          <div className="header">
            {editTitle ? (
              <input
                type="title"
                value={title}
                onChange={onTitleChange}
                onKeyPress={onTitleKeyPress}
                autoFocus={true}
              />
            ) : (
              <h1 onClick={onEditTitle} title="Click to edit">
                {todo.title}
              </h1>
            )}

            <button onClick={onCheck}>{todo.checked ? "✔" : ""}</button>
          </div>

          <div className="content">
            {editDescription ? (
              <textarea
                value={description}
                onChange={onDescriptionChange}
                onKeyPress={onDescriptionKeyPress}
                autoFocus={true}
              ></textarea>
            ) : (
              <p
                className={!todo.description ? "placeholder" : ""}
                onClick={onEditDescription}
                title="Click to edit"
              >
                {todo.description ? todo.description : "No Description"}
              </p>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
