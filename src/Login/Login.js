import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";

import "./Login.css";

function login(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { email, password } = form;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("login mount");

    return () => {
      console.log("login unmount");
    };
  }, []);

  function handleChange(event) {
    const target = event.target;

    setForm({ ...form, [target.name]: target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    try {
      const result = await login(email, password);

      console.log("result", result);
    } catch (error) {
      console.log("error", error);

      alert((error && error.message) || "Failed to login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="Login Auth">
      <h2>Login</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-control">
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

        <div className="form-control">
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={handleChange}
            disabled={loading}
          />
          <label>Password</label>
        </div>

        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>

      <p>
        Need to reset password?{" "}
        <Link to="/forgot-password">Goto Fogot Password</Link>
      </p>

      <p>
        Not registered? <Link to="/signup">Goto Signup</Link>
      </p>
    </div>
  );
}
