import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import ServiceCard from "../components/ServiceCard";
import "../styles/services.css";

export default function Services() {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/services").then((res) => {
      setServices(res.data);
      setLoading(false);
    });
  }, []);

  const cats = ["All", ...new Set(services.map((s) => s.category))];

  const filtered =
    category === "All"
      ? services
      : services.filter((s) => s.category === category);

  return (
    <MainLayout>
      <div className="services-page">

        {/* HEADER */}
        <div className="services-header">
          <h1>All Services</h1>

          <div className="category-filters">
            {cats.map((c) => (
              <button
                key={c}
                className={category === c ? "active" : ""}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* LOADING */}
        {loading && <p className="loading">Loading services...</p>}

        {/* GRID */}
        <div className="grid-3">
          {filtered.map((s) => (
            <ServiceCard
              key={s._id}
              name={s.name}
              cat={s.category}
              price={`₹${s.price}`}
              image={s.image || `https://picsum.photos/300/200?random=${s._id}`}
              onClick={() => navigate(`/booking/${s._id}`)}
            />
          ))}
        </div>

        {/* EMPTY */}
        {!loading && filtered.length === 0 && (
          <p className="empty">
            No services found. Ask a vendor to add services!
          </p>
        )}
      </div>
    </MainLayout>
  );
}