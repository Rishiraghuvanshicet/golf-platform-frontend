import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const login = async () => {
    if (!data.email || !data.password) {
      return toast.error("All fields required");
    }

    try {
      const res = await API.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful 🚀");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button onClick={login}>Login</button>

        <div className="auth-link">
          Don’t have an account?{" "}
          <Link to="/register">
            <span>Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
}