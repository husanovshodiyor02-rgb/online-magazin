import { useState } from "react";
import { useShop } from "../context/ShopContext";
import DetailModal from "./DetailModal";

export default function ProductCard({ product }) {
  const { addToCart, toggleLike, isLiked } = useShop();
  const [detailOpen, setDetailOpen] = useState(false);
  const liked = isLiked(product.id);

  const formatPrice = (p) => p.toLocaleString("uz-UZ") + " so'm";

  return (
    <>
      <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={() => toggleLike(product)}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow transition-all duration-200 ${
              liked ? "bg-red-500 text-white scale-110" : "bg-white text-gray-400 hover:text-red-500"
            }`}
          >
            {liked ? "❤️" : "🤍"}
          </button>
          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full capitalize">
            {product.category}
          </span>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-gray-800 text-base mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-gray-400 text-sm mb-2 line-clamp-2 flex-1">{product.description}</p>

          <div className="flex items-center gap-1 mb-3">
            <span className="text-yellow-400 text-sm">⭐</span>
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>

          <div className="text-indigo-600 font-bold text-lg mb-3">{formatPrice(product.price)}</div>

          <div className="flex gap-2">
            <button
              onClick={() => setDetailOpen(true)}
              className="flex-1 border border-indigo-600 text-indigo-600 rounded-xl py-2 text-sm font-medium hover:bg-indigo-50 transition"
            >
              Batafsil
            </button>
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-indigo-600 text-white rounded-xl py-2 text-sm font-medium hover:bg-indigo-700 transition"
            >
              🛒 Savatga
            </button>
          </div>
        </div>
      </div>

      <DetailModal open={detailOpen} onClose={() => setDetailOpen(false)} product={product} />
    </>
  );
}
