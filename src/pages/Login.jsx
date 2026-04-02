import { Link } from "react-router-dom";
import { useLoginForm } from "../hooks/useLoginForm";
import "../styles/pages/auth.css";

export default function Login() {
  const { data, setData, login } = useLoginForm();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") login();
  };

  return (
    <div className="auth-container page-auth">
      <div className="auth-card">
        <h2>Login</h2>
        <p className="subtitle auth-lead">
          Welcome back — let’s make this month count.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          onKeyDown={handleKeyDown}
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          onKeyDown={handleKeyDown}
        />

        <button onClick={login}>Sign in</button>

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
