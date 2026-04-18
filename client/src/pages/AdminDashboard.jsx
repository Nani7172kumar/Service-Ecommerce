import { useEffect, useState } from 'react'
import axios from '../api/axios'
import Navbar from '../components/Navbar'

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/bookings/all').then(res => {
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
        <h4 className="fw-bold mb-4">Admin Dashboard</h4>
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card text-center p-3 shadow-sm">
              <h3 className="fw-bold text-primary">{bookings.length}</h3>
              <p className="text-muted mb-0 small">Total Bookings</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card text-center p-3 shadow-sm">
              <h3 className="fw-bold text-warning">{bookings.filter(b => b.status === 'pending').length}</h3>
              <p className="text-muted mb-0 small">Pending</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card text-center p-3 shadow-sm">
              <h3 className="fw-bold text-success">{bookings.filter(b => b.status === 'confirmed').length}</h3>
              <p className="text-muted mb-0 small">Confirmed</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card text-center p-3 shadow-sm">
              <h3 className="fw-bold text-info">{bookings.filter(b => b.status === 'completed').length}</h3>
              <p className="text-muted mb-0 small">Completed</p>
            </div>
          </div>
        </div>
        <h5 className="fw-bold mb-3">All Bookings</h5>
        {loading && <p className="text-muted">Loading...</p>}
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b._id}>
                  <td>{b.userId?.name || 'User'}</td>
                  <td>{b.serviceId?.name || 'Service'}</td>
                  <td>{b.date}</td>
                  <td>{b.time}</td>
                  <td>{b.address}</td>
                  <td><span className={`badge bg-${statusColor[b.status]}`}>{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}