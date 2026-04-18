import { useEffect, useState } from 'react'
import axios from '../api/axios'
import Navbar from '../components/Navbar'

export default function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/bookings/my').then(res => {
      setBookings(res.data)
      setLoading(false)
    })
  }, [])

  const statusColor = {
    pending: 'warning', confirmed: 'success',
    cancelled: 'danger', completed: 'info'
  }

  return (
    <div>
      <Navbar />
      <div className="container py-4">
        <h4 className="fw-bold mb-4">My Bookings</h4>
        {loading && <p className="text-muted">Loading...</p>}
        {!loading && bookings.length === 0 &&
          <div className="text-center py-5">
            <div style={{ fontSize: '60px' }}>📋</div>
            <h5 className="mt-3 text-muted">No bookings yet</h5>
            <a href="/services" className="btn btn-primary mt-2">Book a Service</a>
          </div>}
        {bookings.map(b => (
          <div className="card shadow-sm mb-3 p-3" key={b._id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-1">{b.serviceId?.name || 'Service'}</h6>
                <p className="text-muted mb-1 small">📅 {b.date} · ⏰ {b.time}</p>
                <p className="text-muted mb-0 small">📍 {b.address}</p>
              </div>
              <div className="text-end">
                <span className={`badge bg-${statusColor[b.status] || 'secondary'} mb-1`}>{b.status}</span>
                <p className="text-primary fw-bold mb-0">₹{b.serviceId?.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}