import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const token = localStorage.getItem('token')

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-dark px-4 py-3" style={{ background: '#1a1a2e' }}>
      <Link className="navbar-brand fw-bold fs-4" to="/">EasyService</Link>
      <div className="d-flex gap-3 align-items-center">
        {!token ? (
          <>
            <Link className="text-white text-decoration-none" to="/login">Login</Link>
            <Link className="btn btn-primary btn-sm" to="/register">Register</Link>
          </>
        ) : (
          <>
            {user.role === 'admin' && <Link className="text-white text-decoration-none" to="/admin">Admin Panel</Link>}
            {user.role === 'vendor' && <Link className="text-white text-decoration-none" to="/vendor">My Dashboard</Link>}
            {user.role === 'user' && <Link className="text-white text-decoration-none" to="/services">Services</Link>}
            {user.role === 'user' && <Link className="text-white text-decoration-none" to="/my-bookings">My Bookings</Link>}
            <span className="badge bg-secondary">Hi, {user.name}</span>
            <button className="btn btn-outline-light btn-sm" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}