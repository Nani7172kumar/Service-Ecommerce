import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import Navbar from '../components/Navbar'

export default function Services() {
  const [services, setServices] = useState([])
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/services').then(res => {
      setServices(res.data)
      setLoading(false)
    })
  }, [])

  const cats = ['All', ...new Set(services.map(s => s.category))]
  const filtered = category === 'All' ? services : services.filter(s => s.category === category)

  return (
    <div>
      <Navbar />
      <div className="container py-4">
        <h4 className="fw-bold mb-3">All Services</h4>
        <div className="d-flex gap-2 flex-wrap mb-4">
          {cats.map(c => (
            <button key={c}
              className={`btn btn-sm ${category === c ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
        {loading && <p className="text-muted">Loading services...</p>}
        <div className="row g-3">
          {filtered.map(s => (
            <div className="col-md-4" key={s._id}>
              <div className="card h-100 shadow-sm">
                <img src={s.image || `https://picsum.photos/300/200?random=${s._id}`}
                  className="card-img-top" style={{ height: '180px', objectFit: 'cover' }} alt={s.name} />
                <div className="card-body">
                  <h6 className="fw-bold">{s.name}</h6>
                  <span className="badge bg-secondary mb-2">{s.category}</span>
                  <p className="text-muted small">{s.description}</p>
                  <p className="text-primary fw-bold fs-5">₹{s.price}</p>
                  <button className="btn btn-primary w-100"
                    onClick={() => navigate(`/booking/${s._id}`)}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
          {!loading && filtered.length === 0 &&
            <p className="text-muted">No services found. Ask a vendor to add services!</p>}
        </div>
      </div>
    </div>
  )
}