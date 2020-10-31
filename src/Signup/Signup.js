import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";

import "./Signup.css";

function signup(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { email, password, confirmPassword } = form;

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const target = event.target;
    setForm({ ...form, [target.name]: target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password must be same");
      return;
    }

    setLoading(true);

    try {
      const result = await signup(email, password);

      console.log("result", result);
    } catch (error) {
      console.log("error", error);

      alert((error && error.message) || "Faild to signup");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="Signup Auth">
      <h2>Signup</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={handleChange}
            disabled={loading}
          />
          <label>Email</label>
        </div>

        <div>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={handleChange}
            disabled={loading}
          />
          <label>Pasword</label>
        </div>

        <div>
          <input
            type="password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={handleChange}
            disabled={loading}
          />
          <label>Confirm pasword</label>
        </div>

        <button type="submit" disabled={loading}>
          Sign up
        </button>
      </form>

      <p>
        Already regesterd? <Link to="/login">Goto Login</Link>
      </p>
    </div>
  );
}
