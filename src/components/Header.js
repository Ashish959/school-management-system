import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import "../styles/Header.css";

const Header = ({ onToggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="header">
      {/* LEFT */}
      <div className="header-left">
        <button onClick={onToggle} className="menu-btn">☰</button>
        <h3>School Management System</h3>
      </div>

      {/* RIGHT */}
      <div className="header-right">
        <span className="icon">🔔</span>

        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="profile-img"
        />

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
