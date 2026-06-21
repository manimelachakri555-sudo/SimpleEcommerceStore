
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://simpleecommercestore-3.onrender.com/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div
          className="card shadow p-4 border-0"
          style={{
            borderRadius: "30px",
            background: "#fff"
          }}
        >
          <h2 className="mb-4 fw-bold">
            Login
          </h2>

          <form onSubmit={submitHandler}>

            <input
              type="email"
              className="form-control mb-3 rounded-pill"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <div className="input-group mb-3">

              <input
                type={showPassword ? "text" : "password"}
                className="form-control rounded-start-pill"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="btn btn-dark rounded-end-pill"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "🙈 Hide" : "👁 Show"}
              </button>

            </div>

            <button className="btn btn-dark rounded-pill w-100">
              Login
            </button>

          </form>

          <p className="mt-3 text-secondary">
            New user?
            <Link
              className="text-dark fw-bold text-decoration-none"
              to="/register"
            >
              {" "}Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;

