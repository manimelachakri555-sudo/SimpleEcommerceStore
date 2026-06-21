import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import axios from "axios";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

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

  const cancelOrder = async (id) => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      await axios.put(
       `https://simpleecommercestore-3.onrender.com/api/orders/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const returnOrder = async (id) => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      await axios.put(
        `https://simpleecommercestore-3.onrender.com/api/orders/${id}/return`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const downloadInvoice = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("AESTHETECH INVOICE", 20, 20);

    doc.setFontSize(12);

    doc.text(`Order ID: ${order._id}`, 20, 40);
    doc.text(`Tracking ID: ${order.trackingId}`, 20, 50);
    doc.text(`Status: ${order.status}`, 20, 60);
    doc.text(`Amount: ₹${order.totalPrice}`, 20, 70);

    let y = 90;

    order.products.forEach((item) => {
      doc.text(
        `${item.product?.title} x ${item.quantity}`,
        20,
        y
      );
      y += 10;
    });

    doc.save(`invoice-${order._id}.pdf`);
  };

  return (
    <div className="container mt-4">
      <h1 className="fw-bold mb-4">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <h3>No Orders Yet</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="card shadow border-0 p-4 mb-4"
            style={{ borderRadius: "25px" }}
          >
            <h6 className="text-secondary">
              Order ID
            </h6>

            <p>{order._id}</p>

            <h4 className="fw-bold">
              ₹{order.totalPrice}
            </h4>

           <hr />

<div className="mt-4 d-flex gap-3 flex-wrap">

  {order.status !== "Cancelled" &&
    order.status !== "Delivered" && (
      <button
        className="btn btn-danger rounded-pill"
        onClick={() => cancelOrder(order._id)}
      >
        Cancel Order
      </button>
  )}

  {order.status === "Delivered" &&
    !order.isReturned && (
      <button
        className="btn btn-warning rounded-pill"
        onClick={() => returnOrder(order._id)}
      >
        Return Order
      </button>
  )}

  <button
    className="btn btn-dark rounded-pill"
    onClick={() => downloadInvoice(order)}
  >
    Download Invoice
  </button>

</div>

{/* Status Message */}

{order.status === "Cancelled" && (
  <div className="alert alert-danger mt-4">
    🛑 This order has been cancelled.
  </div>
)}

{order.status === "Returned" && (
  <div className="alert alert-warning mt-4">
    ↩️ Product return request successful.
  </div>
)}

{order.status === "Delivered" && (
  <div className="alert alert-success mt-4">
    ✅ Delivered Successfully
  </div>
)}

</div>
        ))
      )}
    </div>
  );
}

export default OrdersPage;