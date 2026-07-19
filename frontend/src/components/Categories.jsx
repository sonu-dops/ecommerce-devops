const categories = [
  "📱 Electronics",
  "💻 Laptops",
  "⌚ Watches",
  "🎧 Headphones",
  "🎮 Gaming",
  "👕 Fashion",
];

function Categories() {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6">

      <h2 className="text-4xl font-bold mb-10">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        {categories.map((item) => (
          <div
            key={item}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl hover:-translate-y-1 transition cursor-pointer"
          >
            <h3 className="text-xl font-semibold">
              {item}
            </h3>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Categories;