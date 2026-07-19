import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Features from "../components/Features";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import { getProducts } from "../services/productService";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-100 min-h-screen">

      <Navbar />

      <Hero />

      <Categories />

      <section className="max-w-7xl mx-auto py-16 px-6">

        <div className="flex flex-col md:flex-row justify-between items-center mb-10">

          <h2 className="text-4xl font-bold">
            Featured Products
          </h2>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-5 py-3 mt-5 md:mt-0 w-full md:w-80"
          />

        </div>

        {filteredProducts.length === 0 ? (
          <h2 className="text-center text-xl text-gray-500">
            No products found
          </h2>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>
        )}

      </section>

      <Features />

      <Footer />

    </div>
  );
}

export default Home;