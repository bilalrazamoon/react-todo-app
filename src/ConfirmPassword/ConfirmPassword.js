import firebase from "firebase/app";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import "./ConfirmPassword.css";

function confirmPassword(code, password) {
  return firebase.auth().confirmPasswordReset(code, password);
}

export function ConfirmPasword() {
  const [form, setform] = useState({ password: "" });
  const { password } = form;

  const [loading, setLoading] = useState(false);

  const histroy = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("oobCode");

  function handleChange(event) {
    const target = event.target;

    setform({ ...form, [target.name]: target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    try {
      const result = await confirmPassword(code, password);

      console.log("result", result);

      histroy.push("/login");
    } catch (error) {
      alert((error && error.message) || "Failed to set new password");

      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ConfirmPassword Auth">
      <h2>Confirm Password</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div>
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
          Submit
        </button>
      </form>
    </div>
  );
}
