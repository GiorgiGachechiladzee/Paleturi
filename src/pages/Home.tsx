import React from "react";
import type { Product } from "../types";

interface HomeProps {
  products: Product[];
  onNavigateToCatalog: () => void;
}

export const Home: React.FC<HomeProps> = ({ products, onNavigateToCatalog }) => {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-6">
        <div className="space-y-6">
          <span className="inline-block bg-[#DCFCE7] text-[#15803D] text-xs font-semibold px-3 py-1.5 rounded-full">
            🌱 100% ეკოლოგიური & ნატურალური ხე
          </span>
          
          <h1 className="text-4xl sm:text-5xl font-black text-[#3D2314] leading-tight">
            პალეტური — ეკოლოგიური, სტილური და გამძლე ეზოს ავეჯი
          </h1>
          
          <p className="text-[#6E5343] text-lg leading-relaxed">
            მაღალი ხარისხის ხისგან დამზადებული ავეჯი თქვენი ეზოს, ტერასისა თუ აივნისთვის. შეუკვეთეთ მზა დიზაინი ან შექმენით თქვენი ინდივიდუალური ზომებით.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onNavigateToCatalog}
              className="bg-[#8C4A1A] hover:bg-[#733B13] text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-md"
            >
              კატალოგი →
            </button>
            <a
              href="https://wa.me/995555123456"
              target="_blank"
              rel="noreferrer"
              className="bg-[#22C55E] hover:bg-[#16A34A] text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-md"
            >
              WhatsApp შეკვეთა
            </a>
          </div>

          {/* სტატისტიკა */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E8E0D5]">
            <div>
              <p className="text-2xl font-black text-[#3D2314]">500+</p>
              <p className="text-xs text-[#6E5343]">კმაყოფილი კლიენტი</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#3D2314]">100%</p>
              <p className="text-xs text-[#6E5343]">ნატურალური ხე</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#3D2314]">3 წელი</p>
              <p className="text-xs text-[#6E5343]">გარანტია ხარისხზე</p>
            </div>
          </div>
        </div>

        {/* Hero სურათი */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000"
            alt="პალეტური ავეჯი"
            className="w-full h-[450px] object-cover"
          />
        </div>
      </section>

      {/* პროდუქტების სექცია */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs font-bold text-[#8C4A1A] uppercase tracking-wider">
              სექცია და კოლექცია
            </span>
            <h2 className="text-3xl font-black text-[#3D2314] mt-1">
              ჩვენი ნამუშევრები
            </h2>
          </div>
          <button
            onClick={onNavigateToCatalog}
            className="text-[#8C4A1A] font-bold hover:underline"
          >
            სრულად ნახვა →
          </button>
        </div>

        {/* ბარათების ბადე */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="bg-[#F5EFE6] rounded-2xl overflow-hidden border border-[#E8E0D5] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#DCFCE7] text-[#15803D] text-xs font-bold px-2.5 py-1 rounded-md">
                    ხელმისაწვდომია
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-xl text-[#3D2314]">
                    {product.title}
                  </h3>
                  <p className="text-xs text-[#6E5343] line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-xs font-semibold text-[#8C4A1A] bg-[#E8E0D5]/50 px-2.5 py-1 rounded w-fit">
                    {product.dimensions || "ინდივიდუალური ზომა"}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex justify-between items-center mt-4">
                <div>
                  <span className="text-xs text-[#6E5343]">ფასი</span>
                  <p className="text-xl font-black text-[#3D2314]">
                    ₾ {product.price}
                  </p>
                </div>
                <button className="bg-[#8C4A1A] hover:bg-[#733B13] text-white px-4 py-2 rounded-xl text-sm font-bold transition-all">
                  შეკვეთა
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};