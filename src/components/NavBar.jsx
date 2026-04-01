import { Link } from "react-router-dom";
import { FaHome, FaTrophy, FaHeart, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="container">
      <h2>Golf Platform</h2>

      <Link to="/dashboard"><FaHome /> Dashboard</Link>
      <Link to="/draw"><FaTrophy /> Draw</Link>
      <Link to="/winner"><FaUser /> Winners</Link>
      <Link to="/charity"><FaHeart /> Charity</Link>
    </div>
  );
};

export default Navbar;