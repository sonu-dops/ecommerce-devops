function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-10">

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

        <div>
          <h2 className="text-2xl font-bold">
            E-Commerce Store
          </h2>

          <p className="text-gray-400 mt-2">
            © 2026 All Rights Reserved
          </p>
        </div>

        <div className="flex gap-8 mt-6 md:mt-0">
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
        </div>

      </div>

    </footer>
  );
}

export default Footer;