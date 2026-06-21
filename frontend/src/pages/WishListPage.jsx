import { useContext } from "react";
import { WishlistContext } from "../context/wishListContext";

function WishlistPage() {
  const {
    wishlistItems,
    removeFromWishlist,
  } = useContext(WishlistContext);

  return (
    <div className="container mt-4">
      <h1>Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <h3>No Products</h3>
      ) : (
        wishlistItems.map((item) => (
          <div className="card p-3 mb-3" key={item._id}>
            <h4>{item.title}</h4>

            <h5>₹{item.price}</h5>

            <button
              className="btn btn-danger"
              onClick={() =>
                removeFromWishlist(item._id)
              }
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default WishlistPage;