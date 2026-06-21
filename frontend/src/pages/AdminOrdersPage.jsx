
import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        "https://simpleecommercestore-3.onrender.com/api/orders",
        config
      );

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(
`https://simpleecommercestore-3.onrender.com/api/orders/${id}`,
{ status },
config
);

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="fw-bold mb-4">
        Admin Orders
      </h1>

      {orders.length === 0 ? (
        <h3>No Orders Found</h3>
      ) : (
        orders.map((order) => (
          <div
            className="card shadow border-0 p-4 mb-4"
            style={{ borderRadius: "25px" }}
            key={order._id}
          >
            <h6>Order ID</h6>
            <p>{order._id}</p>

            <h5>Tracking ID</h5>
            <p className="text-primary fw-bold">
              {order.trackingId}
            </p>

            <h5>Total Price</h5>
            <p>₹{order.totalPrice}</p>

            <h6>
              Date :
              {" "}
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </h6>

            <h6>
              Estimated Delivery :
              {" "}
              {order.estimatedDelivery &&
                new Date(
                  order.estimatedDelivery
                ).toLocaleDateString()}
            </h6>

            <h5 className="mt-3">
              Status :
              {" "}
              <span className="badge bg-dark">
                {order.status}
              </span>
            </h5>

            <hr />

            <h5>Delivery Address</h5>

            <p>
              {order.shippingAddress?.address}
            </p>

            <p>
              {order.shippingAddress?.city}
            </p>

            <p>
              {order.shippingAddress?.postalCode}
            </p>

            <p>
              {order.shippingAddress?.country}
            </p>

            <hr />

            <h5>Products</h5>

            {order.products.map((item, index) => (
              <div
                key={index}
                className="d-flex align-items-center mb-3"
              >
                <img
                  src={item.product?.image}
                  alt=""
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "15px",
                  }}
                />

                <div className="ms-3">
                  <h6>
                    {item.product?.title}
                  </h6>

                  <p>
                    Qty : {item.quantity}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-4">

              <button
                className="btn btn-secondary me-2"
                onClick={() =>
                  updateStatus(order._id, "Packed")
                }
              >
                Packed
              </button>

              <button
                className="btn btn-primary me-2"
                onClick={() =>
                  updateStatus(order._id, "Shipped")
                }
              >
                Shipped
              </button>

              <button
                className="btn btn-info me-2"
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Out for Delivery"
                  )
                }
              >
                Out for Delivery
              </button>

              <button
                className="btn btn-success"
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Delivered"
                  )
                }
              >
                Delivered
              </button>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrdersPage;

