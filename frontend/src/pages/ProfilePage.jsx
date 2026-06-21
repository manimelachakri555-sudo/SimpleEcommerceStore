import { useState } from "react";
import axios from "axios";

function ProfilePage() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [name, setName] = useState(userInfo.name);
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
       "https://simpleecommercestore-3.onrender.com/api/users/profile",
        {
          name,
          password,
        },
        config
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="container mt-4">
      <h1>My Profile</h1>

      <form onSubmit={submitHandler}>
        <input
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="form-control mb-3"
          value={userInfo.email}
          disabled
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;