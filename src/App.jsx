import { useState, useMemo } from "react";
import { ShopProvider } from "./context/ShopContext";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

const STEP = 8;

function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [visible, setVisible] = useState(STEP);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [search, category, sort]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header search={search} setSearch={setSearch} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Eng yaxshi mahsulotlar</h1>
          <p className="text-indigo-100 text-lg">Sifatli va arzon narxlarda xarid qiling</p>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
          <div className="flex gap-2 flex-wrap">
            {["all", "elektronika", "kiyim", "oziq-ovqat", "sport"].map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setVisible(STEP); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  category === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-400"
                }`}
              >
                {cat === "all" ? "Barchasi" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setVisible(STEP); }}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          >
            <option value="default">Saralash</option>
            <option value="price-asc">Narx: Past → Yuqori</option>
            <option value="price-desc">Narx: Yuqori → Past</option>
            <option value="name">Nom bo'yicha</option>
          </select>
        </div>

        {/* Products Grid */}
        {shown.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-lg">Mahsulot topilmadi</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {shown.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        {/* Show More */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisible((v) => v + STEP)}
              className="px-8 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white transition"
            >
              Ko'proq ko'rish ({filtered.length - visible} ta qoldi)
            </button>
          </div>
        )}
      </div>

      <footer className="bg-white border-t mt-12 py-6 text-center text-gray-400 text-sm">
        © 2026 ShopUz — Barcha huquqlar himoyalangan
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <Shop />
    </ShopProvider>
  );
}
