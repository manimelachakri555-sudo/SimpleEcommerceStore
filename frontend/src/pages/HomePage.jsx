import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/products"
        );

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">

      {/* Hero Section */}

      <div className="hero-section mb-5">

        <h6 className="text-secondary">
          CURATIONS FOR MODERN LIVING
        </h6>

        <h1>
          Crafted Objects.
          <br />
          Modern Lifestyle.
        </h1>

        <p>
          Premium mobiles, electronics, wallets,
          home decor and lifestyle essentials.
        </p>

        <button className="btn btn-dark px-5 rounded-pill mt-3">
          Explore Collection →
        </button>

      </div>

      {/* Featured Collection */}

      <div
        className="row align-items-center mb-5 p-5"
        style={{
          background: "#fff",
          borderRadius: "30px",
        }}
      >

        <div className="col-md-6">

          <h6 className="text-secondary">
            FEATURED COLLECTION
          </h6>

          <h1 className="display-4 fw-bold">
            Premium For
            <br />
            Modern Living
          </h1>

          <p className="text-muted">
            Discover curated smartphones,
            laptops and luxury essentials.
          </p>

          <button className="btn btn-dark rounded-pill px-5">
            Shop Collection →
          </button>

        </div>

        <div className="col-md-6">

          <div className="row">

            <div className="col-6">

              <div className="card shadow-sm">

                <img
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569"
                  className="card-img-top"
                />

                <div className="card-body">

                  <h5>iPhone 16 Pro</h5>

                  <h6>₹1,39,999</h6>

                </div>

              </div>

            </div>

            <div className="col-6">

              <div className="card shadow-sm">

                <img
                  src="https://images.unsplash.com/photo-1546868871-7041f2a55e12"
                  className="card-img-top"
                />

                <div className="card-body">

                  <h5>Apple Watch Series 10</h5>

                  <h6>₹49,999</h6>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Trending Products */}

      <div className="mb-5">

        <h6 className="text-secondary">
          TRENDING NOW
        </h6>

        <h2 className="fw-bold mb-4">
          Best Sellers
        </h2>

      </div>
      {/* Search */}

<div className="mb-4">
  <input
    type="text"
    className="form-control"
    placeholder="Search goods..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

{/* Categories */}

<div className="mb-5 d-flex flex-wrap gap-3">

  <button
    className="category-btn"
    onClick={() => setCategory("")}
  >
    All
  </button>

  <button
    className="category-btn"
    onClick={() => setCategory("Mobiles")}
  >
    Mobiles
  </button>

  <button
    className="category-btn"
    onClick={() => setCategory("Laptops")}
  >
    Laptops
  </button>

  <button
    className="category-btn"
    onClick={() => setCategory("Electronics")}
  >
    Electronics
  </button>

  <button
    className="category-btn"
    onClick={() => setCategory("Wallets")}
  >
    Wallets
  </button>

  <button
    className="category-btn"
    onClick={() => setCategory("Home Decor")}
  >
    Home Decor
  </button>

</div>

{/* Products */}

<div className="row">

  {products
    .filter((product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter(
      (product) =>
        category === "" ||
        product.category === category
    )
    .map((product) => (
      <div
        className="col-lg-3 col-md-4 col-sm-6 mb-4"
        key={product._id}
      >
        <ProductCard product={product} />
      </div>
    ))}

</div>

{/* Features */}

<div className="row mt-5 text-center">

  <div className="col-md-3">
    <h5>🚚 Free Shipping</h5>
    <p>Orders above ₹999</p>
  </div>

  <div className="col-md-3">
    <h5>🔄 Easy Returns</h5>
    <p>7-Day Return Policy</p>
  </div>

  <div className="col-md-3">
    <h5>🔒 Secure Payments</h5>
    <p>100% Secure Checkout</p>
  </div>

  <div className="col-md-3">
    <h5>🎧 Support</h5>
    <p>24×7 Customer Support</p>
  </div>

</div>

{/* Trusted Brands */}

<div className="mt-5 mb-5 text-center">

  <h6 className="text-secondary">
    TRUSTED BRANDS
  </h6>

  <h2 className="fw-bold mb-4">
    Shop Premium Brands
  </h2>

  <div className="row">

    <div className="col-md-3">
      <div className="card p-4 shadow-sm">
        <h3> Apple</h3>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card p-4 shadow-sm">
        <h3>Samsung</h3>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card p-4 shadow-sm">
        <h3>OnePlus</h3>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card p-4 shadow-sm">
        <h3>Sony</h3>
      </div>
    </div>

  </div>

</div>

{/* Customer Reviews */}

<div
  className="p-5 mb-5"
  style={{
   background:"rgba(255,255,255,.7)",
    borderRadius: "30px",
  }}
>

  <h6 className="text-secondary">
    CUSTOMER STORIES
  </h6>

  <h2 className="fw-bold mb-5">
    Loved By Thousands
  </h2>

  <div className="row">

    <div className="col-md-4">

      <div className="card p-4 shadow-sm">

        <h5>⭐⭐⭐⭐⭐</h5>

        <p>
          Premium quality and fast delivery.
          Loved my purchase.
        </p>

        <h6>- Rahul Sharma</h6>

      </div>

    </div>

    <div className="col-md-4">

      <div className="card p-4 shadow-sm">

        <h5>⭐⭐⭐⭐⭐</h5>

        <p>
          Excellent packaging and support.
        </p>

        <h6>- Priya Reddy</h6>

      </div>

    </div>

    <div className="col-md-4">

      <div className="card p-4 shadow-sm">

        <h5>⭐⭐⭐⭐⭐</h5>

        <p>
          Luxury shopping experience.
        </p>

        <h6>- Arjun Patel</h6>

      </div>

    </div>

  </div>

</div>

{/* Footer */}

<footer>

  <h1
    style={{
      fontFamily: "serif",
      letterSpacing: "5px",
      fontWeight: "700",
    }}
  >
    AESTHETECH
  </h1>

  <p className="text-secondary">
    Premium Living • Crafted Elegance • Modern Essentials
  </p>

  <hr />

  <p>
    © 2026 AESTHETECH • Crafted in India 🇮🇳
  </p>

</footer>

</div>
);
}

export default HomePage;