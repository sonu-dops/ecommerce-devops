import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import { deleteProduct } from "../services/productService";

function AdminProducts() {
    const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {

    await deleteProduct(id);

    alert("✅ Product Deleted");

    loadProducts();

  } catch (err) {

    console.log(err);

    alert("Delete Failed");

  }

};

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="bg-slate-900 text-white p-5 flex justify-between">

        <h1 className="text-3xl font-bold">
          Product Management
        </h1>

        <Link
          to="/admin/add-product"
          className="bg-green-600 px-5 py-2 rounded-lg"
        >
          + Add Product
        </Link>

      </div>

      <div className="max-w-7xl mx-auto py-10">

        <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">

          <thead className="bg-blue-700 text-white">

            <tr>

              <th className="p-4">Image</th>

              <th>Name</th>

              <th>Price</th>

              <th>Stock</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-b text-center"
              >

                <td className="p-3">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover mx-auto rounded"
                  />

                </td>

                <td>{product.name}</td>

                <td>₹ {product.price}</td>

                <td>{product.stock}</td>

                <td>

                  <button
  onClick={() => navigate(`/admin/edit-product/${product.id}`)}
  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mr-2"
>
  Edit
</button>
<button
  onClick={() => handleDelete(product.id)}
  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
>
  Delete
</button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminProducts;