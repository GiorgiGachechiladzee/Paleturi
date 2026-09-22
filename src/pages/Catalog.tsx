import React, { useState } from 'react';
import { initialProducts } from '../data/Products';
import type { Product } from '../types';

export const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // CRUD - Delete Product
  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // CRUD - Add Product (Modal/Form logic)
  const handleAddProduct = () => {
    const newProd: Product = {
      id: Date.now().toString(),
      title: 'ახალი პალეტის ავეჯი',
      description: 'ინდივიდუალური დიზაინით დამზადებული ახალი მოდელი.',
      price: 450,
      category: 'sofas',
      dimensions: '200 x 80 x 40 სმ',
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800',
      features: ['ნატურალური ფიჭვი']
    };
    setProducts([newProd, ...products]);
  };

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary font-bold">ჩვენი კოლექცია</h1>
          <p className="text-on-surface-variant">მართეთ პროდუქტები (CRUD ოპერაციები):</p>
        </div>
        <button 
          onClick={handleAddProduct}
          className="px-4 py-2 bg-primary text-white rounded-xl font-bold flex items-center gap-2 hover:bg-primary-container transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          პროდუქტის დამატება
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {['all', 'sofas', 'tables', 'custom'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full font-bold transition-all ${
              activeFilter === cat 
                ? 'bg-primary text-white' 
                : 'bg-surface-container-highest text-on-surface-variant'
            }`}
          >
            {cat === 'all' && 'ყველა'}
            {cat === 'sofas' && '1. ეზოსა და ტერასის დივნები'}
            {cat === 'tables' && '2. მაგიდები და სკამები'}
            {cat === 'custom' && '3. სპეც-შეკვეთები'}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative h-64">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-secondary text-white rounded-full text-xs font-bold">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-on-surface mb-2">{product.title}</h3>
                <p className="text-sm text-on-surface-variant mb-4">{product.description}</p>
                <div className="bg-surface-container-low p-2 rounded-lg text-xs font-semibold mb-4">
                  ზომა: {product.dimensions}
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-between items-center bg-surface-container-low/30">
              <span className="font-bold text-primary text-lg">₾ {product.price}-დან</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="p-2 text-error hover:bg-error-container rounded-lg transition-colors"
                  title="წაშლა"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
                <a 
                  href={`https://wa.me/995555000000?text=${encodeURIComponent(`გამარჯობა, მაინტერესებს ${product.title}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#25D366] text-white rounded-lg text-sm font-bold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  შეკვეთა
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};