
import { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const navigate = useNavigate();

  const { cartItems } = useContext(CartContext);

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

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

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          products: orderItems,
          totalPrice,
          phone,
          shippingAddress: {
            address,
            city,
            postalCode,
            country,
          },
        },
        config
      );

      localStorage.removeItem("cartItems");

      alert("Order placed successfully");

      navigate("/orders");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container mt-4">
      <div
        className="card shadow border-0 p-4"
        style={{ borderRadius: "25px" }}
      >
        <h2 className="mb-4">Checkout</h2>

        <input
          className="form-control mb-3"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <h4 className="mt-3">
          Total Price : ₹{totalPrice}
        </h4>

        <button
          className="btn btn-success mt-4"
          onClick={placeOrderHandler}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;

