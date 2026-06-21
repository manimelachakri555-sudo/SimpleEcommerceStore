import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        borderBottom: "1px solid #ddd",
      }}
    >
      <div className="container-fluid px-4">

        {/* Logo */}
    <Link
  className="navbar-brand d-flex align-items-center"
  to="/"
  style={{ gap: "10px" }}
>
  <img
    src="/logo.png"
    
    style={{
      width: "60px",
      height: "60px",
      objectFit: "contain"
    }}
  />

  <span
    style={{
      fontSize: "28px",
      fontWeight: "700",
      letterSpacing: "2px",
      color: "#111"
    }}
  >
    AESTHETECH
  </span>
</Link>
        <div className="navbar-nav ms-auto align-items-center gap-3">

          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/wishlist">
            Wishlist
          </Link>

          <Link className="nav-link" to="/orders">
            Orders
          </Link>

          {/* Welcome */}

          {userInfo && (
            <span
              style={{
                color: "#666",
                fontSize: "14px",
                fontWeight: "500",
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}
            >
              Welcome,{" "}
              <span
                style={{
                  color: "inherit",
                  fontWeight: "700"
                }}
              >
                {userInfo.name}
              </span>
            </span>
          )}

          {/* Admin */}

          {userInfo?.isAdmin && (
            <div
              className="admin-panel"
              style={{
                display: "flex",
                gap: "18px",
                alignItems: "center"
              }}
            >
              <span
                style={{
                  color: "#D4AF37",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  fontSize: "13px"
                }}
              >
                ADMIN
              </span>

              <Link
  className="text-decoration-none"
  style={{
    color: "#D4AF37",
    fontWeight: "600"
  }}
  to="/dashboard"
>
  Dashboard
</Link>



            </div>
          )}

          <Link className="nav-link" to="/cart">
            Bag ({cartItems.length})
          </Link>

          

         

          {!userInfo ? (
            <Link to="/login">
              <button className="btn btn-dark rounded-pill px-4">
                Connect Profile
              </button>
            </Link>
          ) : (
            <>
              <Link
                className="btn btn-outline-dark rounded-pill"
                to="/profile"
              >
                Profile
              </Link>

              <button
                className="btn btn-danger rounded-pill"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;