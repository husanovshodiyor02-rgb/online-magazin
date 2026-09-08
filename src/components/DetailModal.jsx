import { useShop } from "../context/ShopContext";

export default function DetailModal({ open, onClose, product }) {
  const { addToCart, toggleLike, isLiked } = useShop();
  if (!open || !product) return null;

  const formatPrice = (p) => p.toLocaleString("uz-UZ") + " so'm";
  const liked = isLiked(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full capitalize">
            {product.category}
          </span>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
            <button
              onClick={() => toggleLike(product)}
              className={`text-2xl transition ${liked ? "scale-110" : ""}`}
            >
              {liked ? "❤️" : "🤍"}
            </button>
          </div>

          <div className="flex items-center gap-1 mb-3">
            <span className="text-yellow-400">⭐</span>
            <span className="text-gray-600 text-sm">{product.rating} / 5.0</span>
          </div>

          <p className="text-gray-500 text-sm mb-4 leading-relaxed">{product.description}</p>

          <div className="text-2xl font-bold text-indigo-600 mb-4">{formatPrice(product.price)}</div>

          <button
            onClick={() => { addToCart(product); onClose(); }}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            🛒 Savatga qo'shish
          </button>
        </div>
      </div>
    </div>
  );
}
