import { useState } from "react";
import axios from "axios";

function AddProductPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      // Upload image to Cloudinary
      if (imageFile) {
        const formData = new FormData();

        formData.append("file", imageFile);
        formData.append(
          "upload_preset",
          "ecommerce_products"
        );

        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/du5w6vqd5/image/upload",
          formData
        );

        imageUrl = data.secure_url;
      }

      // Save product to database
      await axios.post(
"https://simpleecommercestore-3.onrender.com/api/products",
{
          title,
          description,
          price,
          image: imageUrl,
          category,
          countInStock,
        }
      );

      alert("Product Added Successfully");

      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setCountInStock("");
      setImageFile(null);

    } catch (error) {
      console.log(error);
      alert("Error Adding Product");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Add Product</h1>

      <form onSubmit={submitHandler}>
        <input
          className="form-control mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) =>
            setImageFile(e.target.files[0])
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Stock"
          value={countInStock}
          onChange={(e) =>
            setCountInStock(e.target.value)
          }
        />

        <button className="btn btn-success">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;