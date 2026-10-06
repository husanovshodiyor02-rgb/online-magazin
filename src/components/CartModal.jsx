import { useShop } from "../context/ShopContext";

export default function CartModal({ open, onClose }) {
  const { cart, removeFromCart, updateQty, cartTotal } = useShop();
  if (!open) return null;

  const formatPrice = (p) => p.toLocaleString("uz-UZ") + " so'm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-bold text-gray-800">🛒 Savat ({cart.length})</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-5xl mb-3">🛒</div>
              <p>Savat bo'sh</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
                  <p className="text-indigo-600 text-sm font-bold">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 font-bold text-sm">-</button>
                    <span className="text-sm font-semibold w-5 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 font-bold text-sm">+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 text-lg flex-shrink-0">🗑️</button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t p-5">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600 font-medium">Jami:</span>
              <span className="text-indigo-600 font-bold text-lg">{formatPrice(cartTotal)}</span>
            </div>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
              Buyurtma berish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
