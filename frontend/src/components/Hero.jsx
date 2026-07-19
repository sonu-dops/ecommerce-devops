function Hero() {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-between">

        <div className="max-w-2xl">

          <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            🔥 Summer Sale 2026
          </span>

          <h1 className="text-6xl font-bold mt-8 leading-tight">
            Upgrade Your
            <br />
            Lifestyle
          </h1>

          <p className="mt-6 text-xl text-gray-300">
            Discover premium smartphones, laptops, headphones,
            smart watches and accessories at unbeatable prices.
          </p>

          <button className="mt-10 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl text-lg font-semibold transition">
            Shop Now
          </button>

        </div>

        <div className="mt-16 lg:mt-0">

          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900"
            alt="Shopping"
            className="rounded-3xl shadow-2xl w-[500px]"
          />

        </div>

      </div>
    </section>
  );
}

export default Hero;