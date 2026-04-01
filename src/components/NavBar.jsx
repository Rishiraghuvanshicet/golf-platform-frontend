import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaTrophy,
  FaHeart,
  FaUser,
  FaBolt,
  FaSignOutAlt,
  FaShieldAlt,
  FaDonate,
} from "react-icons/fa";
import { useCurrentUser } from "../hooks/useCurrentUser";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const { me } = useCurrentUser();

  useEffect(() => {
    const sync = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", sync);
    window.addEventListener("auth:changed", sync);
    sync();
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("auth:changed", sync);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth:changed"));
    navigate("/login");
  };

  return (
    <div className="nav-wrap">
      <div className="container">
        <div className="nav">
          <Link to="/" className="brand">
            <span className="brand-badge" aria-hidden="true" />
            <span>Golf for Good</span>
          </Link>

          <div className="nav-links">
            {token ? (
              <>
                <Link className="nav-link" to="/dashboard">
                  <FaHome /> Dashboard
                </Link>
                <Link className="nav-link" to="/subscription">
                  <FaBolt /> Subscription
                </Link>
                <Link className="nav-link" to="/donate">
                  <FaDonate /> Donate
                </Link>
                {me?.role === "admin" ? (
                  <Link className="nav-link" to="/admin">
                    <FaShieldAlt /> Admin
                  </Link>
                ) : null}
                <Link className="nav-link" to="/draw">
                  <FaTrophy /> Draws
                </Link>
                <Link className="nav-link" to="/winner">
                  <FaUser /> Winnings
                </Link>
                <Link className="nav-link" to="/charity">
                  <FaHeart /> Charities
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/charity">
                  <FaHeart /> Charities
                </Link>
              </>
            )}
          </div>

          <div className="spacer" />

          <div className="row">
            {token ? (
              <button className="btn small" onClick={logout} type="button">
                <FaSignOutAlt /> Logout
              </button>
            ) : (
              <>
                <Link className="btn small" to="/login">
                  Login
                </Link>
                <Link className="btn small primary" to="/register">
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
