import { Link } from "react-router-dom";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { useCharityDirectory } from "../hooks/useCharityDirectory";
import "../styles/pages/auth.css";

export default function Register() {
  const { data, setData, register } = useRegisterForm();
  const { items: charities, loading } = useCharityDirectory({});

  return (
    <div className="auth-container page-auth">
      <div className="auth-card">
        <h2>Register</h2>
        <p className="subtitle auth-lead">
          Select a partner charity at signup (minimum 10% of subscription; you can raise it later in your dashboard).
        </p>

        <input
          placeholder="Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <div className="field auth-field">
          <div className="label">Charity *</div>
          <select
            value={data.charityId}
            onChange={(e) => setData({ ...data, charityId: e.target.value })}
          >
            <option value="">{loading ? "Loading…" : "Choose from directory"}</option>
            {charities.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field auth-field">
          <div className="label">Contribution % (min 10)</div>
          <input
            type="number"
            min={10}
            max={100}
            value={data.charityPercentage}
            onChange={(e) =>
              setData({ ...data, charityPercentage: Number(e.target.value) })
            }
          />
        </div>

        {charities.length === 0 && !loading ? (
          <p className="subtitle auth-hint">
            No charities yet. Ask an admin to add some, or visit <Link to="/charity">Charities</Link> later.
          </p>
        ) : null}

        <button onClick={register}>Register</button>

        <div className="auth-link">
          Already have an account?{" "}
          <Link to="/login">
            <span>Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
