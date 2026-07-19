import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProduct } from "../services/productService";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto py-12 px-6 grid md:grid-cols-2 gap-10">

        <div>
          <img
            src={
              product.image ||
              "https://via.placeholder.com/600x500?text=Product"
            }
            alt={product.name}
            className="rounded-2xl shadow-xl w-full"
          />
        </div>

        <div>

          <h1 className="text-5xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-6 text-lg">
            {product.description}
          </p>

          <h2 className="text-4xl font-bold text-blue-700 mt-8">
            ₹ {product.price}
          </h2>

          <p className="mt-4 text-green-600 font-semibold">
            In Stock: {product.stock}
          </p>

          <div className="flex gap-4 mt-10">

            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product);
                navigate("/checkout");
              }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold"
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;