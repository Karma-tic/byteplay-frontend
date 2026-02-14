import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <Link
  to="/"
  className="text-3xl font-brand font-bold tracking-tight
             bg-gradient-to-r from-indigo-600 to-purple-600
             bg-clip-text text-transparent
             drop-shadow-sm"
>
  BytePlay
</Link>


        {!isHome && (
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-blue-600 transition"
          >
            ← Back to Home
          </Link>
        )}

      </div>
    </header>
  );
}

export default Navbar;
