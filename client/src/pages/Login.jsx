import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from '../api/axios'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/auth/login', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      const role = res.data.user.role
      if (role === 'admin') navigate('/admin')
      else if (role === 'vendor') navigate('/vendor')
      else navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card shadow p-4" style={{ width: '100%', maxWidth: '420px' }}>
          <h4 className="text-center fw-bold mb-1">Welcome Back</h4>
          <p className="text-center text-muted mb-4" style={{ fontSize: '14px' }}>Login to EasyService</p>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary w-100 py-2">Login</button>
          </form>
          <p className="text-center mt-3 mb-0" style={{ fontSize: '13px' }}>
            No account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}