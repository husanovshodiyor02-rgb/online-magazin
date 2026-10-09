import { useShop } from "../context/ShopContext";

export default function LikedModal({ open, onClose }) {
  const { liked, toggleLike, addToCart } = useShop();
  if (!open) return null;

  const formatPrice = (p) => p.toLocaleString("uz-UZ") + " so'm";

  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-bold text-gray-800">❤️ Yoqtirilganlar ({liked.length})</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {liked.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-5xl mb-3">🤍</div>
              <p>Yoqtirilganlar yo'q</p>
            </div>
          ) : (
            liked.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
                  <p className="text-indigo-600 text-sm font-bold">{formatPrice(item.price)}</p>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button onClick={() => addToCart(item)} className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700">+Savat</button>
                  <button onClick={() => toggleLike(item)} className="text-xs bg-red-100 text-red-500 px-3 py-1 rounded-lg hover:bg-red-200">O'chir</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
