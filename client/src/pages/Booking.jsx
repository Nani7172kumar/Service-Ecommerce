import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import Navbar from '../components/Navbar'

export default function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [form, setForm] = useState({ date: '', time: '', address: '' })
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    axios.get('/services').then(res => {
      const s = res.data.find(x => x._id === id)
      setService(s)
    })
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/bookings', {
        serviceId: id,
        vendorId: service?.vendorId,
        ...form
      })
      setSuccess(true)
      setTimeout(() => navigate('/my-bookings'), 2000)
    } catch {
      alert('Please login first!')
      navigate('/login')
    }
  }

  if (!service) return <div><Navbar /><div className="text-center mt-5">Loading...</div></div>

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            {success ? (
              <div className="text-center p-5">
                <div style={{ fontSize: '70px' }}>✅</div>
                <h4 className="mt-3 fw-bold text-success">Booking Confirmed!</h4>
                <p className="text-muted">Redirecting to your bookings...</p>
              </div>
            ) : (
              <div className="card shadow p-4">
                <h5 className="fw-bold mb-1">{service.name}</h5>
                <span className="badge bg-secondary mb-2">{service.category}</span>
                <p className="text-primary fw-bold fs-4 mb-4">₹{service.price}</p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Select Date</label>
                    <input type="date" className="form-control"
                      value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Select Time Slot</label>
                    <select className="form-select"
                      value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required>
                      <option value="">Choose a time</option>
                      <option>9:00 AM</option>
                      <option>11:00 AM</option>
                      <option>1:00 PM</option>
                      <option>3:00 PM</option>
                      <option>5:00 PM</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-bold">Your Address</label>
                    <input type="text" className="form-control" placeholder="Enter your full address"
                      value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                    Confirm Booking — ₹{service.price}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}