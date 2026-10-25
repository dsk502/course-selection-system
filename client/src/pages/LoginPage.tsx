import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {login} from "../api/auth.ts";

import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if(!form.username.trim() || form.password) {
      setError("Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      const data = await login({
        username: form.username.trim(),
        password: form.password
      });

      //Save the token to session storage
      if (data.token) {
        sessionStorage.setItem("token", data.token);
      }

      const role = data.user?.role;

      if (role === "STUDENT") {
        navigate("/student");
      } else if (role === "TEACHER") {
        navigate("/teacher");
      } else if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="login-page">
        <div className="login-card">
          <div className="login-logo">🎓</div>

          <h1>Course Selection System</h1>
          <p className="subtitle">
            Student Course Selection System
          </p>

          <h2>Welcome</h2>
          <p className="description">Enter account info</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Student ID</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Please enter student ID"
                value={form.username}
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Please enter password"
                value={form.password}
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}

            <button
              className="login-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="login-footer">
            Student · Teacher · Admin
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;