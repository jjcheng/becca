const amenities = [
  {
    icon: "ri-map-pin-line",
    title: "EAST COAST",
    text: "Neighbourhood Cafe"
  },
  {
    icon: "ri-time-line",
    title: "DAILY",
    text: "8:00AM - 7:00PM"
  },
  {
    icon: "ri-takeaway-line",
    title: "MADE FRESH",
    text: "In small batches"
  }
];

export default function AmenityGrid() {
  return (
    <section className="home-amenity-grid reveal" aria-label="Cafe highlights">
      {amenities.map((amenity) => (
        <article className="home-amenity-item" key={amenity.title}>
          <i className={`detail-icon ${amenity.icon}`} aria-hidden="true" />
          <div>
            <strong>{amenity.title}</strong>
            <p>{amenity.text}</p>
          </div>
        </article>
      ))}
      <article className="home-amenity-item">
        <i className="detail-icon ri-instagram-line" aria-hidden="true" />
        <div>
          <strong>FOLLOW US</strong>
          <p>
            <a href="https://www.instagram.com/beccas.cafe/" target="_blank" rel="noopener">@beccascafe.sg</a>
          </p>
        </div>
      </article>
    </section>
  );
}
