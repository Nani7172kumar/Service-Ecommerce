import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from '../api/axios'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/auth/register', form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card shadow p-4" style={{ width: '100%', maxWidth: '420px' }}>
          <h4 className="text-center fw-bold mb-1">Create Account</h4>
          <p className="text-center text-muted mb-3" style={{ fontSize: '14px' }}>Join EasyService today</p>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <div className="d-flex gap-2 mb-3">
            <button type="button"
              className={`btn btn-sm w-50 ${form.role === 'user' ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setForm({ ...form, role: 'user' })}>Register as User</button>
            <button type="button"
              className={`btn btn-sm w-50 ${form.role === 'vendor' ? 'btn-success' : 'btn-outline-secondary'}`}
              onClick={() => setForm({ ...form, role: 'vendor' })}>Register as Vendor</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" placeholder="Your name"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="you@email.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="••••••••"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2">Create Account</button>
          </form>
          <p className="text-center mt-3 mb-0" style={{ fontSize: '13px' }}>
            Already have account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}