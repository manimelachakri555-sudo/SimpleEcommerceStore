import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div
      className="card border-0 shadow-lg h-100"
      style={{
        borderRadius: "25px",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{
          height: "320px",
          objectFit: "cover",
        }}
      />

      <div className="card-body d-flex flex-column">

        <small
          className="text-secondary mb-2"
          style={{
            letterSpacing: "2px",
          }}
        >
          {product.category}
        </small>

        <Link
          to={`/product/${product._id}`}
          className="text-decoration-none text-dark"
        >
          <h4 className="fw-bold">
            {product.title}
          </h4>
        </Link>

        <p className="text-muted">
          {product.description}
        </p>

        <div className="mt-auto">

          <h3
            className="fw-bold mb-3"
            style={{
              color: "#111",
            }}
          >
            ₹{product.price}
          </h3>

          <button
            className="btn btn-dark w-100 rounded-pill"
            onClick={() => addToCart(product)}
          >
            + Add To Bag
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;