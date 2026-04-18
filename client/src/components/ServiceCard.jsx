export default function ServiceCard({
  icon,
  name,
  cat,
  price,
  image,
  onClick,
}) {
  return (
    <div className="service-card">
      
      {/* IMAGE or ICON */}
      {image ? (
        <img src={image} alt={name} className="service-img" />
      ) : (
        <div className="icon">{icon}</div>
      )}

      {/* CONTENT */}
      <div className="service-content">
        <h3>{name}</h3>

        <span className="badge">{cat}</span>

        <p className="price">{price}</p>

        <button onClick={onClick}>Book Now</button>
      </div>
    </div>
  );
}