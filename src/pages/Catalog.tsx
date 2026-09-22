import React, { useState } from "react";
import { initialProducts } from "../data/Products";
import type { Product } from "../types";

export const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // CRUD - Delete Product
  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // აჩერებს მოდალის გახსნას წაშლის ღილაკზე დაჭერისას
    setProducts(products.filter((p) => p.id !== id));
  };

  // CRUD - Add Product
  const handleAddProduct = () => {
    const newProd: Product = {
      id: Date.now().toString(),
      title: "ახალი პალეტის ავეჯი",
      description: "ინდივიდუალური დიზაინით დამზადებული ახალი მოდელი.",
      price: 450,
      category: "sofas",
      dimensions: "200 x 80 x 40 სმ",
      image:
        "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800",
      features: ["ნატურალური ფიჭვი"],
    };
    setProducts([newProd, ...products]);
  };

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary font-bold">
            ჩვენი კოლექცია
          </h1>
          <p className="text-on-surface-variant">
            მართეთ პროდუქტები (CRUD ოპერაციები):
          </p>
        </div>
        <button
          onClick={handleAddProduct}
          className="px-4 py-2 bg-primary text-white rounded-xl font-bold flex items-center gap-2 hover:bg-primary-container transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined">add</span>
          პროდუქტის დამატება
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {["all", "sofas", "tables", "custom"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full font-bold transition-all cursor-pointer ${
              activeFilter === cat
                ? "bg-primary text-white"
                : "bg-surface-container-highest text-on-surface-variant"
            }`}
          >
            {cat === "all" && "ყველა"}
            {cat === "sofas" && "1. ეზოსა და ტერასის დივნები"}
            {cat === "tables" && "2. მაგიდები და სკამები"}
            {cat === "custom" && "3. სპეც-შეკვეთები"}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer border border-transparent hover:border-primary/20"
          >
            <div>
              <div className="relative h-64">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-secondary text-white rounded-full text-xs font-bold">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-on-surface mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="bg-surface-container-low p-2 rounded-lg text-xs font-semibold mb-4">
                  ზომა: {product.dimensions}
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-between items-center bg-surface-container-low/30">
              <span className="font-bold text-primary text-lg">
                ₾ {product.price}-დან
              </span>
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => handleDelete(e, product.id)}
                  className="p-2 text-error hover:bg-error-container rounded-lg transition-colors cursor-pointer"
                  title="წაშლა"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
                <a
                  href={`https://wa.me/995555000000?text=${encodeURIComponent(`გამარჯობა, მაინტერესებს ${product.title}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#25D366] text-white rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-[#20ba5a] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chat
                  </span>
                  შეკვეთა
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal (თეთრი გამჭვირვალე ფონი და გაბუნდოვნება) */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-md flex justify-center items-center z-50 p-4 transition-all">
          <div className="bg-white border border-gray-100 rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl overflow-hidden animate-fade-in">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer z-10"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="relative h-72 rounded-2xl overflow-hidden mb-6">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />
              {selectedProduct.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold shadow">
                  {selectedProduct.badge}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedProduct.title}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm">
              {selectedProduct.description}
            </p>

            <div className="bg-gray-50 border border-gray-200 text-gray-700 p-3 rounded-xl mb-6 text-sm font-semibold inline-block">
              📏 ზომები: {selectedProduct.dimensions}
            </div>

            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
              <div>
                <span className="text-xs text-gray-400 block font-medium">
                  საწყისი ფასი:
                </span>
                <span className="text-2xl font-extrabold text-gray-900">
                  ₾ {selectedProduct.price}-დან
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-5 py-2.5 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer text-sm"
                >
                  დახურვა
                </button>
                <a
                  href={`https://wa.me/995555000000?text=${encodeURIComponent(`გამარჯობა, მაინტერესებს ${selectedProduct.title}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-[#25D366] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#20ba5a] shadow-md transition-colors text-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  WhatsApp-ში შეკვეთა
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};