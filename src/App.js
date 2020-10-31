import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

import { Login } from "./Login/Login";
import { Signup } from "./Signup/Signup";
import { ForgotPasword } from "./ForgotPasword/ForgotPasword";
import { ConfirmPasword } from "./ConfirmPassword/ConfirmPassword";
import { Home } from "./Home/Home";

import "./App.css";

const firebaseConfig = {
  // ...
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(function () {
    console.log("App mount");

    firebase.auth().onAuthStateChanged(function (user) {
      console.log("user", user);
      setCurrentUser(user);
    });

    return function () {
      console.log("App unmount");
    };
  }, []);

  return (
    <Router>
      {currentUser === undefined ? (
        <div className="loader">Loading...</div>
      ) : (
        <Switch>
          <Route path="/login">
            {currentUser ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/signup">
            {currentUser ? <Redirect to="/" /> : <Signup />}
          </Route>
          <Route path="/forgot-password">
            {currentUser ? <Redirect to="/" /> : <ForgotPasword />}
          </Route>
          <Route path="/confirm-password">
            {currentUser ? <Redirect to="/" /> : <ConfirmPasword />}
          </Route>

          <Route path="/">
            {currentUser ? <Home /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      )}
    </Router>
  );
}

export default App;
