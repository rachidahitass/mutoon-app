import { useState } from "react";
import mutoons from "../data/mutoons.json";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const categories = [...new Set(mutoons.map(m => m.category))];

  const filtered = mutoons.filter(m =>
    m.title.includes(query) &&
    (filterCategory ? m.category === filterCategory : true)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">مكتبة المتون</h1>
          <ThemeToggle />
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 ابحث عن متن..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterCategory("")}
            className={`px-4 py-2 rounded-lg border transition ${
              filterCategory === "" 
                ? "bg-indigo-600 text-white border-indigo-600" 
                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            جميع المتون
          </button>

          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-lg border transition ${
                filterCategory === cat 
                  ? "bg-indigo-600 text-white border-indigo-600" 
                  : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">لا توجد نتائج</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">جرب البحث بكلمات أخرى أو غيّر الفلتر</p>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map(m => (
            <Link
              key={m.id}
              to={`/matn/${m.id}`}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col bg-white dark:bg-gray-800 hover:scale-[1.02] transform"
            >
              <img
                src={m.cover}
                alt={`غلاف ${m.title}`}
                onError={(e) => {
                  e.target.src = '/vite.svg';
                  e.target.classList.add('p-8', 'bg-gray-100', 'dark:bg-gray-700');
                }}
                className="rounded-md mb-3 h-40 w-full object-cover"
              />

              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{m.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{m.category}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}