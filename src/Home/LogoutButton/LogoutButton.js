import firebase from "firebase/app";
import React from "react";

import "./LogoutButton.css";

export function LogoutButton() {
  function onLogout() {
    firebase.auth().signOut();
  }

  return (
    <button className="LogoutButton" onClick={onLogout}>
      Logout
    </button>
  );
}
