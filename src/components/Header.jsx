import { useState } from "react";
import { useShop } from "../context/ShopContext";
import CartModal from "./CartModal";
import LikedModal from "./LikedModal";

export default function Header({ search, setSearch }) {
  const { cartCount, liked } = useShop();
  const [cartOpen, setCartOpen] = useState(false);
  const [likedOpen, setLikedOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="text-2xl font-bold text-indigo-600">🛍️ ShopUz</div>

          <div className="flex-1 max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Mahsulot qidiring..."
              className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLikedOpen(true)}
              className="relative p-2 rounded-full hover:bg-red-50 transition"
            >
              <span className="text-xl">❤️</span>
              {liked.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {liked.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-indigo-50 transition"
            >
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
      <LikedModal open={likedOpen} onClose={() => setLikedOpen(false)} />
    </>
  );
}
