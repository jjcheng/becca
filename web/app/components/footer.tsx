export default function Footer() {
  return (
    <>
      <footer className="site-footer reveal" aria-label="Cafe highlights">
        <article className="home-amenity-item">
          <i className="detail-icon ri-map-pin-line" aria-hidden="true" />
          <div>
            <strong>EAST COAST</strong>
            <p>Neighbourhood Cafe</p>
          </div>
        </article>
        <article className="home-amenity-item">
          <i className="detail-icon ri-time-line" aria-hidden="true" />
          <div>
            <strong>DAILY</strong>
            <p>8:00AM - 6:00PM</p>
          </div>
        </article>
        <article className="home-amenity-item">
          <i className="detail-icon ri-takeaway-line" aria-hidden="true" />
          <div>
            <strong>MADE FRESH</strong>
            <p>In small batches</p>
          </div>
        </article>
        <article className="home-amenity-item">
          <i className="detail-icon ri-instagram-line" aria-hidden="true" />
          <div>
            <strong>FOLLOW US</strong>
            <p>
              <a href="https://www.instagram.com/beccas.cafe/" target="_blank" rel="noopener">@beccascafe.sg</a>
            </p>
          </div>
        </article>
      </footer>
      <div className="footer-info" aria-label="Company information">
        <p><strong>AUSTERE PTE. LTD</strong></p>
        <p>308 TELOK KURAU ROAD, #01-07, VIBES @ EAST COAST, SINGAPORE 423858</p>
      </div>
    </>
  );
}
