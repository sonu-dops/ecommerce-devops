import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProduct,
  updateProduct,
} from "../services/productService";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
  });

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const data = await getProduct(id);

      setProduct({
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        stock: data.stock,
      });

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await updateProduct(id, {
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
      });

      alert("✅ Product Updated Successfully");

      navigate("/admin/products");

    } catch (err) {

      console.log(err);

      alert("Failed to Update Product");

    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center py-10">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center mb-8">
          Edit Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border rounded-lg p-3"
          />

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded-lg p-3"
            rows="4"
          />

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border rounded-lg p-3"
          />

          <button
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg"
          >
            Update Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProduct;