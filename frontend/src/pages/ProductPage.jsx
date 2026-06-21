import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const { addToCart } = useContext(CartContext);
const { addToWishlist } = useContext(WishlistContext);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const submitReviewHandler = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/products/${id}/reviews`,
        {
          name,
          rating,
          comment,
        }
      );

      alert("Review Added Successfully");

      window.location.reload();
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container mt-4">
      <div className="row">

        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
          />
        </div>

        <div className="col-md-6">
          <h1>{product.title}</h1>

          <p>{product.description}</p>

          <h3 className="text-success">
            ₹{product.price}
          </h3>

          <h5>
            Category: {product.category}
          </h5>

          <h5>
            Stock: {product.countInStock}
          </h5>

          <h5>
            Rating: ⭐ {product.rating} ({product.numReviews} Reviews)
          </h5>

          <button
            className="btn btn-primary mt-3"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>

<button
  className="btn btn-danger mt-3 ms-3"
  onClick={() => addToWishlist(product)}
>
  ❤️ Wishlist
</button>
          <hr />

          <h3>Write a Review</h3>

          <input
            className="form-control mb-2"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="form-control mb-2"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>

          <textarea
            className="form-control mb-2"
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <button
            className="btn btn-success"
            onClick={submitReviewHandler}
          >
            Submit Review
          </button>

        </div>
      </div>

      <hr />

      <h2 className="mt-4">Reviews</h2>

      {product.reviews?.length === 0 ? (
        <h5>No Reviews Yet</h5>
      ) : (
        product.reviews.map((review, index) => (
          <div className="card p-3 mb-3" key={index}>
            <h5>{review.name}</h5>

            <p>⭐ {review.rating}</p>

            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductPage;