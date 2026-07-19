function Features() {
  return (
    <section className="bg-white py-16">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14">
          Why Shop With Us?
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          <div className="text-center">
            <div className="text-5xl">🚚</div>
            <h3 className="font-bold mt-4">Free Delivery</h3>
            <p className="text-gray-500 mt-2">
              Fast shipping across India.
            </p>
          </div>

          <div className="text-center">
            <div className="text-5xl">🔒</div>
            <h3 className="font-bold mt-4">Secure Payment</h3>
            <p className="text-gray-500 mt-2">
              100% secure payment gateway.
            </p>
          </div>

          <div className="text-center">
            <div className="text-5xl">↩️</div>
            <h3 className="font-bold mt-4">Easy Returns</h3>
            <p className="text-gray-500 mt-2">
              Hassle-free 7-day returns.
            </p>
          </div>

          <div className="text-center">
            <div className="text-5xl">⭐</div>
            <h3 className="font-bold mt-4">Premium Quality</h3>
            <p className="text-gray-500 mt-2">
              Genuine products with warranty.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Features;