import { useEffect, useState } from 'react'
import axios from '../api/axios'
import Navbar from '../components/Navbar'

export default function VendorDashboard() {
  const [bookings, setBookings] = useState([])
  const [form, setForm] = useState({ name: '', category: '', price: '', image: '', description: '' })
  const [msg, setMsg] = useState('')
  const [tab, setTab] = useState('bookings')

  useEffect(() => {
    axios.get('/bookings/vendor').then(res => setBookings(res.data))
  }, [])

  const updateStatus = async (id, status) => {
    await axios.put(`/bookings/${id}`, { status })
    setBookings(bookings.map(b => b._id === id ? { ...b, status } : b))
  }

  const addService = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/services', { ...form, price: Number(form.price) })
      setMsg('✅ Service added successfully!')
      setForm({ name: '', category: '', price: '', image: '', description: '' })
    } catch { setMsg('❌ Failed. Make sure you are logged in as vendor.') }
  }

  const statusColor = { pending: 'warning', confirmed: 'success', cancelled: 'danger', completed: 'info' }

  return (
    <div>
      <Navbar />
      <div className="container py-4">
        <h4 className="fw-bold mb-4">Vendor Dashboard</h4>
        <div className="d-flex gap-2 mb-4">
          <button className={`btn ${tab === 'bookings' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setTab('bookings')}>Incoming Bookings ({bookings.length})</button>
          <button className={`btn ${tab === 'add' ? 'btn-success' : 'btn-outline-secondary'}`}
            onClick={() => setTab('add')}>Add New Service</button>
        </div>
        {tab === 'bookings' && (
          <div>
            {bookings.length === 0 && <p className="text-muted">No bookings yet.</p>}
            {bookings.map(b => (
              <div className="card shadow-sm mb-3 p-3" key={b._id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="fw-bold mb-1">{b.serviceId?.name}</h6>
                    <p className="text-muted small mb-1">Customer: {b.userId?.name} · {b.userId?.email}</p>
                    <p className="text-muted small mb-1">📅 {b.date} · ⏰ {b.time}</p>
                    <p className="text-muted small mb-1">📍 {b.address}</p>
                    <span className={`badge bg-${statusColor[b.status]}`}>{b.status}</span>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    {b.status === 'pending' && <>
                      <button className="btn btn-success btn-sm" onClick={() => updateStatus(b._id, 'confirmed')}>Accept</button>
                      <button className="btn btn-danger btn-sm" onClick={() => updateStatus(b._id, 'cancelled')}>Reject</button>
                    </>}
                    {b.status === 'confirmed' &&
                      <button className="btn btn-info btn-sm" onClick={() => updateStatus(b._id, 'completed')}>Mark Done</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === 'add' && (
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-sm p-4">
                <h5 className="fw-bold mb-3">Add New Service</h5>
                {msg && <div className="alert alert-info py-2">{msg}</div>}
                <form onSubmit={addService}>
                  <div className="mb-3">
                    <label className="form-label">Service Name</label>
                    <input className="form-control" placeholder="e.g. Hair Cut"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-select" value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })} required>
                      <option value="">Select category</option>
                      <option>Salon</option>
                      <option>Cleaning</option>
                      <option>Repair</option>
                      <option>Plumbing</option>
                      <option>Electrical</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price (₹)</label>
                    <input className="form-control" type="number" placeholder="e.g. 299"
                      value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input className="form-control" placeholder="https://..."
                      value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" placeholder="Describe your service"
                      value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                  </div>
                  <button type="submit" className="btn btn-success w-100">Add Service</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}