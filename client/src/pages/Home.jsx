import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ServiceCard from "../components/ServiceCard";
import FeatureCard from "../components/FeatureCard";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    { icon: "⚡", title: "Fast Booking", desc: "Book any service in under 2 minutes" },
    { icon: "✅", title: "Verified Vendors", desc: "All vendors are verified and trusted" },
    { icon: "💰", title: "Best Prices", desc: "Transparent pricing, no hidden charges" },
  ];

  const services = [
    { icon: "💇", name: "Hair Cut", cat: "Salon", price: "₹299" },
    { icon: "🧹", name: "Home Cleaning", cat: "Cleaning", price: "₹599" },
    { icon: "🔧", name: "AC Repair", cat: "Repair", price: "₹799" },
    { icon: "🚿", name: "Plumbing", cat: "Plumbing", price: "₹499" },
    { icon: "💆", name: "Spa Massage", cat: "Salon", price: "₹999" },
    { icon: "⚡", name: "Electrician", cat: "Repair", price: "₹649" },
  ];

  return (
    <MainLayout>
      <section className="hero">
        <h1>Book Any Service, Anytime</h1>
        <p>Salon, Cleaning, Repair — all at your fingertips</p>

        <div className="hero-buttons">
          <button onClick={() => navigate("/services")}>
            Explore Services
          </button>
          <button
            className="secondary"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Why Choose EasyService?</h2>

        <div className="grid-3">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Popular Services</h2>

        <div className="grid-3">
          {services.map((s, i) => (
            <ServiceCard
              key={i}
              {...s}
              onClick={() => navigate("/services")}
            />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}