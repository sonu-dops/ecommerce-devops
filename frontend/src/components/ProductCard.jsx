import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition duration-300 hover:-translate-y-2">

      <img
  onClick={() => navigate(`/product/${product.id}`)}
  src={product.image || "https://via.placeholder.com/600x400?text=Product"}
  alt={product.name}
  className="w-full h-64 object-cover cursor-pointer"
/>

<h2
  onClick={() => navigate(`/product/${product.id}`)}
  className="text-2xl font-bold cursor-pointer hover:text-blue-600"
>
  {product.name}
</h2>
        <p className="text-gray-600 mt-3 h-14 overflow-hidden">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-6">

          <span className="text-3xl font-bold text-blue-700">
            ₹ {product.price}
          </span>

          <span className="text-sm text-gray-500">
            #{product.id}
          </span>

        </div>

        <div className="flex gap-3 mt-6">

          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Add to Cart
          </button>

          <button className="bg-pink-500 hover:bg-pink-600 text-white px-5 rounded-lg">
            ❤
          </button>

        </div>

      </div>

    
  );
}

export default ProductCard;