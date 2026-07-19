import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/productService";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProduct({
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
      });

      alert("✅ Product Added Successfully");

      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center py-10">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={product.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows="4"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold"
          >
            Add Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;