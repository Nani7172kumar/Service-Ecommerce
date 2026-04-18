import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <Navbar />
      <div className="text-white text-center py-5"
        style={{ background: 'linear-gradient(135deg,#1a1a2e,#16213e)', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 className="fw-bold mb-3" style={{ fontSize: '42px' }}>Book Any Service, Anytime</h1>
        <p className="mb-4" style={{ color: '#aaa', fontSize: '18px' }}>Salon, Cleaning, Repair — all at your fingertips</p>
        <div>
          <button className="btn btn-primary btn-lg px-5 me-3" onClick={() => navigate('/services')}>Explore Services</button>
          <button className="btn btn-outline-light btn-lg px-5" onClick={() => navigate('/register')}>Get Started</button>
        </div>
      </div>
      <div className="container py-5">
        <h4 className="fw-bold mb-4 text-center">Why Choose EasyService?</h4>
        <div className="row g-4 mb-5">
          {[
            { icon: '⚡', title: 'Fast Booking', desc: 'Book any service in under 2 minutes' },
            { icon: '✅', title: 'Verified Vendors', desc: 'All vendors are verified and trusted' },
            { icon: '💰', title: 'Best Prices', desc: 'Transparent pricing, no hidden charges' }
          ].map((f, i) => (
            <div className="col-md-4" key={i}>
              <div className="card text-center p-4 h-100 shadow-sm">
                <div style={{ fontSize: '40px' }}>{f.icon}</div>
                <h5 className="fw-bold mt-3">{f.title}</h5>
                <p className="text-muted">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <h4 className="fw-bold mb-4 text-center">Popular Services</h4>
        <div className="row g-3">
          {[
            { icon: '💇', name: 'Hair Cut', cat: 'Salon', price: '₹299' },
            { icon: '🧹', name: 'Home Cleaning', cat: 'Cleaning', price: '₹599' },
            { icon: '🔧', name: 'AC Repair', cat: 'Repair', price: '₹799' },
            { icon: '🚿', name: 'Plumbing', cat: 'Plumbing', price: '₹499' },
            { icon: '💆', name: 'Spa Massage', cat: 'Salon', price: '₹999' },
            { icon: '⚡', name: 'Electrician', cat: 'Repair', price: '₹649' }
          ].map((s, i) => (
            <div className="col-md-4 col-6" key={i}>
              <div className="card h-100 shadow-sm text-center p-3">
                <div style={{ fontSize: '36px' }}>{s.icon}</div>
                <h6 className="fw-bold mt-2">{s.name}</h6>
                <span className="badge bg-secondary mb-2">{s.cat}</span>
                <p className="text-primary fw-bold">{s.price}</p>
                <button className="btn btn-primary btn-sm" onClick={() => navigate('/services')}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}