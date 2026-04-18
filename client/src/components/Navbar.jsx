import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo" onClick={() => navigate("/")}>
        EasyService
      </h2>

      <div className="nav-links">
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <button onClick={() => navigate("/register")}>
              Register
            </button>
          </>
        ) : (
          <>
            {user.role === "admin" && (
              <Link to="/admin">Admin Panel</Link>
            )}

            {user.role === "vendor" && (
              <Link to="/vendor">My Dashboard</Link>
            )}

            {user.role === "user" && (
              <>
                <Link to="/services">Services</Link>
                <Link to="/my-bookings">My Bookings</Link>
              </>
            )}

            <span className="user-badge">Hi, {user.name}</span>

            <button className="logout" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}