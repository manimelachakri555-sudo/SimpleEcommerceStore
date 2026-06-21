import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://simpleecommercestore-3.onrender.com/api/products/${id}`
        );

        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
        setImage(data.image);
        setCategory(data.category);
        setCountInStock(data.countInStock);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://simpleecommercestore-3.onrender.com/api/products/${id}`,
        {
          title,
          description,
          price,
          image,
          category,
          countInStock,
        }
      );

      alert("Product Updated Successfully");

      navigate("/admin");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Edit Product</h1>

      <form onSubmit={submitHandler}>
        <input
          className="form-control mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="form-control mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="form-control mb-3"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="form-control mb-3"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          className="form-control mb-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="form-control mb-3"
          value={countInStock}
          onChange={(e) => setCountInStock(e.target.value)}
        />

        <button className="btn btn-warning">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProductPage;