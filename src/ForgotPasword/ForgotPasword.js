import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";

import "./ForgotPassword.css";

function forgotPassword(email) {
  return firebase.auth().sendPasswordResetEmail(email);
}

export function ForgotPasword() {
  const [form, setform] = useState({ email: "" });
  const { email } = form;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("forgot-password mount");

    return () => {
      console.log("forgot-password unmount");
    };
  }, []);

  function handleChange(event) {
    const target = event.target;

    setform({ ...form, [target.name]: target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    try {
      const result = await forgotPassword(email);

      console.log("result", result);

      alert("Password reset email sent, check inbox!");
    } catch (error) {
      console.log("error", error);

      alert(
        (error && error.message) || "Failed to sending reset password email"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ForgotPassword Auth">
      <h2>Forgot Password</h2>

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

        <button type="submit" disabled={loading}>
          Reset Password
        </button>
      </form>

      <p>
        No need to reset passwod? <Link to="/login">Back to login</Link>
      </p>
    </div>
  );
}
