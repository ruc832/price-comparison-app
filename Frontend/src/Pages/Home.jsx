import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    const product = query.trim();
    if (product) {
      navigate(`/compare/${encodeURIComponent(product)}`);
    }
  };

  return (
    <main className="home">
      <section className="home-content">
        <span className="home-badge">Compare before you buy</span>

        <h1>
          Your next purchase.
          <br />
          <span>A better price.</span>
        </h1>

        <p className="home-description">
          Search for a product and explore prices across stores, all in one
          place.
        </p>

        <form className="home-search" onSubmit={handleSearch}>
          <span className="home-search-icon" aria-hidden="true">
            ⌕
          </span>

          <input
            type="search"
            aria-label="Product name"
            placeholder="Try Samsung Galaxy or Dell laptop"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            required
          />

          <button type="submit" disabled={!query.trim()}>
            Compare prices <span aria-hidden="true">→</span>
          </button>
        </form>

        <div className="home-suggestions">
          <span>Try a search:</span>

          {["Samsung Galaxy", "Dell laptop", "Headphones"].map((name) => (
            <button type="button" key={name} onClick={() => setQuery(name)}>
              {name}
            </button>
          ))}
        </div>

        <div className="home-features">
          <article>
            <span className="home-feature-icon" aria-hidden="true">
              ⌕
            </span>
            <h2>One simple search</h2>
            <p>Find products without switching between store tabs.</p>
          </article>

          <article>
            <span className="home-feature-icon" aria-hidden="true">
              ₹
            </span>
            <h2>Compare available prices</h2>
            <p>See the prices returned by different stores together.</p>
          </article>

          <article>
            <span className="home-feature-icon" aria-hidden="true">
              ↗
            </span>
            <h2>Shop directly</h2>
            <p>Open the product on the store to check details and buy.</p>
          </article>
        </div>

        <p className="home-note">
          Availability varies by store. Confirm the latest price on the store
          before buying.
        </p>
      </section>
    </main>
  );
};

export default Home;
