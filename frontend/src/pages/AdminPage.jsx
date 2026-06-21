import { useEffect, useState } from "react";
import axios from "axios";

function AdminPage() {

  const [dashboard, setDashboard] = useState({});

  useEffect(() => {

    const fetchDashboard = async () => {

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
          "https://simpleecommercestore-3.onrender.com/api/dashboard",
          config
        );

        setDashboard(data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchDashboard();

  }, []);

  return (
    <div className="container mt-4">

      <h1 className="mb-4">
        Admin Dashboard
      </h1>

      <div className="row">

        <div className="col-md-3">
          <div className="card shadow p-4 text-center">
            <h5>Total Products</h5>

            <h2 className="text-primary">
              {dashboard.totalProducts}
            </h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-4 text-center">
            <h5>Total Users</h5>

            <h2 className="text-success">
              {dashboard.totalUsers}
            </h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-4 text-center">
            <h5>Total Orders</h5>

            <h2 className="text-warning">
              {dashboard.totalOrders}
            </h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-4 text-center">
            <h5>Revenue</h5>

            <h2 className="text-danger">
              ₹{dashboard.totalRevenue}
            </h2>
          </div>
        </div>

      </div>

    </div>
  );
}

export default AdminPage;