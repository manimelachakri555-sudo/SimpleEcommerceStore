import { useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

if (!userInfo) {
  alert("Please login first");
  window.location.href = "/login";
}

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const placeOrderHandler = async () => {
    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
"https://simpleecommercestore-3.onrender.com/api/orders",
        {
          products: orderItems,
          totalPrice,
        },
        config
      );

      alert("Order Placed Successfully");

      localStorage.removeItem("cartItems");

      window.location.reload();

      console.log(data);
    } catch (error) {
  console.log(error);

  if (error.response) {
    console.log(error.response.data);
    alert(error.response.data.message);
  } else {
    alert(error.message);
  }
}
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <h3>Your Cart is Empty</h3>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="card p-3 mb-3" key={item._id}>
              <div className="row align-items-center">

                <div className="col-md-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid"
                    style={{
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="col-md-5">
                  <h4>{item.title}</h4>
                  <h5 className="text-success">
                    ₹{item.price}
                  </h5>
                </div>

                <div className="col-md-2">
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      decreaseQuantity(item._id)
                    }
                  >
                    -
                  </button>

                  <span className="mx-3">
                    {item.quantity}
                  </span>

                  <button
                    className="btn btn-success"
                    onClick={() =>
                      increaseQuantity(item._id)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="col-md-2">
                  <button
                    className="btn btn-dark"
                    onClick={() =>
                      removeFromCart(item._id)
                    }
                  >
                    Remove
                  </button>
                </div>

              </div>
            </div>
          ))}

          <div className="card p-4 mt-4">
            <h3>
              Total Price: ₹{totalPrice}
            </h3>

            <Link to="/checkout">
  <button className="btn btn-primary mt-3">
    Proceed To Checkout
  </button>
</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;