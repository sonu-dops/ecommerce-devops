import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/productService";
import { uploadImage } from "../services/uploadService";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!imageFile) {
      alert("Please choose an image first.");
      return;
    }

    try {
      setUploading(true);

      const imageUrl = await uploadImage(imageFile);

      setProduct((prev) => ({
        ...prev,
        image: imageUrl,
      }));

      alert("✅ Image Uploaded Successfully");

    } catch (err) {
      console.error(err);
      alert("❌ Image Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.image) {
      alert("Please upload an image first.");
      return;
    }

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

        <h1 className="text-3xl font-bold text-center mb-8">
          Add Product
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
            placeholder="Description"
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
            type="number"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <div>

            <label className="block mb-2 font-semibold">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full"
            />

          </div>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-60 h-60 object-cover rounded-lg border mx-auto"
            />
          )}

          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>

          {product.image && (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg">
              ✅ Image Uploaded Successfully
            </div>
          )}

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