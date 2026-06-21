import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(
         "https://simpleecommercestore-3.onrender.com/api/dashboard",
          config
        );

        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  return (
  <div className="container mt-4">

    <h1 className="fw-bold mb-4">
      Admin Dashboard
    </h1>

    <div className="row g-4">

      <div className="col-md-3">
        <div
          className="card border-0 shadow"
          style={{ borderRadius: "25px" }}
        >
          <div className="card-body text-center">
            <h1>📦</h1>
            <h6 className="text-secondary">
              Products
            </h6>
            <h2>{stats.totalProducts}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div
          className="card border-0 shadow"
          style={{ borderRadius: "25px" }}
        >
          <div className="card-body text-center">
            <h1>🛒</h1>
            <h6 className="text-secondary">
              Orders
            </h6>
            <h2>{stats.totalOrders}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div
          className="card border-0 shadow"
          style={{ borderRadius: "25px" }}
        >
          <div className="card-body text-center">
            <h1>👤</h1>
            <h6 className="text-secondary">
              Users
            </h6>
            <h2>{stats.totalUsers}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div
          className="card border-0 shadow text-white"
          style={{
            background: "#111",
            borderRadius: "25px"
          }}
        >
          <div className="card-body text-center">
            <h1>💰</h1>
            <h6>
              Revenue
            </h6>
            <h2>
              ₹{stats.totalRevenue}
            </h2>
          </div>
        </div>
      </div>

    </div>

    {/* Quick Actions */}

    <div className="row mt-5 g-4">

      <div className="col-md-4">
        <div
          className="card border-0 shadow p-4"
          style={{ borderRadius: "25px" }}
        >
          <h4>📋 Orders</h4>

          <p className="text-secondary">
            Manage customer orders and delivery status.
          </p>

          <a
            href="/adminorders"
            className="btn btn-dark rounded-pill"
          >
            View Orders
          </a>
        </div>
      </div>

      <div className="col-md-4">
        <div
          className="card border-0 shadow p-4"
          style={{ borderRadius: "25px" }}
        >
          <h4>➕ Products</h4>

          <p className="text-secondary">
            Add and manage products.
          </p>

          <a
            href="/addproduct"
            className="btn btn-dark rounded-pill"
          >
            Add Product
          </a>
        </div>
      </div>

      <div className="col-md-4">
        <div
          className="card border-0 shadow p-4"
          style={{ borderRadius: "25px" }}
        >
          <h4>📊 Analytics</h4>

          <p className="text-secondary">
            Revenue and growth overview.
          </p>

          <button className="btn btn-dark rounded-pill">
            Coming Soon
          </button>
        </div>
      </div>

    </div>

   </div>
  );
}

export default AdminDashboardPage;