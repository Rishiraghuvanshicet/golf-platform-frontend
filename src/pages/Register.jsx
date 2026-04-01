import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const register = async () => {
    if (!data.name || !data.email || !data.password) {
      return toast.error("All fields required");
    }

    try {
      await API.post("/auth/register", data);

      toast.success("Registered successfully 🎉");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        <input
          placeholder="Name"
          value={data.name}
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        <input
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

        <button onClick={register}>Register</button>

        <div className="auth-link">
          Already have an account?{" "}
          <Link to="/">
            <span>Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}